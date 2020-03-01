import React, { useState } from 'react'
import { Text, Box, Button } from 'rebass'
import { Label, Input, Textarea } from '@rebass/forms'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'
import Router from 'next/router'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from 'urql'
import { addSegment } from '../../queries'
import AppHeader from '../../../components/app_header'
import Container from '../../../components/container'
import Divider from '../../../components/divider'

const ConfirmButton = styled(Button)`
  border: 3px solid black;
  text-align: center;
  background: white;
  color: black;
  font-size: 16px;
  padding: 10px 16px;
  font-weight: bold;
  border-radius: 7px;
  margin: 7px;
  float: right;

  :hover {
    background: black;
    color: white;
  }

  & svg {
    margin-right: 5px;
  }
`;

const CreateSegment = () => { const auth = useAuth({});
    const [segmentTitle, setSegmentTitle] = useState('')
    const [segmentContent, setSegmentContent] = useState('')
    const [mutationResult, executeMutation] = useMutation(addSegment);
    const click_confirm = () => {
        console.log("Segment created");
        Router.push('/app/segments');
    }

    // Call this to insert a segment, ideally on a form submit
    const createNewSegment = (segmentTitle, segmentContent) => {
        executeMutation({ segmentName: segmentTitle, email: auth.user.email, content: segmentContent }).then(mutationResult => {
            console.log(mutationResult.data.insert_Segment.returning[0])
            click_confirm()
        })
    }
    const handleConfirmClick = () => {
        console.log(segmentTitle, segmentContent)
        createNewSegment(segmentTitle, segmentContent)
    }

    const handleTitleChange = (event) => {
        setSegmentTitle(event.target.value)
    }
    const handleContentChange = (event) => {
        setSegmentContent(event.target.value)
    }
    return (
        <div>
            <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Segments', dest: '/app/segments'}, {name: 'Create Segment', dest: '/app/segments/create'}]}/>

            <Container pt={3} justifyContent='space-between'>
                <Text variant='heading' style={{padding: '11px 0px 10px 20px'}}>
                    Create Segment
                </Text>
            </Container>

            <Container pt={3}>
                <Divider />
            </Container>

            <Container pt='4' pl='5' pr='5' pb='5'>
                <Box width={1} mb='3'>
                    <Label htmlFor='title' style={{fontWeight: 'bold'}} mb='1'>Title</Label>
                    <Input id='title' name='title' placeholder='Example Title' mb='3' onChange={handleTitleChange} value={segmentTitle}/>
                    <Label htmlFor='content' style={{fontWeight: 'bold'}} mb='1'>Content</Label>
                    <Textarea id='content' name='content' placeholder='Example Content' style={{height: '250px'}} mb='2' onChange={handleContentChange} value={segmentContent}/>
                    <ConfirmButton onClick={ handleConfirmClick }>
                        <FontAwesomeIcon icon={faCheckCircle} />
                        Confirm
                    </ConfirmButton>
                </Box>
            </Container>
        </div>
    )
}

export default withLoginRequired(withAuth(CreateSegment))
