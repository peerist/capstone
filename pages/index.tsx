import React from 'react'
import Router from 'next/router'
import { useAuth } from 'use-auth0-hooks'

const Home = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    Router.push('/app')
  }

  return (
    <div>
    </div>
  )
}

export default Home
