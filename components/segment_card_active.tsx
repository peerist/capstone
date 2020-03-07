import React, { FC } from 'react'
import { Flex, Box, Button } from 'rebass'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOn } from '@fortawesome/free-solid-svg-icons'

import SegmentCardActivePopover from './segment_card_active_popover';

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

const SegmentCardActive: FC<SegmentCardActiveProps> = props => {
  return (
    <Flex variant='segment_card'>
      <Box width={0.6} css={{ color: '#545454' }}>
        {props.name}
        <VersionText>Version: {props.version}.0</VersionText>
      </Box>
      <SegmentCardActivePopover icon_status={1} current_status={props.status} icon="clock" text="Status: Waiting for a match" />
      <SegmentCardActivePopover icon_status={2} current_status={props.status} icon="pen" text="Status: Give feedback" />
      <SegmentCardActivePopover icon_status={3} current_status={props.status} icon="edit" text="Status: Waiting for feedback" />
      <Box width={0.1} css={{ textAlign: 'center' as 'center'}}>
        <ToggleOn onClick={() => props.toggle(props.id)}>
          <FontAwesomeIcon icon={faToggleOn} />
        </ToggleOn>
      </Box>
    </Flex>
  )
}

export default SegmentCardActive
