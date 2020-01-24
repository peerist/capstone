import React from 'react'
import { Flex, Text, Link } from 'rebass'

import AppHeader from '../components/app_header'
import Divider from '../components/divider'
import Container from '../components/container'

const App = () => {
  return (
    <div>
      <AppHeader header={['Dashboard']}/>

      <Container pt={3} justifyContent='space-between'>
        <Link variant='link_dashboard_btn' href='/app/segments' width={0.33}>
          Segments
        </Link>
        <Link variant='link_dashboard_btn' href='/app/papers' width={0.33}>
          Papers
        </Link>
        <Link variant='link_dashboard_btn' href='/app/circles' width={0.33}>
          Circles
        </Link>
      </Container>

      <Container pt={3}>
        <Divider />
      </Container>

    </div>
  )
}

export default App
