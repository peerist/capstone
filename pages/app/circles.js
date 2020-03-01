import React, { useState, useEffect } from 'react'
import { Flex, Box, Text } from 'rebass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import styled from '@emotion/styled'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'
import { useQuery } from 'urql'
import { getCircleMembershipForUser } from '../queries'

import AppHeader from '../../components/app_header'
import Divider from '../../components/divider'
import Container from '../../components/container'

const CreateButton = styled.a`
  appearance: none;
  border: 3px solid black;
  display: inline-block;
  text-align: center;
  line-height: inherit;
  text-decoration: none;
  background: white;
  color: black;
  font-size: 16px;
  padding: 10px 16px;
  font-weight: bold;
  border-radius: 7px;
  cursor: pointer;
  margin: 7px;
  :hover {
    background: black;
    color: white;
  }
  & svg {
    margin-right: 5px;
  }
`

const handleCirclesQuery = (auth, queryResult, setCircles) => {
  if(!queryResult.fetching && !queryResult.error && queryResult.data.CircleMembers.length > 0) {
    // Check to see if our query tells us the user has circle memberships
    console.log('Your circles:', queryResult.data.CircleMembers)
    setCircles(queryResult.data.CircleMembers)
  } else if(!queryResult.fetching && !queryResult.error && queryResult.data.CircleMembers.length === 0) {
    console.log('You are in no circles:', queryResult.data.CircleMembers)
  } else {
    // Something horrible happened.
    console.log('Something weird happened: ', queryResult)
  }
}


const Circles = () => {
  // Get logged in user data
  const auth = useAuth({});
  const [circles, setCircles] = useState([])

  // Query for their circle membership
  const [userCirclesResult] = useQuery({
    query: getCircleMembershipForUser,
    variables: {email: auth.user.email }
  })
  // useEffect() will call the given function if queryResult changes. This presents the inifinite redraw loop
  useEffect(() => {
    handleCirclesQuery(auth, userCirclesResult, setCircles)
  }, [userCirclesResult])


  return (
    <div>
      <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Circles', dest: '/app/circles'}]}/>

      <Container pt={3} justifyContent='flex-end'>
        <Link href='/app/circles/create' passHref>
          <CreateButton>
            <FontAwesomeIcon icon={faPlusCircle} />
            Create Circle
          </CreateButton>
        </Link>
      </Container>

      <Container pt={3}>
        <Divider />
      </Container>

    </div>
  )
}

export default withLoginRequired(withAuth(Circles))
