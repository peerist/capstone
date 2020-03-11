import React, { useState } from 'react'
import { Flex, Box, Button, Text } from 'rebass'
import { Textarea } from '@rebass/forms'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import styled from '@emotion/styled'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'
import Router, { useRouter } from 'next/router'

import AppHeader from '../../../../components/app_header'
import Divider from '../../../../components/divider'
import Container from '../../../../components/container'

const ConfirmButton = styled(Button)`
  border: 3px solid black;
  text-align: center;
  background: white;
  color: black;
  font-size: 16px;
  padding: 10px 16px;
  font-weight: bold;
  border-radius: 7px;
  margin-top: 15px;
  float: right;

  :hover {
    background: black;
    color: white;
  }

  & svg {
    margin-right: 5px;
  }
`;

const Review = () => {
  const router = useRouter();
  const [segmentContent, setSegmentContent] = useState('');
  const [feedback, setFeedback] = useState('');

  const click_confirm = () => {
    // INSERT QUERY HERE: Add new feedback and update status of segments
    // You can get the id of the segment that is being reviewed with router.query.id
    Router.push('/app/segments');
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  return (
    <div>
      <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Segments', dest: '/app/segments'}, {name: 'Review Segment', dest: `/app/segments/review/${router.query.id}`}]}/>

      <Container pt={3} justifyContent='space-between'>
        <Text variant='heading' style={{padding: '11px 0px 10px 20px'}}>
          Review Segment
        </Text>
      </Container>

      <Container pt={3}>
        <Divider />
      </Container>

      <Container pt={3} pb={3} pl={3} pr={3}>
        <Flex style={{width: '100%'}} justifyContent='center'>
          <Box style={{width: '1000px'}}>
            <h3>Content:</h3>
            <Box style={{width: '1000px', minHeight: '150px', backgroundColor: '#e0e0e0', borderRadius: '10px', border: '1px solid #ccc', padding: '5px'}}>
              {segmentContent}
            </Box>
          </Box>
        </Flex>
      </Container>

      <Container pt={3}>
        <Divider />
      </Container>

      <Container pt={3} pb={3} pl={3} pr={3}>
        <Flex style={{width: '100%'}} justifyContent='center'>
          <Box style={{width: '1000px'}}>
            <h3>Feedback:</h3>
            <Textarea style={{width: '1000px', minHeight: '150px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none'}} value={feedback} onChange={handleFeedbackChange}/>
            <ConfirmButton onClick={click_confirm}>
              <FontAwesomeIcon icon={faCheckCircle} />
              Confirm
            </ConfirmButton>
          </Box>
        </Flex>
      </Container>
    </div>
  )
}

export default withLoginRequired(withAuth(Review))
