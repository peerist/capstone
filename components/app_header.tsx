import React, { FC } from 'react'
import { Flex, Box, Text, Link } from 'rebass'

interface HeaderLink {
  name: string
  dest: string
}

interface AppHeaderProps {
  header: HeaderLink[]
}

const AppHeader: FC<AppHeaderProps> = props => (
  <Flex justifyContent='center' css={{ width: '100%', background: 'black' }}>
    <Box p={4} css={{ width: '1250px', marginRight: '50px' }}>
        {props.header.length === 1
          ? (
            <Link variant='app_header_link' href={props.header[0].dest}>
              {props.header[0].name}
            </Link>)
          : (
            <div>
              {props.header.slice(0, props.header.length - 1).map(item => {
                return (
                  <span>
                    <Link variant='app_header_link' href={item.dest}>
                      {item.name}
                    </Link>
                    <Text as='span' variant='noCursorText' style={{ marginRight: '30px', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                      /
                    </Text>
                  </span>
                )
              })}
              <Link variant='app_header_link' href={props.header.slice(props.header.length - 1)[0].dest} css={{ color: '#9DDEB7' }}>
                {props.header.slice(props.header.length - 1)[0].name}
              </Link>
            </div>)
        }
    </Box>
  </Flex>
)

export default AppHeader
