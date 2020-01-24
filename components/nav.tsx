import React, { FC } from 'react'
import { Flex, Image, Link } from 'rebass'

import NavButtonsLoggedIn from './nav_buttons_logged_in'
import NavButtonsLoggedOut from './nav_buttons_logged_out'

interface NavProps {
  loginStatus: boolean
}

const Nav: FC<NavProps> = props => (
  <Flex justifyContent="center" css={{ width: '100%' }}>
    <Flex justifyContent="space-between" alignItems="center" p={4} css={{ width: '1250px' }}>
      <Link href="/">
          <Image src="/logo.svg" css={{ height: 'auto', width: '160px' }} />
      </Link>
      {props.loginStatus ? <NavButtonsLoggedIn /> : <NavButtonsLoggedOut />}
    </Flex>
  </Flex>
)

export default Nav
