import React, { FC } from 'react'
import { Flex, Box } from 'rebass'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserClock, faPen, faUserEdit, faCheckSquare, faToggleOn, faUserPlus, faComment } from '@fortawesome/free-solid-svg-icons'

interface CircleData {
  circleName?: String;
  owner?: String;
  subject?: String;
  memberCount?: String;
}

const CircleCard: FC<CircleData> = props => (
  <Flex variant='circle_data'>
    <Box width={0.5}>
      <h5>Circle Name</h5>
      {props.circleName}
    </Box>
    <Box width={0.5}>
      <h5>Circle Owner</h5>
      {props.owner}
    </Box>
    <Box width={0.5}>
      <h5>Subject</h5>
      {props.subject}
    </Box>
    <Box width={0.5}>
      <h5>Number of Members</h5>
      {props.memberCount}
    </Box>
    
    <Box width={0.1} css={{ fontSize: '30px', color: 'black' }}>
      <FontAwesomeIcon icon={faUserPlus} />
      <FontAwesomeIcon icon={faComment} />
    </Box>
  </Flex>
)

export default CircleCard
