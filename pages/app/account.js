import React, { useState, useEffect } from 'react'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'
import { useQuery } from 'urql'
import AppHeader from '../../components/app_header'
import { getUserId } from '../queries'


const Account = () => {
    // get login information
    const auth = useAuth({});

    const [message, setMessage] = useState('Loading Account! One sec...')
    // Check is user is already in the database
    const [queryResult] = useQuery({
        query: getUserId,
        variables: {email: auth.user.email }
    })

    console.log(queryResult)

    useEffect(() => {
        if(!queryResult.fetching && !queryResult.error && queryResult.data.Users.length > 0) {
            console.log("Your Id is: ", queryResult.data.Users[0].Id)
            setMessage(`Welcome back ${auth.user.email}, your Id is ${queryResult.data.Users[0].Id}.`)
        } else {
            console.log('Loading?: ', queryResult)
        }
    }, [queryResult])

    return (
        <div>
            <AppHeader header={[{name: 'Account', dest: '/app/account'}]}/>
            <p>{message}</p>
        </div>
    )
}

export default withLoginRequired(withAuth(Account))
