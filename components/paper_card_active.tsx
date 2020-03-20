import React, { FC } from 'react'
import { Flex, Box, Button } from 'rebass'
import Link from 'next/link'
import styled from '@emotion/styled'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye, faUserEdit} from '@fortawesome/free-solid-svg-icons'

const EditLink = styled.a`
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

interface PaperCardActiveProps {
  name: string
  id: number
  version: number
}


const PaperCardActive: FC<PaperCardActiveProps> = props => {
  return (
    <Flex variant='paper_card'>
      <Box width={0.6} css={{ color: '#545454' }}>
        {props.name}
        <VersionText>Version: {props.version}.0</VersionText>
      </Box>
      <Box width={0.1}>
        <Link href='/app/papers/view/[id]' as={`/app/papers/view/${props.id}`} passHref>
          <EditLink><FontAwesomeIcon icon={faEye} /></EditLink>
        </Link>
      </Box>
      <Box>
        <Link href='/app/papers/segedit[id]' as={`/app/papers/segedit/${props.id}`} passHref>
          <EditLink><FontAwesomeIcon icon={faUserEdit} /></EditLink>
        </Link>
      </Box>
    </Flex>
  )
}

export default PaperCardActive
