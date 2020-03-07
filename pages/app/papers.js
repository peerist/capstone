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
import Styles from '../../theme/index.ts'

const CreateButton = styled.a`
  ${Styles.variants.link_btn_secondary_active}
`

const Papers = () => {
  return (
    <div>
      <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Papers', dest: '/app/papers'}]}/>

      <Container pt={3} justifyContent='flex-end'>
        <Link href='/app/papers/create' passHref >
          <CreateButton>
            <FontAwesomeIcon icon={faPlusCircle} />
            Create Paper
          </CreateButton>
        </Link>
      </Container>

      <Container pt={3}>
        <Divider />
      </Container>

    </div>
  )
}

export default withLoginRequired(withAuth(Papers))
