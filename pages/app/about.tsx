import React from 'react'
import { Flex, Link, Box, Text } from 'rebass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import AppHeader from '../../components/app_header'
import Divider from '../../components/divider'
import Container from '../../components/container'

const About = () => {
  return (
    <div>
      <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Segments', dest: '/app/segments'}]}/>

      <Container pt={3} justifyContent='flex-end'>
        <Link href='/app/segments/create' variant='link_btn_secondary_active' css={{ margin: '7px', ' svg': {marginRight: '5px'} }}>
          <FontAwesomeIcon icon={faPlusCircle} />
          Create Segment
        </Link>
      </Container>

      <Container pt={3}>
        <Divider />
      </Container>

    </div>
  )
}
export default About
