import React, { FC } from 'react'
import { Flex, Box, Button } from 'rebass'
import styled from '@emotion/styled'

const Header = styled.h5`
  margin-top: 0;
  margin-bottom: 5px;
`

interface PaperData {
  paperName?: String;
  version?: String;
}

const SharePaperCard: FC<PaperData> = props => (
  <Flex variant='circle_data'>
    <Box width={1}>
      <Header>Paper Name</Header>
      {props.paperName}
    </Box>
    <Box width={1}>
      <Header>Version</Header>
      {props.version}
    </Box>
  </Flex>
)

export default SharePaperCard
