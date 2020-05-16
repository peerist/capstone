import React, { FC } from 'react'
import { Flex, Box, Button } from 'rebass'
import styled from '@emotion/styled'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarker } from '@fortawesome/free-solid-svg-icons'

const Header = styled.h5`
  margin-top: 0;
  margin-bottom: 5px;
`

const EditLink = styled.a`
  font-size: 18px;
  cursor: pointer;
`

const FeedbackButton = styled(Button)`
  appearance: none;
  border: 3px solid black;
  display: inline-block;
  text-align: center;
  line-height: inherit;
  text-decoration: none;
  background: #f5f6f7;
  color: black;
  font-size: 16px;
  padding: 10px 16px;
  font-weight: bold;
  border-radius: 7px;
  cursor: pointer;
  :hover {
    background: black;
    color: white;
  }
`

interface PaperData {
  paperName?: String;
  version?: String;
  author?: String;
  paperId?: Number;
}

const PaperCard: FC<PaperData> = props => (
  <Flex variant='circle_data'>
    <Box width={0.5}>
      <Header>Paper Name</Header>
      {props.paperName}
    </Box>
    <Box width={0.5}>
      <Header>Version</Header>
      {props.version}
    </Box>
    <Box width={0.5}>
      <Header>Author</Header>
      {props.author}
    </Box>
    
    <Box width={0.2} css={{ fontSize: '30px', color: 'black' }}>
        <Link href='/app/papers/view/[id]' as={`/app/papers/view/${props.paperId}`} >
          <FeedbackButton>
            <EditLink><FontAwesomeIcon icon={faMarker} /><br/>View Paper</EditLink>
          </FeedbackButton>
        </Link>
    </Box>
  </Flex>
)

export default PaperCard
