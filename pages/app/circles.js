import React from 'react'
import { Flex, Box, Text } from 'rebass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import styled from '@emotion/styled'
import { withAuth, withLoginRequired } from 'use-auth0-hooks'

import AppHeader from '../../components/app_header'
import Divider from '../../components/divider'
import Container from '../../components/container'
import CircleCard from '../../components/circle_card'

const CreateButton = styled.a`
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

const Circles = () => {
  return (
    <div>
      <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Circles', dest: '/app/circles'}]}/>

      <Container pt={3} justifyContent='flex-end'>
        <Link href='/app/circles/create' passHref>
          <CreateButton>
            <FontAwesomeIcon icon={faPlusCircle} />
            Create Circle
          </CreateButton>
        </Link>
      </Container>

      <Container pt={3}>
        <Divider />
      </Container>

      <Container pt={3}>
        <Box p={3} width={1} backgroundColor='#f5f6f7' border-radius='25px!important'>
          <CircleCard circleName = 'Hello World' owner = 'Michael' subject = 'Computer Science' memberCount = {4} />
        </Box>
      </Container>

    </div>
  )
}

export default withLoginRequired(withAuth(Circles))
