import React, { useState, useEffect } from 'react'
import { Button } from 'rebass'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'
import styled from '@emotion/styled'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons'

import { useQuery, useMutation } from 'urql'
import { searchUserByEmail, createCircle, createCircleMembers } from '../../queries.js'
import {DebounceInput} from 'react-debounce-input';

import AppHeader from '../../../components/app_header'
import Container from '../../../components/container'

const CreateButton = styled(Button)`
  appearance: none;
  border: 3px solid black;
  display: inline-block;
  text-align: center;
  line-height: inherit;
  text-decoration: none;
  background: white;
  color: black;
  font-size: 16px;
  padding: 10px 16px;
  font-weight: bold;
  border-radius: 7px;
  cursor: pointer;
  margin: 0;
  :hover {
    background: black;
    color: white;
  }
  & svg {
    margin-right: 5px;
  }
`

const AddMemberButton = styled(Button)`
  appearance: none;
  height: 40px;
  width: 110px;
  border: 1.5px solid black;
  display: inline-block;
  text-align: center;
  line-height: inherit;
  text-decoration: none;
  background: white;
  color: black;
  font-size: 16px;
  padding: 10px 16px;
  font-weight: bold;
  border-radius: 7px;
  cursor: pointer;
  margin-top: 5px;
  :hover {
    background: black;
    color: white;
  }
  & svg {
    margin-right: 5px;
  }
`

const inviteMembers = [];

const CreateCircle = () => {
  const [circleName, setCircleName] = useState('');
  const [subject, setSubject] = useState('');
  const [privacy, setPrivacy] = useState('private');
  const [member, setMember] = useState('');
  const [memberList, setMemberList] = useState(inviteMembers);
  const [userId, setUserId] = useState(-1)

  // get login information
  const auth = useAuth({});

  // Query for an invited member on change
  const [searchUserByEmailResult] = useQuery({
    query: searchUserByEmail,
    variables: {email: member }
  })

  // Query for logged in user's ID
  const [loggedInUserEmailResult] = useQuery({
    query: searchUserByEmail,
    variables: {email: auth.user.email }
  })

  // executeCreateCircle and executeCreateCircleMembers are functions we can call later to insert stuff into the DB
  const [createCircleResult, executeCreateCircle] = useMutation(createCircle)
  const [createCircleMembersResult, executeCreateCircleMembers] = useMutation(createCircleMembers)

  // When we hear back about who the logged in user is, save the User's ID
  useEffect(() => {
    if(!loggedInUserEmailResult.fetching) {
      setUserId(loggedInUserEmailResult.data.Users[0].Id)
      // Add the admin as a member
      setMemberList([{
        MemberUserId:loggedInUserEmailResult.data.Users[0].Id,
        email: loggedInUserEmailResult.data.Users[0].email
      }])
    }
  }, [loggedInUserEmailResult])

  const handleAddMember = (event) => {
    // Did the typed in email return an existing user?
    if(searchUserByEmailResult.data.Users.length > 0) {
      if(member) {
        // Add to the list of members
        setMemberList([
          ...memberList, 
          {
            MemberUserId: searchUserByEmailResult.data.Users[0].Id,
            email: searchUserByEmailResult.data.Users[0].email
          }
        ]);
      }
      setMember('');
    }
    else {
      window.alert("User not found!")
    }
    event.preventDefault();
  };

  const handleCreateCircle = async () => {
    // We need to create the circle first and get the Circle Id back out
    const creationResult = await executeCreateCircle({
      userId: userId,
      private: privacy === 'private' ? true : false,
      subject: subject,
      name: circleName
    })
    
    // Add the members in one go
    const membersResult = await executeCreateCircleMembers(
      {
        objects: 
        memberList.map(
            user => {
              return {
                CircleId: creationResult.data.insert_Circles.returning[0].Id, 
                MemberUserId: user.MemberUserId
              }
            }
          )
      }
    )    
  }

  return (
    <div>
      <div>
        <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Circles', dest: '/app/circles'}, {name: 'Create Circle', dest: '/app/circles/create'}]}/>
      </div>
      <div>
        <Container pt={3}>
          <div>
            <label style={{fontWeight: 'bold'}} mb='1'>
              Circle name<br />
              <input
                name="circleName"
                type="text"
                value={circleName}
                onChange={e => setCircleName(e.target.value)}
              />
            </label>
          </div>
        </Container>

        <Container pt={3}>

          <div>
            <label style={{fontWeight: 'bold'}} mb='1'>
              Subject<br />
              <input
                name="subject"
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
            </label>
          </div>
        </Container>

        <Container pt={3}>
          <div>
            <label style={{fontWeight: 'bold'}} mb='1'>
              Privacy<br />
              <select
                name="privacy"
                type="select"
                value={privacy}
                onChange={e => setPrivacy(e.target.value)}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>>
              </select>
            </label>
          </div>
        </Container>

        <Container pt={3}>
          <div>
            <label style={{fontWeight: 'bold'}} mb='1'>
              Invite Members<br />
           
              <form onSubmit={handleAddMember}>
                <DebounceInput
                  name="members"
                  type="text"
                  value={member}
                  minLength={2}
                  debounceTimeout={300}
                  onChange={e => setMember(e.target.value)}
                />
                <br />
                <AddMemberButton type="submit">
                  <FontAwesomeIcon icon={faUserPlus} />
                  Invite
                </AddMemberButton>

              </form>      
              <ul id="list">
                {memberList.map(item => {
                  return <li key={item.MemberUserId}>{item.email}</li>;
                })}
              </ul>   
            </label>
          </div>
        </Container>
          
        <Container pt={3}>
          <div>
            <CreateButton onClick={handleCreateCircle}>
              <FontAwesomeIcon icon={faPlusCircle} />
              Create Circle
            </CreateButton>
          </div>
        </Container>
      </div>
    </div>
  )
}
 

export default withLoginRequired(withAuth(CreateCircle))
