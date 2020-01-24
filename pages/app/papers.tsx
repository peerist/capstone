import React from 'react'
import { Flex, Link, Box, Text } from 'rebass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import AppHeader from '../../components/app_header'
import Divider from '../../components/divider'
import Container from '../../components/container'

const Papers = () => {
  return (
    <div>
      <AppHeader header={['Dashboard', 'Papers']}/>

      <Container pt={3} justifyContent='flex-end'>
        <Link href='/app/papers/create' variant='link_btn_secondary_active' css={{ margin: '7px', ' svg': {marginRight: '5px'} }}>
          <FontAwesomeIcon icon={faPlusCircle} />
          Create Paper
        </Link>
      </Container>

      <Container pt={3}>
        <Divider />
      </Container>

    </div>
  )
}

export default Papers
