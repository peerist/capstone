import React, { useState, useEffect } from 'react'
import { Flex, Box, Text } from 'rebass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import styled from '@emotion/styled'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'
import { useQuery, useMutation } from 'urql'
import AppHeader from '../../components/app_header'
import Divider from '../../components/divider'
import Container from '../../components/container'
import PapersCardActive from '../../components/paper_card_active'
import {getUserId, getUserPapers} from '../queries'


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

const Papers = () => {

  const [papers, setPapers] = useState([{name: '...', Id: 1, currentVersion: 1}]);
  // Get logged in user data
  const auth = useAuth({});
  const [userId, setUserId] = useState(-1)

  // Query for their Papers
  const [userPapersResult] = useQuery({
    query: getUserPapers,
    variables: {email: auth.user.email }
  })
  const [userIdResult] = useQuery({
    query: getUserId,
    variables: {email: auth.user.email }
  })
  useEffect(() => {
    if(!userPapersResult.fetching && userPapersResult.data){
      setPapers(userPapersResult.data.Paper)
    }
  }, [userPapersResult])

  useEffect(() => {
    if(!userIdResult.fetching) {
      setUserId(userIdResult.data.Users[0].Id)
    }
  }, [userIdResult])


  return (
    <div>
      <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Papers', dest: '/app/papers'}]}/>

      <Container pt={3} justifyContent='flex-end'>
        <Link href='/app/papers/create' passHref>
          <CreateButton>
            <FontAwesomeIcon icon={faPlusCircle} />
            Create Paper
          </CreateButton>
        </Link>
      </Container>

      <Container pt={3}>
        <Divider />
      </Container>

      <Container pr={5} pl={5} justifyContent='space-between'>
        <Box p={3} width={0.5}>
          <Text variant='heading' mb={3}>
            My Papers
          </Text>
          <Divider />
          <Box>
            {papers.map((paper) => {
              return <PapersCardActive name={paper.name} id={paper.Id} version={paper.currentVersion} key={paper.Id} />
            })}
          </Box>
        </Box>
      </Container>











    </div>
  )
}

export default withLoginRequired(withAuth(Papers))
