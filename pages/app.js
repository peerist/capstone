import React, { useEffect } from 'react'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'
import { useQuery, useMutation } from 'urql'
import { getUserId, addUser } from './queries'
import Link from 'next/link'
import styled from '@emotion/styled'

import Nav from '../components/nav'
import AppHeader from '../components/app_header'
import Divider from '../components/divider'
import Container from '../components/container'

const DashBoardLink = styled.a`
  background: #9DDEB7;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  color: black;
  padding: 20px;
  width: 33%;
`
/*
* This method is a helper method that checks to see if the logged in user exists within our database.
* If they are found in our database, we console log their email address and username as a sanity check.
* If they are not in our database yet (but clearly they've logged in at this point), we
* create a user for them by invoking a database mutation.
*
* See app/papers/review/[id].js for a better explanation of how these database methods work.
*
* auth: Has data of who is logged in
* queryResult: We ran a query to see if the user was in the Users table by querying for the email address
* setMessage: Lets us set the message in the UI.
* setUser: Lets us save the user's data on the component
* mutationResult: Upon calling executeMutation, mutationResult is populated with the mutation result
* executeMutation: calling this function will insert the user into the database
*/
const checkAndInsert = (auth, queryResult, mutationResult, executeMutation) => {
    // Check to see if our query tells us the user has a user record
    if(!queryResult.fetching && !queryResult.error && queryResult.data.Users.length > 0) {
        console.log("Your Id is: ", queryResult.data.Users[0].Id)
        // Check to see if the query tells us the user needs a new record created
    } else if(!queryResult.fetching && !queryResult.error && queryResult.data.Users.length === 0) {
        console.log("You must be new here!")
        executeMutation({ email : auth.user.email}).then(mutationResult => {
            console.log(mutationResult)
            console.log(`Welcome ${auth.user.email}! Your Id is ${mutationResult.data.insert_Users.returning[0].Id}.`)
        })
        // Something horrible happened.
    } else {
        console.log('Something weird happened: ', queryResult)
    }



}

/*
* Upon logging in, this is the landing page for the user. Before the user navigates anywhere else,
* we must create a user record in our database for this user if they do not already have one! We
* accomplish this in aa few steps:
*
* 1. We query for the user in our database using their Email Address. Unfortunately as of now,
* our Auth0 service is not setup yet to provide us anything more unique to the user than their
* email address, so we trust that the user is who they are by their email address.
*
* 2. We define a call back function that will be called once we hear back from the database.
* That function will check the results from our user query and create a user if needed.
*
* This makes sure that a user record is created for the logged in user before they go on
* to use the other pages. The other pages depend on there being a user created!
*
* See app/papers/review/[id].js for a better explanation of how these database methods work.
*
*/
const App = () => {
    // get login information
    const auth = useAuth({});

    // Check is user is already in the database
    const [queryResult] = useQuery({
        query: getUserId,
        variables: {email: auth.user.email }
    })

    // Setup a mutation to add the user.
    const [mutationResult, executeMutation] = useMutation(addUser);
    // useEffect() will call the given function if queryResult changes. This prevents the inifinite redraw loop
    useEffect(() => {
        checkAndInsert(auth, queryResult, mutationResult, executeMutation)
    }, [queryResult])
    return (
        <div>
            <AppHeader header={[{name: 'Dashboard', dest: '/app'}]}/>

            <Container pt={3} justifyContent='space-between'>
                <Link href='/app/segments' passHref>
                    <DashBoardLink>Segments</DashBoardLink>
                </Link>
                <Link href='/app/papers' passHref>
                    <DashBoardLink>Papers</DashBoardLink>
                </Link>
                <Link href='/app/circles' passHref>
                    <DashBoardLink>Circles</DashBoardLink>
                </Link>
            </Container>

            <Container pt={3}>
                <Divider />
            </Container>
        </div>
    )
}

export default withLoginRequired(withAuth(App))
