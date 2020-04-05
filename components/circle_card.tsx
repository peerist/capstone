import React, { FC } from 'react'
import { Flex, Box } from 'rebass'
import styled from '@emotion/styled'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faComment, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Header = styled.h5`
  margin-top: 0;
`

interface CircleData {
  circleName?: String;
  owner?: String;
  subject?: String;
  memberCount?: String;
}

const CircleCard: FC<CircleData> = props => (
  <Flex variant='circle_data'>
    <Box width={0.5}>
      <Header>Circle Name</Header>
      {props.circleName}
    </Box>
    <Box width={0.5}>
      <Header>Circle Owner</Header>
      {props.owner}
    </Box>
    <Box width={0.5}>
      <Header>Subject</Header>
      {props.subject}
    </Box>
    <Box width={0.5}>
      <Header>Number of Members</Header>
      {props.memberCount}
    </Box>
    
    {/* <Box width={0.1} css={{ fontSize: '30px', color: 'black' }}>
      <FontAwesomeIcon icon={} />
      <FontAwesomeIcon icon={faEnvelope} />
    </Box> */}
  </Flex>
)

export default CircleCard
