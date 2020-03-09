import React from 'react'
import { Flex, Box, Text, Button } from 'rebass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import styled from '@emotion/styled'
import { withAuth, withLoginRequired } from 'use-auth0-hooks'

import AppHeader from '../../../components/app_header'
import Divider from '../../../components/divider'
import Container from '../../../components/container'
import PaperCard from '../../../components/circle_paper_card'

const CirclesBox = styled(Box)`
  background-color: #f5f6f7;
  border: 1px solid white;
  border-radius: 25px;
  margin-bottom: 15px;
`;

const CircleButton = styled(Button)`
appearance: none;
border: 3px solid black;
display: inline-block;
text-align: center;
line-height: inherit;
text-decoration: none;
background: white;
color: black;
font-size: 16px;
padding: 10px 16px;
font-weight: bold;
border-radius: 7px;
cursor: pointer;
margin: 7px;
:hover {
  background: black;
  color: white;
}
& svg {
  margin-right: 5px;
}
`

const Circle = () => {
  return (
    <div>
        <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Circles', dest: '/app/circles'}, {name: 'Hello World', dest: '/app/circles'}]}/>


        <Container pt={3} justifyContent='flex-end'>
            <CircleButton>
                <FontAwesomeIcon icon={faUserPlus} />
                Invite Members
            </CircleButton>
            <CircleButton>
                <FontAwesomeIcon icon={faEdit} />
                Edit Circle
            </CircleButton>
        </Container>

        <Container pt={3}>
            <Divider />
        </Container>

        <Container pt={3}>
        <Text variant='heading' mb={3}>
            Papers
        </Text>

        <CirclesBox p={3} width={1}>
            <PaperCard paperName = 'Hello World' version = {1.0} />
        </CirclesBox>
        </Container>

        <Container pt={3}>
            <Divider />
        </Container>   

        <Container pt={3}>
        <Text variant='heading' mb={3}>
            Members
        </Text>
        
        <Container pt={3}>
        </Container>   

        <CirclesBox p={3} width={0.1}>
        <Box width={0.09}>
            <Text>Michael</Text>
            <img src='https://cf.mastohost.com/v1/AUTH_91eb37814936490c95da7b85993cc2ff/blackrockcity/accounts/avatars/000/000/001/original/cd46c94e39268f0b.jpg' width={50} height={50} />
        </Box>
        </CirclesBox>
        </Container>

    </div>
  )
}

export default withLoginRequired(withAuth(Circle))
