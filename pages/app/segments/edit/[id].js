import React from 'react'
import { useRouter } from 'next/router'
import { withAuth, withLoginRequired } from 'use-auth0-hooks'

import AppHeader from '../../../../components/app_header'

const EditSegment = () => {
  const router = useRouter();

  return (
    <div>
      <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Segments', dest: '/app/segments'}, {name: 'Edit Segment', dest: `/app/segments/edit/${router.query.id}`}]}/>
    </div>
  )
}

export default withLoginRequired(withAuth(EditSegment))
