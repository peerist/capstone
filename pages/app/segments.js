import React, { useState, useEffect } from 'react'
import { Flex, Box, Text } from 'rebass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import styled from '@emotion/styled'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'
import { useQuery, useMutation } from 'urql'
import AppHeader from '../../components/app_header'
import Divider from '../../components/divider'
import Container from '../../components/container'
import SegmentCardInactive from '../../components/segment_card_inactive'
import SegmentCardActive from '../../components/segment_card_active'
import { getUserId, getUserSegments, setSegmentStatus } from '../queries'
import Styles from '../../theme/index.ts'

const CreateButton = styled.a`
  ${Styles.variants.link_btn_secondary_active}
`
const Segments = () => {
  const [segmentsInactive, setSegmentsInactive] = useState([{name: '...', id: 1, version: 1, status: 0}]);
  const [segmentsActive, setSegmentsActive] = useState([{name: '...', id: 2, version: 1, status: 1}]);

  // Get logged in user data
  const auth = useAuth({});
  const [userId, setUserId] = useState(-1)

  // Query for their segments
  const [userSegmentsResult] = useQuery({
    query: getUserSegments,
    variables: {id: userId }
  })
  const [userIdResult] = useQuery({
    query: getUserId,
    variables: {email: auth.user.email }
  })
  const [segmentStatusChangeResult, executeSetSegmentStatus] = useMutation(setSegmentStatus)

  // useEffect() will call the given function if queryResult changes. This presents the inifinite redraw loop
  useEffect(() => {
    if(!userSegmentsResult.fetching && userSegmentsResult.data){
      setSegmentsInactive(userSegmentsResult.data.inactive)
      setSegmentsActive(userSegmentsResult.data.active)
    }
  }, [userSegmentsResult])

  useEffect(() => {
    if(!userIdResult.fetching) {
      setUserId(userIdResult.data.Users[0].Id)
    }
  }, [userIdResult])

  const toggleOff = (id) => {
    executeSetSegmentStatus({ segmentId: id, newStatus: 0 }).then(mutationResult => {
      const affectedSegment = mutationResult.data.update_Segment.returning[0]
      const activeSegments = segmentsActive.filter(segment => {
        return segment.id !== affectedSegment.id
      })
      const inactiveSegments = Array.from(segmentsInactive)
      inactiveSegments.push(affectedSegment)
      setSegmentsActive(activeSegments)
      setSegmentsInactive(inactiveSegments)
    })
  }

  const toggleOn = (id) => {
    executeSetSegmentStatus({ segmentId: id, newStatus: 1 }).then(mutationResult => {
      const affectedSegment = mutationResult.data.update_Segment.returning[0]
      const inactiveSegments = segmentsInactive.filter(segment => {
        return segment.id !== affectedSegment.id
      })
      const activeSegments = Array.from(segmentsActive)
      activeSegments.push(affectedSegment)
      setSegmentsActive(activeSegments)
      setSegmentsInactive(inactiveSegments)
    })
  }


  return (
    <div>
      <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Segments', dest: '/app/segments'}]}/>

      <Container pt={3} justifyContent='flex-end'>
        <Link href='/app/segments/create' passHref>
          <CreateButton>
            <FontAwesomeIcon icon={faPlusCircle} />
            Create Segment
          </CreateButton>
        </Link>
      </Container>

      <Container pt={3}>
        <Divider />
      </Container>

      <Container pr={5} pl={5} justifyContent='space-between'>
        <Box p={3} width={0.5}>
          <Text variant='heading' mb={3}>
            Inactive
          </Text>
          <Divider />
          <Box>
            {segmentsInactive.map((segment) => {
              return <SegmentCardInactive name={segment.name} id={segment.id} version={segment.currentVersion} toggle={toggleOn} key={segment.id} />
            })}
          </Box>
        </Box>
        <Box p={3} width={0.5}>
          <Text variant='heading' mb={3}>
            Active
          </Text>
          <Divider />
          <Box>
            {segmentsActive.map((segment) => {
              return <SegmentCardActive name={segment.name} id={segment.id} version={segment.currentVersion} status={segment.status} toggle={toggleOff} key={segment.id} />
            })}
          </Box>
        </Box>
      </Container>

    </div>
  )
}

export default withLoginRequired(withAuth(Segments))
