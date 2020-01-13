import React from 'react'
import Head from 'next/head'
import gql from 'graphql-tag'
import { useQuery } from 'urql'
import { Flex, Text } from 'rebass'
import { withUrqlClient } from 'next-urql'

import Nav from '../components/nav'
import Pokemon from '../components/pokemon'

const query = gql`
  {
    pokemon(name: "Kabuto") {
      number
      name
      image
    }
  }
`

const Home = () => {
  const [res] = useQuery({
    query
  })

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <Flex width="100vw" justifyContent="center">
        {res.fetching ? (
          <Text>Loading...</Text>
        ) : (
          <Pokemon {...res.data.pokemon} />
        )}
      </Flex>
    </div>
  )
}

export default withUrqlClient({ url: 'https://graphql-pokemon.now.sh/' })(Home)
