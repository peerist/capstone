import React, { FC } from 'react'
import { Flex, Box } from 'rebass'
import Link from 'next/link'
import styled from '@emotion/styled'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faToggleOff } from '@fortawesome/free-solid-svg-icons'

const EditLink = styled.a`
  font-size: 24px;
  color: #9DDEB7;
  cursor: pointer;
`

interface SegmentCardInactiveProps {
  name: string
  id: number
}

const SegmentCardInactive: FC<SegmentCardInactiveProps> = props => (
  <Flex variant='segment_card'>
    <Box width={0.8}>
      {props.name}
    </Box>
    <Box width={0.1}>
      <Link href='/app/segments/edit/[id]' as={`/app/segments/edit/${props.id}`} >
        <EditLink><FontAwesomeIcon icon={faEdit} /></EditLink>
      </Link>
    </Box>
    <Box width={0.1} css={{ fontSize: '30px', color: 'black' }}>
      <FontAwesomeIcon icon={faToggleOff} />
    </Box>
  </Flex>
)

export default SegmentCardInactive
