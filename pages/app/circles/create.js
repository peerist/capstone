import React, { useState, useEffect } from 'react'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'
import { useMutation, useQuery } from 'urql'
import { createCircleAdmin, searchUserByEmail } from '../../queries'

import AppHeader from '../../../components/app_header'

const handleQueryResults = (queryResult, setSearchResults) => {
  if(queryResult.fetching) {
    console.log("Fetching query")
  } else if(!queryResult.fetching && !queryResult.error && queryResult.data.Users.length > 0) {
    // Search completed with results
    console.log("Here are the results:", queryResult.data.Users)
    setSearchResults(queryResult.data.Users)
  } else if(!queryResult.fetching && !queryResult.error && queryResult.data.Users.length === 0) {
    // Search completed with no results
    console.log("No results, sorry")
  } else {
    // Something else went wrong
    console.log("Error executing query. Here is the result:", queryResult)
  }
}

// Need to map across results and return ui components for the user to select
const displayResults = (searchResults) => {
  // const res = searchResults.map(result => (
  //
  // ))
  return (
    <div>
      <ul>
      </ul>
    </div>
  )
}

// Needs create circle button
const CreateCircle = () => {
  const auth = useAuth({})
  const [searchResults, setSearchResults] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('$')

  const handleFormSubmit = (event => {
    event.preventDefault()
    setSearchKeyword(event.target[0].value)
  })
  const [queryResult] = useQuery({
    query: searchUserByEmail,
    variables: {email: '%' + searchKeyword + '%'}
  })
  useEffect(() => {
    handleQueryResults(queryResult, setSearchResults)
  }, [queryResult])
  return (
    <div>
      <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Circles', dest: '/app/circles'}, {name: 'Create Circle', dest: '/app/circles/create'}]}/>
      <form onSubmit={handleFormSubmit}>
        <label>
          Add members to your circle by email address
          <input type="text" name="memberEmail" />
        </label>
        <input type="submit" value="Search" />
      </form>

    </div>
  )
}

export default withLoginRequired(withAuth(CreateCircle))
