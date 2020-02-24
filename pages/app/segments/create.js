import React, { useCallback, useState, useEffect } from 'react'
import { useMutation } from 'urql'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'
import { addSegment } from '../../queries'
import AppHeader from '../../../components/app_header'

const CreateSegment = () => {
    const auth = useAuth({});
    const [newSegment, setNewSegment] = useState({})
    const [mutationResult, executeMutation] = useMutation(addSegment);

    // Call this to insert a segment, ideally on a form submit
    const createNewSegment = (segmentName, content) => {
        executeMutation({ segmentName: segmentName, email: auth.user.email, content: content }).then(mutationResult => {
            setNewSegment(mutationResult.data.insert_Segment.returning[0])
            console.log(mutationResult.data.insert_Segment.returning[0])
        })
    }

    const handleFormSubmit = (event => {
        event.preventDefault()
        createNewSegment(event.target[0].value, event.target[1].value)
    })
    return (
        <div>
            <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Segments', dest: '/app/segments'}, {name: 'Create Segment', dest: '/app/segments/create'}]}/>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Segment Title
                    <input type="text" name="segmentName" />
                </label>
                <label>
                    Content
                    <input type="text" name="content" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>

    )
}

export default withLoginRequired(withAuth(CreateSegment))
