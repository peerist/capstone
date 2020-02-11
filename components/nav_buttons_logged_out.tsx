import React, { FC } from 'react'
import { Flex, Link } from 'rebass'

const NavButtonsLoggedOut: FC<{}> = props => (
  <Flex justifyContent='center' alignItems='center'>
    <Link variant='link_primary' href='/app/about'>
      About Us
    </Link>
    <Link variant='link_btn_primary' href='/api/login'>
      Log In
    </Link>
  </Flex>
)

export default NavButtonsLoggedOut
