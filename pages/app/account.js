import React from 'react'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'
import { useQuery } from 'urql'
import AppHeader from '../../components/app_header'
const getUsers = `
query getUser {
  Users {
    email
  }
}
`
const Account = () => {

  const res = useAuth({});

  const [result] = useQuery({
      query: getUsers
  })
  console.log(result)
  console.log(res.user.email)
  // This could be cleaned up later
  let message;
  if(result.fetching) {
        message = 'Fetching ...'
  } else if(!result.fetching) {
        if(result.error) {
                message = 'Error in fetching. Check browser console'
        } else if(result.data) {
                if(result.data.Users.length > 0) {
                        message = 'Your email is: ' + result.data.Users[0].email
                } else {
                        message = 'No users found in database'
                }
        }
  }
  return (
    <div>
      <AppHeader header={[{name: 'Account', dest: '/app/account'}]}/>
      <p>{message}</p>
    </div>
  )
}

export default withLoginRequired(withAuth(Account))
