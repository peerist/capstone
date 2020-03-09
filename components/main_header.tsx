import React, { FC } from 'react'
import { Flex, Text, Box } from 'rebass'
import Typing from 'react-typing-animation'


const MainHeader: FC<{}> = props => (
  <Flex justifyContent='center' css={{alignItems: 'center', width: '100%', background: 'black', height: '20em' }}>
    <Box p={5} css={{ WebkitFlexBasis:'1140px', width: '100%'}}>
      <Text variant='main_header'>
            <div>
              <Typing>
                  <span>Papers.</span>
                  <Typing.Backspace count={7} delay={2000} />
                  <span>Peer reviews.</span>
                  <Typing.Backspace count={14} delay={2000} />
                  <span>Experiments.</span>
                  <Typing.Backspace count={12} delay={2000} />
                  <span>Datasets.</span>
                  <Typing.Backspace count={9} delay={2000} />
                  <span>Citations.</span>
                  <Typing.Backspace count={10} delay={2000} />
                  <span>Science.</span>
                  <Typing.Backspace count={8} delay={2000} />
              </Typing>
            </div>
        For everyone.
      </Text>
    </Box>
  </Flex>
)

export default MainHeader
