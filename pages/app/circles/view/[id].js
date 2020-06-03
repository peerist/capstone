import React, { useState, useEffect } from 'react'
import { Flex, Box, Text, Button } from 'rebass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { faUserPlus, faEdit, faWindowClose, faShareSquare } from '@fortawesome/free-solid-svg-icons'
import styled from '@emotion/styled'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'

import { useQuery, useMutation } from 'urql'
import { 
  searchUserByEmail, 
  getCircleMembersById, 
  createCircleMembers, 
  updateCircleNameSubjectPrivacyById, 
  getUserPapers,
  getPapersSharedWithCircle,
  sharePaper } from '../../../queries.js'
import {DebounceInput} from 'react-debounce-input';


import AppHeader from '../../../../components/app_header'
import Divider from '../../../../components/divider'
import Container from '../../../../components/container'
import PaperCard from '../../../../components/circle_paper_card'
import SharePaperCard from '../../../../components/share_paper_card'

const CirclesBox = styled(Box)`
  background-color: #f5f6f7;
  border: 1px solid white;
  border-radius: 25px;
  margin-bottom: 15px;
  :hover {
    background: #e0e0d1;
  }
`

const PapersBox = styled(Box)`
  background-color: #f5f6f7;
  border: 1px solid white;
  border-radius: 25px;
  margin-bottom: 15px;
  cursor: pointer;
  :hover {
    background: #e0e0d1;
  }
`

const MembersBox = styled(Box)`
  background-color: #f5f6f7;
  border: 1px solid white;
  border-radius: 25px;
  padding: 5px;
  text-align: center;
  :hover {
    background: #e0e0d1;
  }
`

const CircleButton = styled(Button)`
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
margin: 7px;
:hover {
  background: black;
  color: white;
}
& svg {
  margin-right: 5px;
}
`

const Modal = styled(Flex)`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.6);
`

