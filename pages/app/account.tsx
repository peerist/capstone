import React from 'react'

import AppHeader from '../../components/app_header'

const Account = () => {
  return (
    <div>
      <AppHeader header={[{name: 'Account', dest: '/app/account'}]}/>
    </div>
  )
}

export default Account
