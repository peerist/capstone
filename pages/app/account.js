import React from 'react'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'

import AppHeader from '../../components/app_header'

const Account = () => {

  const res = useAuth({
    audience: '',
    scope: ''
  });

  console.log(res);

  return (
    <div>
      <AppHeader header={[{name: 'Account', dest: '/app/account'}]}/>
    </div>
  )
}

export default withLoginRequired(withAuth(Account))
