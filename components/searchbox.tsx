import React, { FC } from 'react'
import { Flex, Text, Box, Button} from 'rebass'
import { Input } from '@rebass/forms'


const SearchInput: FC<{}> = props => (
  <Flex variant='mainBody'>
    <Input variant='mainSearch'
      id='search'
      name='search'
      type='search'
      placeholder='Search for papers...'
    />
    <Button type='submit' variant='buttonSearch'>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </Button>
  </Flex>
)

export default SearchInput
