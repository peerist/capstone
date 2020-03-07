import React from 'react'
import { withAuth, withLoginRequired } from 'use-auth0-hooks'
import Link from 'next/link'
import styled from '@emotion/styled'

import Nav from '../components/nav'
import AppHeader from '../components/app_header'
import Divider from '../components/divider'
import Container from '../components/container'
import styles from '../theme/index.ts'

const DashBoardLink = styled.a`
  ${styles.variants.link_dashboard_btn}
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
