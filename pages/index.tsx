import React from 'react'
import Router from 'next/router'
import { useAuth } from 'use-auth0-hooks'
import MainHeader from '../components/main_header'

const Home = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    Router.push('/app')
  }

  return (
    <div>
      <MainHeader/>
    </div>

  )
}

export default Home
