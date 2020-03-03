import React, { useState } from 'react'
import { Button } from 'rebass'
import { withAuth, withLoginRequired } from 'use-auth0-hooks'
import styled from '@emotion/styled'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

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

const CreateCircle = () => {
  const [circleName, setCircleName] = useState("");
  const [subject, setSubject] = useState("");
  const [privacy, setPrivacy] = useState("private");

  return (
    <form>
      <div>
        <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Circles', dest: '/app/circles'}, {name: 'Create Circle', dest: '/app/circles/create'}]}/>
      </div>
      <div>
        <Container pt={3}>
          <div>
            <label>
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
            <label>
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
            <label>
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
            <CreateButton>
              <FontAwesomeIcon icon={faPlusCircle} />
              Create Circle
            </CreateButton>
          </div>
        </Container>
      </div>
    </form>
  )
}
 

export default withLoginRequired(withAuth(CreateCircle))
