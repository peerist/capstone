import React, { useState, useEffect } from 'react'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'
import { useMutation, useQuery } from 'urql'
import { addPaper, getUserId, getUserSegments } from '../../queries'

import AppHeader from '../../../components/app_header'
// This UI is real barebones, but gets a lot of the work done with data handling
const CreatePaper = () => {
    const auth = useAuth({});

    // State
    const [userId, setUserId] = useState(-1)
    const [userSegments, setUserSegments] = useState([])
    const [newPaper, setNewPaper] = useState({})
    const [mutationResult, executeMutation] = useMutation(addPaper);
    console.log("userId:", userId)
    console.log("userSegments:", userSegments)

    // Queries
    const [queryResult] = useQuery({
        query: getUserId,
        variables: {email: auth.user.email }
    })
    const [segmentsQueryResult] = useQuery({
        query: getUserSegments,
        variables: {id: userId}
    })

    // Side effects
    useEffect(() => {
        if(!segmentsQueryResult.fetching && segmentsQueryResult.data) {
            setUserSegments(segmentsQueryResult.data.Segment.map(seg => {
                return {
                    ...seg,
                    checked: false,
                    order: 0
                }
            }))
        }
    }, [segmentsQueryResult])
    useEffect(() => {
        if(!queryResult.fetching && queryResult.data) {
            setUserId(queryResult.data.Users[0].Id)
        }
    }, [queryResult])

    // Mutations
    const createNewPaper = (paperName) => {
        executeMutation({ email: auth.user.email, name: paperName }).then(mutationResult => {
            setNewPaper(mutationResult.data.insert_Paper.returning[0])
            console.log(mutationResult.data.insert_Paper.returning[0])
        })
    }

    // Handlers
    const handleFormSubmit = (event => {
        event.preventDefault()
        createNewPaper(event.target[0].value)
    })
    const handleCheckboxClick = (event => {
        setUserSegments(userSegments.map(segment => {
            if(segment.id === parseInt( event.target.id )) {
                return {
                    checked: !segment.checked,
                    currentVersion: segment.currentVersion,
                    history: segment.history,
                    id: segment.id,
                    name: segment.name,
                    status: segment.status,
                    order: segment.order
                }
            } else {
                return segment
            }
        }))
    })
    const handleOrderChange = (event => {
        setUserSegments(userSegments.map((segment, index) => {
            if(index === parseInt( event.target.id )) {
                return {
                    checked: segment.checked,
                    currentVersion: segment.currentVersion,
                    history: segment.history,
                    id: segment.id,
                    name: segment.name,
                    status: segment.status,
                    order: parseInt(event.target.value)
                }
            } else {
                return segment
            }
        }))
    })
    const handleCreate = () => {
        // A few things need to happen now.
        // 1. Create a new paper with the user's specified name, and get the paper Id back
        // 2. For each segment that is "checked", we need to
        // insert them as new paper segments with the paper id, order and segment id
    }


    // Reusables
    const Version = (props) => {
        return (
            <div>
                <b>Version: {props.content.version}</b><br/>
                <b>Content:</b><br/>
                <p>
                    {props.content.content}
                </p><br/>
                <label>
                    <input type="number" id={props.index} value={userSegments[props.index].order} onChange={handleOrderChange} />
                </label>
                <label>
                    Add to paper
                    <input type="checkbox" id={props.id} checked={userSegments[props.index].checked} onChange={handleCheckboxClick} />
                </label><br/>
                ====================<br/>
            </div>
        )
    }
    const Segment = (props) => {
        return (
            <div>
                <h4>{props.value.name}</h4><br/>
                {props.value.history ?
                        props.value.history.map((content) => <Version key={content.id} id={content.id} index={props.index} content={content}/>)
                        : <div></div>
                }
            </div>
        )
    }

    return (
        <div>
            <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Papers', dest: '/app/papers'}, {name: 'Create Paper', dest: '/app/papers/create'}]}/>
            Paper Title
            <input type="text" name="paperName" />
            <h2>Add a segment to a paper</h2>
            {
                userSegments ?
                    userSegments.map((segment, index) => <Segment key={segment.id} index={index} value={segment} />)
                    : <div></div>
            }
            <button onClick={handleCreate} >Create Paper</button>
        </div>
    )
}

export default withLoginRequired(withAuth(CreatePaper))
