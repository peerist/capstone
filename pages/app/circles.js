import React, { useState, useEffect } from 'react'
import { Flex, Box, Text } from 'rebass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import styled from '@emotion/styled'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'

import { useQuery, useMutation } from 'urql'
import { getCircleMembershipForUserByEmail, getPublicCircles } from '../queries.js'


import AppHeader from '../../components/app_header'
import Divider from '../../components/divider'
import Container from '../../components/container'
import CircleCard from '../../components/circle_card'

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

const CirclesBox = styled(Box)`
  background-color: #f5f6f7;
  border: 1px solid white;
  border-radius: 25px;
  margin-bottom: 15px;
  :hover {
    background: #e0e0d1;
    cursor: pointer;
  }
`

/*Utilizes CircleCard component to display data for each circle*/
const Circle = props => {
  return (
    <Link href='/app/circles/view/[id]' as={`/app/circles/view/${props.circleId}`}>
      <CirclesBox p={3} width={1}>
        <CircleCard circleName = {props.circleName} owner = {props.circleOwner} subject = {props.circleSubject} memberCount = {props.circleMemberCount} />
      </CirclesBox>
    </Link>
  )
}

const Circles = () => {

  const [circles, setCircles] = useState([])
  const [publicCircles, setPublicCircles] = useState([])

  // get login information
  const auth = useAuth({});


  // Query for circles the user is in, or is admin in
  const [searchUserByEmailResult] = useQuery({
    query: getCircleMembershipForUserByEmail,
    variables: {email: auth.user.email }
  })

  // Query for public circles in general
  const [getPublicCirclesResult] = useQuery({
    query: getPublicCircles
  })

  useEffect(() => {
    if(!getPublicCirclesResult.fetching && getPublicCirclesResult.data) {
      setPublicCircles(getPublicCirclesResult.data.Circles)
    }
  }, [getPublicCirclesResult])

  useEffect(() => {
    if(!searchUserByEmailResult.fetching && searchUserByEmailResult.data) {
      setCircles( searchUserByEmailResult.data.CircleMembers.map(item => item.Circle))
    }
  }, [searchUserByEmailResult])

  return (
    <div>
      <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Circles', dest: '/app/circles'}]}/>
      {
        /*Button to navigate to create circle page*/
      }
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
      {
        /*Displays all circles the user belongs to*/
      }
      <Container pt={3}>
        <Text variant='heading' mb={3}>
          Your Circles
        </Text>
        {
          circles.map(circle => <Circle key={circle.Id} circleId={circle.Id} circleName={circle.Name} circleOwner={circle.Admin.email} circleSubject={circle.Subject} circleMemberCount={circle.CircleMembers.length}/>)
        }
      </Container>

      <Container pt={3}>
        <Divider />
      </Container>

      <Container pt={3}>
        <Text variant='heading' mb={3}>
          Browse Circles
        </Text>
        {
          publicCircles.map(circle => <Circle key={circle.Id} circleId={circle.Id} circleName={circle.Name} circleOwner={circle.Admin.email} circleSubject={circle.Subject} circleMemberCount={circle.CircleMembers.length}/>)
        }
      </Container>

    </div>
  )
}

export default withLoginRequired(withAuth(Circles))
