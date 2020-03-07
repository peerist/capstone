import React from 'react'
import { withAuth, withLoginRequired } from 'use-auth0-hooks'
import Link from 'next/link'
import styled from '@emotion/styled'

import Nav from '../components/nav'
import AppHeader from '../components/app_header'
import Divider from '../components/divider'
import Container from '../components/container'

const DashBoardLink = styled.a`
  background: #9DDEB7;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  color: black;
  padding: 20px;
  width: 33%;
`

const App = () => {
  return (
    <div>
      <AppHeader header={[{name: 'Dashboard', dest: '/app'}]}/>

      <Container pt={3} justifyContent='space-between'>
        <Link href='/app/segments' passHref>
          <DashBoardLink>Segments</DashBoardLink>
        </Link>
        <Link href='/app/papers' passHref>
          <DashBoardLink>Papers</DashBoardLink>
        </Link>
        <Link href='/app/circles' passHref>
          <DashBoardLink>Circles</DashBoardLink>
        </Link>
      </Container>

      <Container pt={3}>
        <Divider />
      </Container>
    </div>
  )
}

export default withLoginRequired(withAuth(App))
