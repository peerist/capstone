import React, { FC } from 'react'
import { Flex, Box, Button } from 'rebass'
import Link from 'next/link'
import styled from '@emotion/styled'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye, faPlus} from '@fortawesome/free-solid-svg-icons'

const EditLink = styled.a`
  font-size: 24px;
  color: #9DDEB7;
  cursor: pointer;
`
const ToggleOn = styled.a`
  font-size: 24px;
  color: #9DDEB7;
  cursor: pointer;
`

const VersionText = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #bdbdbd;
  font-weight: normal;
`;

interface SegmentCardAllProps {
  name: string
  id: number
  version: number
  toggle(any): null
}


const SegmentCardAll: FC<SegmentCardAllProps> = props => {
  return (
    <Flex variant='segment_card'>
      <Box width={0.6} css={{ color: '#545454' }}>
        {props.name}
        <VersionText>Version: {props.version}.0</VersionText>
      </Box>
      <Box width={0.1}>
        <Link href='/app/segments/view/[id]' as={`/app/segments/view/${props.id}`} passHref>
          <EditLink><FontAwesomeIcon icon={faEye} /></EditLink>
        </Link>
      </Box>
      <Box width={0.1}>
      <ToggleOn onClick={() => props.toggle(props.id)}>
        <FontAwesomeIcon icon={faPlus} />
      </ToggleOn>
      </Box>
    </Flex>
  )
}

export default SegmentCardAll
