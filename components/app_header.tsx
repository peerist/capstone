import React, { FC } from 'react'
import { Flex, Text, Box } from 'rebass'

interface AppHeaderProps {
  header: string[]
}

const AppHeader: FC<AppHeaderProps> = props => (
  <Flex justifyContent='center' css={{ width: '100%', background: 'black' }}>
    <Box p={4} css={{ width: '1250px' }}>
      <Text variant='app_header'>
        {props.header.length === 1
          ? props.header[0]
          : (
            <div>
              {props.header.slice(0, props.header.length - 1).map(item => {
                return (
                  <span>
                    <span style={{marginRight: '30px'}}>
                      {item}
                    </span>
                    <span style={{marginRight: '30px'}}>
                      /
                    </span>
                  </span>
                )
              })}
              <span style={{color: '#9DDEB7'}}>
                {props.header.slice(props.header.length - 1)[0]}
              </span>
            </div>
          )
        }
      </Text>
    </Box>
  </Flex>
)

export default AppHeader
