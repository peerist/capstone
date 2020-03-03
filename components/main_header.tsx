  import React, { FC } from 'react'
  import { Flex, Text, Box } from 'rebass'

  interface MainHeaderProps {
    header: string[]
  }


  const MainHeader: FC<MainHeaderProps> = props => (
    <Flex justifyContent='center' css={{alignItems: 'center', width: '100%', background: 'black', height: '20em' }}>
      <Box p={5} css={{ WebkitFlexBasis:'1140px', width: '100%'}}>
        <Text variant='main_header'>
          {props.header.length === 1
            ? props.header[0]
            : (
              <div>
                {props.header.slice(0, props.header.length - 1).map(item => {
                  return (
                    <span style={{marginRight: '2em'}}>
                      {item}
                    </span>
                  )
                })}

              </div>
            )
          }
          <br></br>
          For everyone.
        </Text>
      </Box>
    </Flex>
  )

  export default MainHeader
