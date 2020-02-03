import React from 'react'
import { withAuth, withLoginRequired } from 'use-auth0-hooks'

import AppHeader from '../../../components/app_header'

const CreatePaper = () => {
  return (
    <div>
      <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Papers', dest: '/app/papers'}, {name: 'Create Paper', dest: '/app/papers/create'}]}/>
    </div>
  )
}

export default withLoginRequired(withAuth(CreatePaper))
