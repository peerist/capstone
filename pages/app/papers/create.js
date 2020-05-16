import React, { useState, useEffect } from 'react'
import { Text, Box, Button } from 'rebass'
import { Label, Input, Textarea } from '@rebass/forms'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'
import Router from 'next/router'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useMutation, useQuery } from 'urql'
import { getUserId, addPaper, addPaperVersion } from '../../queries'
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

const CreatePaper = () => { const auth = useAuth({});
    const [paperTitle, setPaperTitle] = useState('')
    const [userId, setUserId] = useState(-1)
    const [paperId, getPaperId] = useState(-1)
    const [mutationResult, executeMutation] = useMutation(addPaper);
    const [queryResult] = useQuery({
        query: getUserId,
        variables: {email: auth.user.email }
    })
    useEffect(() => {
        if(!queryResult.fetching && queryResult.data) {
            setUserId(queryResult.data.Users[0].Id)
        }
    }, [queryResult])
    const click_confirm = (id) => {
        console.log(id)
        console.log("Paper created")
        //Router.push('/app/papers/review/'+ id)
        Router.push('/app/papers/')
    }

    // Call this to insert a Paper, ideally on a form submit
    const createNewPaper = (paperTitle, userEmail) => {
        executeMutation({userId: userId, name: paperTitle}).then(mutationResult => {
            console.log(mutationResult)
            const id = mutationResult.data.insert_Paper.returning[0].Id
            console.log(mutationResult.data.insert_Paper.returning[0].Id)
            console.log(id)
            click_confirm(id)
        })
    }

    const handleConfirmClick = () => {
        console.log(paperTitle)
        createNewPaper(paperTitle,  userId)

    }

    const handleTitleChange = (event) => {
        setPaperTitle(event.target.value)
    }
    const handleContentChange = (event) => {
        setPaperContent(event.target.value)
    }
    return (
        <div>
            <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Papers', dest: '/app/papers'}, {name: 'Create Paper', dest: '/app/papers/create'}]}/>

            <Container pt={3} justifyContent='space-between'>
                <Text variant='heading' style={{padding: '11px 0px 10px 20px'}}>
                    Create Paper
                </Text>
            </Container>

            <Container pt={3}>
                <Divider />
            </Container>

            <Container pt='4' pl='5' pr='5' pb='5'>
                <Box width={1} mb='3'>
                    <Label htmlFor='title' style={{fontWeight: 'bold'}} mb='1'>Title</Label>
                    <Input id='title' name='title' placeholder='Example Title' mb='3' onChange={handleTitleChange} value={paperTitle}/>
                    <ConfirmButton onClick={ handleConfirmClick }>
                        <FontAwesomeIcon icon={faCheckCircle} />
                        Confirm
                    </ConfirmButton>
                </Box>
            </Container>
        </div>
    )
}

export default withLoginRequired(withAuth(CreatePaper))
