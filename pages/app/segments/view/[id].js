import React, { useState, useEffect } from 'react'
import { Flex, Text, Box, Button } from 'rebass'
import { Label, Input, Textarea } from '@rebass/forms'
import { useRouter } from 'next/router'
import { getSegmentForEditView } from '../../../queries.js'
import { withAuth, withLoginRequired } from 'use-auth0-hooks'
import styled from '@emotion/styled'

import { useQuery, useMutation } from 'urql'
import {
  getCurrentVersionBySegmentId,
  getSegmentVersionsAndFeedbackByIdAndVersion,
  setSegmentVersionById,
  setSegmentTitleById,
  setSegmentVersionContentBySegmentIdAndVersion,
  createNewVersionWithSegmentIdAndVersion
} from '../../../../pages/queries.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import AppHeader from '../../../../components/app_header'
import Container from '../../../../components/container'
import Divider from '../../../../components/divider'
import SegmentViewVersionCard from '../../../../components/segment_view_version_card'
import SegmentViewVersionFeedback from '../../../../components/segment_view_version_feedback'

const VersionsBox = styled(Box)`
  height: 500px;
  border: 1px solid black;
  overflow-y: auto;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;

  /* Hide scrollbar for IE and Edge */
  -ms-overflow-style: none;

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  & div:last-child {
    border-bottom: none;
  }
`;

const FeedbackBox = styled(Box)`
  height: 500px;
  border: 1px solid black;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-left: none;
  overflow-y: auto;

  /* Hide scrollbar for IE and Edge */
  -ms-overflow-style: none;

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const CreateVersionButton = styled(Button)`
  width: 100%;
  height: 100px;
  color: black;
  font-size: 32px;
  background: none;
  outline: none;
`;

const EditSegment = () => {
  const router = useRouter();
  const [segmentVersions, setSegmentVersions] = useState([
    {version: 1, id: 1, text: '...'},
    {version: 2, id: 2, text: '...'}
  ]);
  const [currentVersion, setCurrentVersion] = useState(-1);
  const [currentVersionFeedback, setCurrentVersionFeedback] = useState([
    {Id: 1, text: '...'},
    {Id: 2, text: '...'}
  ]);
  const [segmentTitle, setSegmentTitle] = useState('')
  const [contentText, setContentText] = useState('')

  const [ changeCurrentVersionResult, executeChangeCurrentVersion ] = useMutation(setSegmentVersionById)
  const [ changeSegmentTitleResult, executeChangeSegmentTitle ] = useMutation(setSegmentTitleById)
  const [ changeVersionContentResult, executeChangeVersionContent ] = useMutation(setSegmentVersionContentBySegmentIdAndVersion)
  const [ createNewVersionResult, executeCreateNewVersion ] = useMutation(createNewVersionWithSegmentIdAndVersion)

  const [ currentVersionResult ] = useQuery({
    query: getCurrentVersionBySegmentId,
    variables: { segmentId: router.query.id }
  })

  const [ versionsAndFeedbackResult ] = useQuery({
    query: getSegmentVersionsAndFeedbackByIdAndVersion,
    variables: { segmentId: router.query.id, version: currentVersion }
  })

  useEffect(() => {
    console.log("currentVersionsresult:", versionsAndFeedbackResult)
    if(!versionsAndFeedbackResult.fetching && versionsAndFeedbackResult.data) {
      setSegmentVersions(versionsAndFeedbackResult.data.versions)
      setCurrentVersionFeedback(versionsAndFeedbackResult.data.feedback)
    }
  }, [ versionsAndFeedbackResult ])

  useEffect(() => {
    console.log(currentVersionResult)
    if(!currentVersionResult.fetching && currentVersionResult.data) {
      setCurrentVersion(currentVersionResult.data.Segment[0].currentVersion)
      setSegmentTitle(currentVersionResult.data.Segment[0].name)
    }
  }, [currentVersionResult])



  const click_updateCurrentVersion = (version) => {
    setCurrentVersion(version);
    executeChangeCurrentVersion({segmentId: router.query.id, newVersionValue: version})
  }

  const click_updateCurrentVersionContent = () => executeChangeVersionContent({segmentId: router.query.id, version: currentVersion, content: contentText})
  const click_createNewVersion = () => executeCreateNewVersion({segmentId: router.query.id, version: segmentVersions.length+1})
  const click_updateTitle = () => executeChangeSegmentTitle({segmentId: router.query.id, title: segmentTitle})

  const updateTitleValue = event => setSegmentTitle(event.target.value)
  const updateContentValue = event => setContentText(event.target.value)

  return (
    <div>
      <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Segments', dest: '/app/segments'}, {name: 'View Segment', dest: `/app/segments/view/${router.query.id}`}]}/>

      <Container pt={3} justifyContent='space-between'>
        <Text variant='heading' style={{padding: '11px 0px 10px 20px'}}>
          View Segment
        </Text>
      </Container>

      <Container pt={3}>
        <Divider />
      </Container>

      <Container pt='3' pl='5' pr='5' pb='5'>
        <Box width={1} mb='3'>
          <Label htmlFor='title' style={{fontWeight: 'bold'}} mb='1'>Title</Label>
          <Input id='title' name='title' placeholder='Example Title' mb='2' value={segmentTitle} onChange={updateTitleValue}/>
          <Button onClick={click_updateTitle} variant='primary' style={{float: 'right'}}>
            Update Title
          </Button>
        </Box>
        <Box width={1}>
          <Text style={{fontWeight: 'bold', display: 'inline-block'}} mb='1'>Versions</Text>
          <Text style={{color: '#bdbdbd', textTransform: 'uppercase', letterSpacing: '1px', display: 'inline-block', float: 'right', fontSize: '14px'}} mb='1'>Current Version: {currentVersion}.0</Text>
          <Flex>
            <VersionsBox width={0.5}>
              {segmentVersions.map(item => {
                return <SegmentViewVersionCard version={item.version} key={item.id} current_version={currentVersion} updateFn={click_updateCurrentVersion} text={item.text} />
              })}
              <CreateVersionButton onClick={click_createNewVersion}>
                <FontAwesomeIcon icon={faPlusCircle} />
              </CreateVersionButton>
            </VersionsBox>

            <FeedbackBox width={0.5} p={3}>
              <Box pb={4}>
                <Text style={{fontWeight: 'bold', fontSize: '24px'}}>
                  Version {currentVersion}.0
                </Text>
                <hr/>
                <Label htmlFor='content' style={{fontWeight: 'bold'}} mb='1'>Content</Label>
                <Textarea id='content' name='content' mb={2} placeholder='Example Content' style={{width: '100%', height: '200px', fontSize: '14px'}} value={contentText} onChange={updateContentValue}/>
                <Button variant='primary' style={{float: 'right'}} onClick={click_updateCurrentVersionContent}>
                  Update Content
                </Button>
              </Box>
              <Box>
                <Text style={{fontWeight: 'bold', fontSize: '24px'}}>
                  Feedback
                </Text>
                <hr/>
                {currentVersionFeedback.map(item => {
                  return <SegmentViewVersionFeedback key={item.Id} text={item.text} />
                })}
              </Box>
            </FeedbackBox>
          </Flex>
        </Box>
      </Container>

    </div>
  )
}

export default withLoginRequired(withAuth(EditSegment))
