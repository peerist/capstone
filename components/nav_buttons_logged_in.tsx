import React, { FC } from 'react'
import { Flex, Link } from 'rebass'

const NavButtonsLoggedIn: FC<{}> = props => (
  <Flex justifyContent='center' alignItems='center'>
    <Link variant='link_primary' href='/app'>
      Dashboard
    </Link>
    <Link variant='link_primary' href='/app/account'>
      Account
    </Link>
    <Link variant='link_btn_primary' href='/api/logout'>
      Log Out
    </Link>
  </Flex>
)

export default NavButtonsLoggedIn
