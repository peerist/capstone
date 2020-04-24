import React, { useState, useEffect } from 'react'
import { Flex, Box, Text } from 'rebass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import styled from '@emotion/styled'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'
import { useQuery, useMutation } from 'urql'
import { useRouter } from 'next/router'

import Divider from '../../../../components/divider'
import Container from '../../../../components/container'
import SegmentCardAll from '../../../../components/segment_card_all'
import SegmentCardPaper from '../../../../components/segment_card_paper'

import { getUserId, addSegmentToPaper, removeSegmentToPaper, getPaperSegments, listPaperSegmentsID, getUserSegmentsNotInPaper} from '../../../../pages/queries.js'

import AppHeader from '../../../../components/app_header'

var body = []
var bodysig = 0

const EditSegment = () => {
  const router = useRouter();
  const [segments, setSegments] = useState([{name: '...', Id: 1, currentVersion: 1}]);
  const [selected, setSelected] = useState([{name: 'Click on the left to add Segments', Id: 1, currentVersion: 1}]);
  // Get logged in user data
  const auth = useAuth({});
  const [userId, setUserId] = useState(-1)

  // Query for their segments
  const [userIdResult] = useQuery({
    query: getUserId,
    variables: {email: auth.user.email }
  })

  const [paperSegmentsResult] = useQuery({
    query: listPaperSegmentsID,
    variables: {paperId: router.query.id }
  })


  useEffect(() => {
    if(!userIdResult.fetching) {
      setUserId(userIdResult.data.Users[0].Id)
    }
  }, [userIdResult])


  useEffect(() => {

    if(!paperSegmentsResult.fetching && paperSegmentsResult.data){
      for(var i = 0; i < paperSegmentsResult.data.PaperSegment.length; i++){
        body.push(paperSegmentsResult.data.PaperSegment[i].segmentId)
      }
      console.log(body)
      if (body.length == 0){
        body.push(-Infinity)
      }
    }
  }, [paperSegmentsResult])



  const [userSegmentsResult] = useQuery({
    query: getUserSegmentsNotInPaper,
    variables: {email: auth.user.email, args: body}
  })


  const [userSegmentsDisplay] = useQuery({
    query: getPaperSegments,
    variables: {email: auth.user.email, args: body }
  })

  useEffect(() => {
    if(body.length > 0 && !userSegmentsResult.fetching && userSegmentsResult.data){
      console.log(userSegmentsResult.data.Segment)
      setSegments(userSegmentsResult.data.Segment)
    }
  }, [userSegmentsResult])

  useEffect(() => {
    if(body.length > 0 && !userSegmentsDisplay.fetching && userSegmentsDisplay.data){
      console.log(userSegmentsDisplay.data.Segment)
      setSelected(userSegmentsDisplay.data.Segment)
    }
  }, [userSegmentsDisplay])


const [addSegment, executeAddSegment] = useMutation(addSegmentToPaper)
const [removeSegment, executeRemoveSegment] = useMutation(removeSegmentToPaper)

  const toggleOff = (id) => {
    executeRemoveSegment({ segmentId: id, paperId: router.query.id }).then(mutationResult => {
      const affectedSegment = mutationResult.data.delete_PaperSegment.returning[0]
      const activeSegments = selected.filter(segment => {
        return segment.id !== affectedSegment.Id
      })
      const inactiveSegments = Array.from(segments)
      inactiveSegments.push(affectedSegment)
      setSelected(activeSegments)
      setSegments(inactiveSegments)
    })
  }

  const toggleOn = (id) => {
    executeAddSegment({ segmentId: id, paperId: router.query.id }).then(mutationResult => {
      console.log(mutationResult.data.insert_PaperSegment.returning[0])
      const affectedSegment = mutationResult.data.insert_PaperSegment.returning[0]
      const inactiveSegments = segments.filter(segment => {
        return segment.id !== affectedSegment.Id
      })
      const activeSegments = Array.from(selected)
      activeSegments.push(affectedSegment)
      setSelected(activeSegments)
      setSegments(inactiveSegments)
    })
  }















  return (
    <div>
      <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Papers', dest: '/app/papers'}, {name: 'Create Paper', dest: '/app/papers/create'}]}/>

      <Container pt={3}>
        <Divider />
      </Container>

      <Container pr={5} pl={5} justifyContent='space-between'>
        <Box p={3} width={0.5}>
          <Text variant='heading' mb={3}>
            All Segments
          </Text>
          <Divider />
          <Box>
            {segments.map((segment) => {
              return <SegmentCardAll name={segment.name} id={segment.id} version={segment.currentVersion} toggle={toggleOn} key={segment.id} />
            })}
          </Box>
        </Box>
        <Box p={3} width={0.5}>
          <Text variant='heading' mb={3}>
            Selected Segments
          </Text>
          <Divider />
          <Box>
          {selected.map((segment) => {
            return <SegmentCardPaper name={segment.name} id={segment.id} version={segment.currentVersion} toggle={toggleOff} key={segment.id} />
          })}
          </Box>
        </Box>
      </Container>




    </div>
  )
}

export default withLoginRequired(withAuth(EditSegment))
