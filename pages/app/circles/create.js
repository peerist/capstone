import React, { useState } from 'react'
import { Button } from 'rebass'
import { withAuth, withLoginRequired } from 'use-auth0-hooks'
import styled from '@emotion/styled'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons'

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

  const handleAddMember = (event) => {
    if(member) {
      setMemberList([...memberList, member]);
    }
    setMember('');
    console.log(memberList);

    event.preventDefault();

  };


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
                <input
                  name="members"
                  type="text"
                  value={member}
                  onChange={e => setMember(event.target.value)}
                />
                <br />
                <AddMemberButton type="submit">
                  <FontAwesomeIcon icon={faUserPlus} />
                  Invite
                </AddMemberButton>

              </form>      
              <ul id="list">
                {memberList.map(item => {
                  return <li key={item}>{item}</li>;
                })}
              </ul>   
            </label>
          </div>
        </Container>
          
        <Container pt={3}>
          <div>
            <CreateButton>
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
