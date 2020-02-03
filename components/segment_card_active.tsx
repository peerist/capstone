import React, { FC } from 'react'
import { Flex, Box } from 'rebass'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserClock, faPen, faUserEdit, faCheckSquare, faToggleOn } from '@fortawesome/free-solid-svg-icons'

interface SegmentCardActiveProps {
  name: string
  id: number
}

const SegmentCardActive: FC<SegmentCardActiveProps> = props => (
  <Flex variant='segment_card'>
    <Box width={0.5}>
      {props.name}
    </Box>
    <Box width={0.1} css={{ fontSize: '24px', color: '#9DDEB7' }}>
      <FontAwesomeIcon icon={faUserClock} />
    </Box>
    <Box width={0.1} css={{ fontSize: '24px' }}>
      <FontAwesomeIcon icon={faPen} />
    </Box>
    <Box width={0.1} css={{ fontSize: '24px' }}>
      <FontAwesomeIcon icon={faUserEdit} />
    </Box>
    <Box width={0.1} css={{ fontSize: '24px' }}>
      <FontAwesomeIcon icon={faCheckSquare} />
    </Box>
    <Box width={0.1} css={{ fontSize: '30px', color: 'black' }}>
      <FontAwesomeIcon icon={faToggleOn} />
    </Box>
  </Flex>
)

export default SegmentCardActive