const ModalBox = styled(Flex)`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 80%;
height: 80%;
background: white;
padding: 50px;
border: 1.5px solid white;
border-radius: 7px;
max-height: 100vh;
overflow-y: auto;
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

const SubmitButton = styled(Button)`
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
bottom: 50px;
left: 50px;
cursor: pointer;
position: absolute;
:hover {
  background: black;
  color: white;
}
& svg {
  margin-right: 5px;
}
`

const ExitButton = styled(Button)`
appearance: none;
background: white;
color: black;
top: 10px;
right: 10px;
cursor: pointer;
position: absolute;
`

/*Array to store all users selected to be invited to the circle*/
const inviteMembers = [];

/*Pop-up modal that allows users to add other users to a list and invite them all to the circle*/
const InviteMembersModal = ({ handleClose, show, currentMembers, setCurrentMembers }) => {
  const router = useRouter();
  const [member, setMember] = useState('');
  const [memberList, setMemberList] = useState(inviteMembers);
  const [createCircleMembersResult, executeCreateCircleMembers] = useMutation(createCircleMembers)

  // Query for an invited member on change
  const [searchUserByEmailResult] = useQuery({
    query: searchUserByEmail,
    variables: {email: member }
  })

  const handleAddMember = (event) => {
    // Did the typed in email return an existing user?
    if(searchUserByEmailResult.data.Users.length > 0) {
      if(member) {
        // Add to the list of members
        setMemberList([
          ...memberList,
          {
            Id: searchUserByEmailResult.data.Users[0].Id,
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

  const handleInviteSubmit = async () => {
    // Are there any members to add?
    if(memberList.length > 0) {
      // Add the members in one go
      const membersResult = await executeCreateCircleMembers(
        {
          objects:
            memberList.map(
              user => {
                return {
                  CircleId: router.query.id,
                  MemberUserId: user.Id
                }
              }
            )
        }
      )
      if(!membersResult.error) {
        setCurrentMembers(
          [
            ...currentMembers,
            ...memberList
          ]
        )
        handleClose()
      }
    }
    else {
      window.alert("Please enter a user's email address to add to your circle")
    }
  }
  if(!show) {
    return null;
  }
  else {
    return (
      <Modal>
          <ModalBox>
            <div>
              <Text variant='heading' mb={3}>
                Invite Members
              </Text>
              <ExitButton onClick={handleClose}><FontAwesomeIcon icon={faWindowClose}/></ExitButton>
              <form onSubmit={handleAddMember}>
                <DebounceInput
                  name="members"
                  type="email"
                  value={member}
                  debounceTimeout={300}
                  onChange={event => setMember(event.target.value)}
                />
                <br />
                <AddMemberButton type="submit">
                  <FontAwesomeIcon icon={faUserPlus} />
                  Invite
                </AddMemberButton>

              </form>
              <ul id="list">
                {memberList.map(item => {
                  return <li key={item.Id}>{item.email}</li>;
                })}
              </ul>
              <SubmitButton onClick={handleInviteSubmit}>Submit</SubmitButton>
            </div>
          </ModalBox>
      </Modal>
    )
  }

};

/*Pop-up modal that allows users to edit details of the circle*/
const EditCircleModal = ({ handleClose, show, setNewCircleName }) => {
  const router = useRouter()
  const [circleName, setCircleName] = useState('');
  const [subject, setSubject] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [updateCircleResult, executeUpdateCircle] = useMutation(updateCircleNameSubjectPrivacyById)
  const handleSubmitClick = async () => {
    if(circleName.length < 1) {
      window.alert("Please enter a circle name!")
    }
    else if(subject.length < 1) {
      window.alert("Please enter a subject!")
    }
    else {
      const updateResult = await executeUpdateCircle({
        Id: router.query.id,
        Name: circleName,
        Subject: subject,
        Privacy: privacy === "private" ? true : false
      })
      console.log(updateResult)
      if(!updateResult.error) {
        setNewCircleName(circleName)
        handleClose()
      }
    }
  }
  if(!show) {
    return null;
  }
  else {
    return (
      <Modal>
          <ModalBox>
            <div>
              <Text variant='heading' mb={3}>
                Edit Circle
              </Text>
              <ExitButton onClick={handleClose}><FontAwesomeIcon icon={faWindowClose}/></ExitButton>
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
              <SubmitButton onClick={handleSubmitClick}>Submit</SubmitButton>

            </div>
          </ModalBox>
      </Modal>
    )
  }

};

/*Pop-up modal that displays a user's papers and allows the user to share them*/
const SharePaperModal = ({ handleClose, show }) => {
  const auth = useAuth({});
  const router = useRouter();
  const [userPapers, setUserPapers] = useState([])
  const [, executeSharePaper] = useMutation(sharePaper)

  const handleShare = async (paperId) => {
    const sharedResult = await executeSharePaper({circleId:router.query.id, paperId:paperId})
    if(!sharedResult.error) { window.alert("Your paper has been shared with this circle"); handleClose() }
    else{ window.alert("Couldn't share this paper in this circle. Is it already shared?")}
  };
  const [userPapersResult] = useQuery({
    query: getUserPapers,
    variables: {email: auth.user.email}
  })

  useEffect(() => {
    if(!userPapersResult.fetching && userPapersResult.data) {
      setUserPapers(userPapersResult.data.Paper)
    }
  }, [userPapersResult])

  if(!show) {
    return null;
  }
  else { 
    return (
      <Modal>
          <ModalBox>
            <div>
              <Text variant='heading' mb={3}>
                Share Papers
              </Text>
              <ExitButton onClick={handleClose}><FontAwesomeIcon icon={faWindowClose}/></ExitButton>
              {userPapers.map(item=> {
                return (
                  <PapersBox key={item.Id} p={3} > 
                  {/* When paper box is clicked, add to circle's shared papers*/}
                    <SharePaperCard paperName = {item.name} id={item.Id} shareHandler={handleShare} version = {item.currentVersion} />
                  </PapersBox>
                )
              })}


            </div>
          </ModalBox>
      </Modal>
    )
  }
  
};

const MemberCard = (props) => {
  return (
    <MembersBox>
      <Text>{props.email}</Text>
    </MembersBox>
  )
}

/*Diplays papers shared within the circle, a circle's members, and allows users to invite members, share papers, and edit circle settings*/
const Circle = () => {
  const [display, setDisplay] = useState(false);
  const router = useRouter();
  const [sharedPapers, setSharedPapers] = useState([])
  const [circleName, setCircleName] = useState('')
  const hide = () => setDisplay(false);
  const show = () => setDisplay(true);
  const [currentMembers, setCurrentMembers] = useState([])

  // Query for an members
  const [membersQueryResult] = useQuery({
    query: getCircleMembersById,
    variables: {Id: router.query.id }
  })

  // Query for papers shared with this circle
  const [sharedPapersQueryResult] = useQuery({
    query: getPapersSharedWithCircle,
    variables: {circleId: router.query.id}
  })

  useEffect(() => {
    if(!sharedPapersQueryResult.fetching && sharedPapersQueryResult.data) {
      setSharedPapers(sharedPapersQueryResult.data.Paper)
    }
  }, [sharedPapersQueryResult])

  useEffect(() => {
    if(!membersQueryResult.fetching) {
      const unpacked = membersQueryResult.data.CircleMembers.map(memberUser => {
        return {Id: memberUser.MemberUser.Id, email: memberUser.MemberUser.email}
      })
      setCurrentMembers(unpacked)
      setCircleName(membersQueryResult.data.Circles[0].Name)
    }
  }, [membersQueryResult])

  /*Handles toggling of pop-up modal for inviting members*/
  const handleToggle = () => {
    if(!display) {
      show();
    }
    else {
      hide();
    }
    event.preventDefault();

  };

  /*Handles toggling of pop-up modal for editing circle*/
  const [displayEdit, setDisplayEdit] = useState(false);
  const hideEdit = () => setDisplayEdit(false);
  const showEdit = () => setDisplayEdit(true);

  const handleToggleEdit = () => {
    if(!displayEdit) {
      showEdit();
    }
    else {
      hideEdit();
    }
    event.preventDefault();

  };

  /*Handles toggling of pop-up modal for sharing papers*/
  const [displayShare, setDisplayShare] = useState(false);
  const hideShare = () => setDisplayShare(false);
  const showShare = () => setDisplayShare(true);

  const handleToggleShare = () => {
    if(!displayShare) {
      showShare();
    }
    else {
      hideShare();
    }
    event.preventDefault();

  };

  return (
    <div>
        <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Circles', dest: '/app/circles'}, {name: circleName, dest: '/app/circles'}]}/>

        {  
        /*Buttons for circle options*/
        }
        <Container pt={3} justifyContent='flex-end'>
            <CircleButton onClick={handleToggleShare}>
                <FontAwesomeIcon icon={faShareSquare} />
                Share Paper
            </CircleButton>
            <CircleButton onClick={handleToggle}>
                <FontAwesomeIcon icon={faUserPlus} />
                Invite Members
            </CircleButton>
            <CircleButton onClick={handleToggleEdit}>
                <FontAwesomeIcon icon={faEdit} />
                Edit Circle
            </CircleButton>
        </Container>

        <Container pt={3}>
            <Divider />
        </Container>

        <Container pt={3}>
        <Text variant='heading' mb={3}>
            Papers
        </Text>
        {
        /*Displays all papers shared within circle*/
        } 
        <CirclesBox p={3} width={1}>
            {
              sharedPapers.length > 0 
              ? sharedPapers.map(paper => <PaperCard key={paper.Id} paperName ={paper.name} paperId={paper.Id} version ={paper.currentVersion} author={paper.User.email} />) 
              : <PaperCard paperName = 'Your created papers will appear here' version = '1.0' author='You!'/>
            }
            
        </CirclesBox>
        </Container>

        <Container pt={3}>
            <Divider />
        </Container>

        <Container pt={3}>
        <Text variant='heading' mb={3}>
            Members
        </Text>
        {
        /*Displays all members belonging to circle*/
        } 
        <Container pt={3}>
        {
          currentMembers.map(member => <MemberCard key={member.Id} email={member.email} />)
        }
        </Container>


        </Container>
        {
        /*Props for all modals. Enables opening and closing modals*/
        } 
        {
        display &&
        <InviteMembersModal show={display} currentMembers={currentMembers} setCurrentMembers={setCurrentMembers} handleClose={e => hide()} />
        }
        {
        displayEdit &&
        <EditCircleModal show={displayEdit} setNewCircleName={setCircleName} handleClose={e => hideEdit()} />
        }
        {
        displayShare && 
        <SharePaperModal show={displayShare} handleClose={e => hideShare()} />
        }

    </div>

  )
}

export default withLoginRequired(withAuth(Circle))
