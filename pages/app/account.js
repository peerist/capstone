import React, { useCallback, useState, useEffect } from 'react'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'
import { useQuery, useMutation } from 'urql'
import AppHeader from '../../components/app_header'
export const getUserId = `
query GetUserId($email: String!){
  Users(where: {email: {_eq: $email}}) { Id
  }
}
`
export const getUserIdVariables = userEmail => ({ email: userEmail })
const addUserMutation = `
mutation AddUser($email: String!) {
  insert_Users(objects: {email: $email}) {
    returning {
      Id
      email
    }
  }}
`
const checkAndInsert = async (auth, queryResult, setMessage, setUser, mutationResult, executeMutation) => {
    if(!queryResult.fetching && !queryResult.error && queryResult.data.Users.length > 0) {
        console.log("Your Id is: ", queryResult.data.Users[0].Id)
        setMessage(`Welcome back ${auth.user.email}, your Id is ${queryResult.data.Users[0].Id}.`)
        setUser(queryResult.data.Users[0])
    } else if(!queryResult.fetching && !queryResult.error && queryResult.data.Users.length === 0) {
        console.log("You must be new here!")
        executeMutation({ email : auth.user.email}).then(mutationResult => {
            console.log(mutationResult)
            setUser(mutationResult.data.insert_Users.returning[0])
            setMessage(`Welcome ${auth.user.email}! Your Id is ${mutationResult.data.insert_Users.returning[0].Id}.`)
        })
    } else {
        console.log('Something weird happened: ', queryResult)
        setMessage( `Something weird happened. Check the dev console.`)
    }

}
const Account = () => {
    // get login information
    const auth = useAuth({});

    const [user, setUser] = useState({})
    const [message, setMessage] = useState('Loading Account! One sec...')

    // Setup a mutation to add the dummy user
    const [mutationResult, executeMutation] = useMutation(addUserMutation);

    let showCreateButton = false



    // Check is user is already in the database
    const [queryResult] = useQuery({
        query: getUserId,
        variables: getUserIdVariables(auth.user.email)
    })
    useEffect(() => {
        checkAndInsert(auth, queryResult, setMessage, setUser, mutationResult, executeMutation)
    }, [queryResult])


    return (
        <div>
            <p>{message}</p>
        </div>
    )
}

export default withLoginRequired(withAuth(Account))
