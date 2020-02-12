import React, { FC } from 'react'
import { Flex, Box, Button } from 'rebass'
import styled from '@emotion/styled'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserClock, faPen, faUserEdit, faToggleOn } from '@fortawesome/free-solid-svg-icons'

interface SegmentCardActiveProps {
  name: string
  id: number
  version: number
  status: number
  toggle(any): null
}

const ToggleOn = styled(Button)`
  background: none;
  font-size: 30px;
  color: black;
  padding: 0;
  :focus {
    outline: 0;
  }
`;

const VersionText = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #bdbdbd;
  font-weight: normal;
`;

const SegmentCardActive: FC<SegmentCardActiveProps> = props => (
  <Flex variant='segment_card'>
    <Box width={0.6} css={{ color: '#545454' }}>
      {props.name}
      <VersionText>Version: {props.version}</VersionText>
    </Box>
    <Box width={0.1} css={{ fontSize: '24px', color: `${props.status === 1 ? '#9DDEB7' : '#d9d9d9'}` }}>
      <FontAwesomeIcon icon={faUserClock} />
    </Box>
    <Box width={0.1} css={{ fontSize: '24px', color: `${props.status === 2 ? '#9DDEB7' : '#d9d9d9'}` }}>
      <FontAwesomeIcon icon={faPen} />
    </Box>
    <Box width={0.1} css={{ fontSize: '24px', color: `${props.status === 3 ? '#9DDEB7' : '#d9d9d9'}` }}>
      <FontAwesomeIcon icon={faUserEdit} />
    </Box>
    <Box width={0.1}>
      <ToggleOn onClick={() => props.toggle(props.id)}>
        <FontAwesomeIcon icon={faToggleOn} />
      </ToggleOn>
    </Box>
  </Flex>
)

export default SegmentCardActive
