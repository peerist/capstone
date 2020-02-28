import React, { FC } from 'react'
import { Flex, Box, Button } from 'rebass'
import Link from 'next/link'
import styled from '@emotion/styled'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faToggleOff } from '@fortawesome/free-solid-svg-icons'

const EditLink = styled.a`
  font-size: 24px;
  color: #9DDEB7;
  cursor: pointer;
`

const ToggleOff = styled(Button)`
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

interface SegmentCardInactiveProps {
  name: string
  id: number
  version: number
  toggle(any): null
}

const SegmentCardInactive: FC<SegmentCardInactiveProps> = props => (
    <Flex variant='segment_card'>
      <Box width={0.8} css={{ color: '#545454' }}>
        {props.name}
        <VersionText>Version: {props.version}</VersionText>
      </Box>
      <Box width={0.1}>
        <Link href='/app/segments/edit/[id]' as={`/app/segments/edit/${props.id}`} passHref>
          <EditLink><FontAwesomeIcon icon={faEdit} /></EditLink>
        </Link>
      </Box>
      <Box width={0.1}>
        <ToggleOff onClick={() => props.toggle(props.id)}>
          <FontAwesomeIcon icon={faToggleOff} />
        </ToggleOff>
      </Box>
    </Flex>
  )

export default SegmentCardInactive
