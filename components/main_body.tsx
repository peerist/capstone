import React, { FC } from 'react'
import { Flex, Text, Box, Button} from 'rebass'

import SearchInput from './searchbox'

const MainBody: FC<{}> = props => (
  <Flex css={{justifyContent:'center'}}>
    <SearchInput />
  </Flex>
)


export default MainBody
