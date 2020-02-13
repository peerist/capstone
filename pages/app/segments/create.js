import React from 'react'
import { withAuth, withLoginRequired } from 'use-auth0-hooks'

import AppHeader from '../../../components/app_header'

const CreateSegment = () => {
  return (
    <div>
      <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Segments', dest: '/app/segments'}, {name: 'Create Segment', dest: '/app/segments/create'}]}/>
    </div>
  )
}

export default withLoginRequired(withAuth(CreateSegment))
