import React, { useState, useEffect } from 'react'
import { Flex, Box, Text } from 'rebass'
import Link from 'next/link'
import styled from '@emotion/styled'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import AppHeader from '../../../../components/app_header'
import Container from '../../../../components/container'
import Divider from '../../../../components/divider'
import ViewPaperCard from '../../../../components/view_paper_card'
import { useRouter } from 'next/router'
import { saveAs } from 'file-saver'

import { useQuery, useMutation } from 'urql'
import {
  getUserId,
  getUserPapers,
  getPaperContent,
  listPaperSegmentsID,
  getPaperNameByID
} from '../../../../pages/queries.js'



var body = []


const ViewPaper = () => {
  const router = useRouter();
  // Get logged in user data
  const auth = useAuth({});
  const [userId, setUserId] = useState(-1)

  // Query for their segments
  const [userIdResult] = useQuery({
    query: getUserId,
    variables: {email: auth.user.email }
  })

  const [paperSegmentsResult] = useQuery({
    query: listPaperSegmentsID,
    variables: {paperId: router.query.id }
  })

  const [content, setContent] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if(!userIdResult.fetching) {
      setUserId(userIdResult.data.Users[0].Id)
    }
  }, [userIdResult])

  useEffect(() => {

    if(!paperSegmentsResult.fetching && paperSegmentsResult.data){
      body = []
      for(var i = 0; i < paperSegmentsResult.data.PaperSegment.length; i++){
        if(!body.includes(paperSegmentsResult.data.PaperSegment[i].segmentId)){
          body.push(paperSegmentsResult.data.PaperSegment[i].segmentId)
        }
      }
      console.log(body)
      if (body.length == 0){
        body.push(-Infinity)
      }
    }
  }, [paperSegmentsResult])



const [grabPaperContent] = useQuery({
  query: getPaperContent,
  variables: {email: auth.user.email, args: body}
})


const [paperName] = useQuery({
  query: getPaperNameByID,
  variables: {email: auth.user.email, id: router.query.id}
})

useEffect(() => {
  if(!grabPaperContent.fetching && grabPaperContent.data){
    var text = ''
    for(var i = 0; i < grabPaperContent.data.SegmentVersion.length; i++){
      text += grabPaperContent.data.SegmentVersion[i].text + '\n'

    }
    setContent(text)
  }
}, [grabPaperContent])

useEffect(() => {
  if(!paperName.fetching && paperName.data){
    const text = paperName.data.Paper[0].name
    setName(text)
  }
}, [paperName])

const downloadFunction = (content, pref) => {
  var filename =  pref + ".txt"

  var blob = new Blob([content], {
   type: "text/plain;charset=utf-8"
  })

  saveAs(blob, filename)

}


  return (
    <div>
    <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Papers', dest: '/app/papers'}, {name: 'View Paper', dest: '/app/papers'}]}/>

      <Box>
        <Text>
          <ViewPaperCard content={content} name={name} download={downloadFunction}/>
        </Text>
      </Box>
    </div>

  )
}

export default ViewPaper
