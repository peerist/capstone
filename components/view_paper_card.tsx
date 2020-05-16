import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Text, Button } from 'rebass'

import Container from './container'
import Divider from './divider'

const CardContainer = styled.div`
  width: 100%;
  height: 200px;
  border-bottom: 1px solid black;
  cursor: pointer;
  padding: 10px;
`;

interface ViewPaperCardProps {
  content: string
  name: string
  download(any): null
}

const ViewPaperCard: FC<ViewPaperProps> = props => {

  return (
    <div>
    <Container pt={3}>
    <Text variant='heading' mb={3}>
      {props.name}
    </Text>
    <Divider />
    </Container>
    <CardContainer style={{backgroundColor: '#FFF0E0', height: 'auto'}}>
      <Text style={{ fontSize: '14px', height: 'auto', whiteSpace: 'pre-wrap'}}>
        {props.content}
      </Text>
    </CardContainer>
    <br/>
    <Button variant='download' onClick={() => props.download(props.content, props.name)}> Download </Button>
    </div>
  )
}

export default ViewPaperCard
