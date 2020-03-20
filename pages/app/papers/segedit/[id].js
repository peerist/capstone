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

import { getUserId, getUserSegmentsAll, getPaperSegments} from '../../../../pages/queries.js'

import AppHeader from '../../../../components/app_header'

const EditSegment = () => {
  const router = useRouter();
  const [segments, setSegments] = useState([{name: '...', Id: 1, currentVersion: 1}]);
  const [selected, setSelected] = useState([{name: '...', Id: 1, currentVersion: 1}]);
  // Get logged in user data
  const auth = useAuth({});
  const [userId, setUserId] = useState(-1)

  // Query for their segments
  const [userSegmentsResult] = useQuery({
    query: getUserSegmentsAll,
    variables: {email: auth.user.email }
  })
  const [userIdResult] = useQuery({
    query: getUserId,
    variables: {email: auth.user.email }
  })
  const [paperSegmentsResult] = useQuery({
    query: getPaperSegments,
    variables: {paperId: router.query.id }
  })
  useEffect(() => {
    if(!userSegmentsResult.fetching && userSegmentsResult.data){
      setSegments(userSegmentsResult.data.Segment)
    }
  }, [userSegmentsResult])

  useEffect(() => {
    if(!userIdResult.fetching) {
      setUserId(userIdResult.data.Users[0].Id)
    }
  }, [userIdResult])

  useEffect(() => {
    if(!paperSegmentsResult.fetching && paperSegmentsResult.data){
      for(var i = 0; i < paperSegmentsResult.data.PaperSegment.length - 1; i++){

      }
      setSelected(paperSegmentsResult.data.PaperSegment)
    }
  }, [paperSegmentsResult])


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
              return <SegmentCardAll name={segment.name} id={segment.id} version={segment.currentVersion} key={segment.id} />
            })}
          </Box>
        </Box>
        <Box p={3} width={0.5}>
          <Text variant='heading' mb={3}>
            Selected Segments
          </Text>
          <Divider />
          <Box>
            {selected.map((Segment) => {
              return <SegmentCardAll name={Segment.name} id={Segment.id} version={Segment.currentVersion} key={Segment.id} />
            })}
          </Box>
        </Box>
      </Container>




    </div>
  )
}

export default withLoginRequired(withAuth(EditSegment))
