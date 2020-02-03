import React from 'react'
import { withAuth, withLoginRequired } from 'use-auth0-hooks'

import AppHeader from '../../components/app_header'

const Account = () => {
  return (
    <div>
      <AppHeader header={[{name: 'Account', dest: '/app/account'}]}/>
    </div>
  )
}

export default withLoginRequired(withAuth(Account))
