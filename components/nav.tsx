import React, { FC } from 'react'
import { Flex, Image, Button } from 'rebass'
import { useAuth } from 'use-auth0-hooks'
import Link from 'next/link'
import styled from '@emotion/styled'

const NavLink = styled.a`
  font-weight: bold;
  color: black;
  font-size: 16px;
  text-decoration: none;
  margin: 0 3em 0 0;
  cursor: pointer;
`

const Nav: FC<{}> = props => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <Flex justifyContent="center" css={{ width: '100%' }}>
      <Flex justifyContent="space-between" alignItems="center" p={4} css={{ width: '1250px' }}>
        <Link href="/">
          <Image src="/logo.svg" css={{ height: 'auto', width: '160px', cursor: 'pointer' }} />
        </Link>
        {isAuthenticated
          ? (
            <Flex justifyContent='center' alignItems='center'>
              <Link href='/app' passHref>
                <NavLink>Dashboard</NavLink>
              </Link>
              <Link href='/app/account' passHref>
                <NavLink>Account</NavLink>
              </Link>
              <Link href='/app/about' passHref>
                <NavLink>About Us</NavLink>
              </Link>
              <Button variant='primary' onClick={logout}>
                Log Out
              </Button>
            </Flex>
          ) : (
            <Flex justifyContent='center' alignItems='center'>
              <Button variant='primary' onClick={login} css={{backgroundColor: '#9DDEB7'}}>
                Log In
              </Button>
            </Flex>
          )}
      </Flex>
    </Flex>
  )
}


export default Nav
