import React, { FC } from 'react'
import { Box, Heading, Text, Image, Flex } from 'rebass'

interface PokemonProps {
  name: string
  number: number
  image: string
}

const Pokemon: FC<PokemonProps> = props => (
  <Flex width="400px" flexDirection="column" alignItems="center">
    <Flex justifyContent="space-between" alignItems="center" mb={4}>
      <Heading fontSize={5}>{props.name}</Heading>
      <Box p={3} bg="red" sx={{ borderRadius: '5px' }}>
        <Text
          fontSize={3}
          fontWeight={600}
          color="white"
          sx={{ lineHeight: 1 }}>
          {props.number}
        </Text>
      </Box>
    </Flex>
    <Image src={props.image} alt={`Picture of ${props.name}`} />
  </Flex>
)

export default Pokemon
