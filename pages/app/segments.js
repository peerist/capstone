import React, { useState } from 'react'
import { Flex, Box, Text } from 'rebass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import styled from '@emotion/styled'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'

import AppHeader from '../../components/app_header'
import Divider from '../../components/divider'
import Container from '../../components/container'
import SegmentCardInactive from '../../components/segment_card_inactive'
import SegmentCardActive from '../../components/segment_card_active'

const CreateButton = styled.a`
  appearance: none;
  border: 3px solid black;
  display: inline-block;
  text-align: center;
  line-height: inherit;
  text-decoration: none;
  background: white;
  color: black;
  font-size: 16px;
  padding: 10px 16px;
  font-weight: bold;
  border-radius: 7px;
  cursor: pointer;
  margin: 7px;
  :hover {
    background: black;
    color: white;
  }
  & svg {
    margin-right: 5px;
  }
`

const Segments = () => {
  const [segmentsInactive, setSegmentsInactive] = useState([{name: 'Segment 1', id: 1, version: 1}, {name: 'Segment 2', id: 2, version: 1}, {name: 'Segment 3', id: 3, version: 1}]);
  const [segmentsActive, setSegmentsActive] = useState([{name: 'Segment 4', id: 4, version: 1, status: 1}, {name: 'Segment 5', id: 5, version: 1, status: 2}, {name: 'Segment 6', id: 6, version: 1, status: 3}]);

  const toggleOff = (id) => {
    console.log("Toggle Off: " + id);
  }

  const toggleOn = (id) => {
    console.log("Toggle On: " + id);
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
              return <SegmentCardInactive name={segment.name} id={segment.id} version={segment.version} toggle={toggleOn} key={segment.id} />
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
              return <SegmentCardActive name={segment.name} id={segment.id} version={segment.version} status={segment.status} toggle={toggleOff} key={segment.id} />
            })}
          </Box>
        </Box>
      </Container>

    </div>
  )
}

export default withLoginRequired(withAuth(Segments))
