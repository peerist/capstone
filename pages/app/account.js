import React, { useCallback } from 'react'
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
    }
  }}
`
const CreateAccountButton = (props) => {
  if (props.show) {
    return (
      <button type="submit">Create my account</button>
    )
  }
  else {
    return ( <div></div> )
  }
}

const Account = () => {
  // get login information
  const auth = useAuth({});
   
  // Setup a mutation to add the dummy user
  const [mutationResult, executeMutation] = useMutation(addUserMutation);

  let showCreateButton = false
  let message = 'Loading Account! One sec! ...'

  // Seems like doing it like this works. I just wish we didnt need a button
  const handleSubmit = useCallback(
    async event => {
      event.preventDefault()
      const mutationResult = await executeMutation({ email : auth.user.email})
      console.log(`Welcome ${auth.user.email}! Your Id is ${mutationResult.data.insert_Users.returning[0].Id}.`)
      message = `Welcome ${auth.user.email}! Your Id is ${mutationResult.data.insert_Users.returning[0].Id}.`
      showCreateButton = false
    },
    [executeMutation]
  )

  // Check is user is already in the database
  const [result] = useQuery({
    query: getUserId,
    variables: getUserIdVariables(auth.user.email)
  })

  if(!result.fetching && !result.error && result.data.Users.length > 0) {
    console.log("Your Id is: ", result.data.Users[0].Id)
    message = `Welcome back ${auth.user.email}, your Id is ${result.data.Users[0].Id}.`
  } else if(!result.fetching && !result.error && result.data.Users.length === 0) {
    console.log("You must be new here!")
    message = `Welcome! You must be new here. Click the button below to finish creating your account.`
    showCreateButton = true
  } else {
    console.log('Something weird happened: ', result)
    message = `Something weird happened. Check the dev console.`
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>{message}</p>
        <CreateAccountButton show={showCreateButton} />
      </form>
    </div>
  )
}

export default withLoginRequired(withAuth(Account))
