import React, { useState, useEffect } from 'react'
import { Flex, Text, Box, Button } from 'rebass'
import { Label, Input, Textarea } from '@rebass/forms'
import { useRouter } from 'next/router'
import { withAuth, withLoginRequired } from 'use-auth0-hooks'
import styled from '@emotion/styled'

import { useQuery, useMutation } from 'urql'
import {
  getUserPapers
} from '../../../../pages/queries.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import AppHeader from '../../../../components/app_header'
import Container from '../../../../components/container'
import Divider from '../../../../components/divider'

const Here = () => {

  return (
    <div>
      <Text>
      hello
      </Text>
    </div>

  )
}

export default Here
