import React, { FC } from 'react'

import { Flex, Box, Text } from 'rebass'
import Link from 'next/link'
import styled from '@emotion/styled'


interface HeaderLink {
  name: string
  dest: string
}

interface AppHeaderProps {
  header: HeaderLink[]
}

const HeaderLinkWhite = styled.a`
  margin-right: 30px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  cursor: pointer;
`

const HeaderLinkGreen = styled.a`
  margin-right: 30px;
  color: #9DDEB7;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  cursor: pointer;
`

const StyledSlash = styled.span`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-right: 30px;
  color: white;
  font-weight: bold;
  font-size: 20px;
`

const AppHeader: FC<AppHeaderProps> = props => (
  <Flex justifyContent='center' css={{ width: '100%', background: 'black' }}>
    <Box p={4} css={{ width: '1250px', marginRight: '50px' }}>
        {props.header.length === 1
          ? (
            <Link href={props.header[0].dest} passHref>
              <HeaderLinkWhite>
                {props.header[0].name}
              </HeaderLinkWhite>
            </Link>)
          : (
            <div>
              {props.header.slice(0, props.header.length - 1).map(item => {
                return (
                  <span key={item.dest}>
                    <Link href={item.dest} passHref>
                      <HeaderLinkWhite>
                        {item.name}
                      </HeaderLinkWhite>
                    </Link>
                    <StyledSlash>/</StyledSlash>
                  </span>
                )
              })}
              <Link href={props.header.slice(props.header.length - 1)[0].dest} passHref>
                <HeaderLinkGreen>
                  {props.header.slice(props.header.length - 1)[0].name}
                </HeaderLinkGreen>
              </Link>
            </div>)
        }
    </Box>
  </Flex>
)

export default AppHeader
