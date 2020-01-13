import React from 'react'
import Link from 'next/link'
import { Flex, Heading } from 'rebass'

const Nav = () => (
  <Flex justifyContent="space-between" alignItems="center" p={4}>
    <Heading variant="heading">Peerist</Heading>
    <Flex justifyContent="center">
      <Link href="/">
        <a>Home</a>
      </Link>
    </Flex>
  </Flex>
)

export default Nav
