import React, { useState, useEffect } from 'react'
import { withAuth, withLoginRequired, useAuth } from 'use-auth0-hooks'
import { useMutation } from 'urql'
import { addPaper } from '../../queries'

import AppHeader from '../../../components/app_header'

const CreatePaper = () => {
    const auth = useAuth({});
    const [newPaper, setNewPaper] = useState({})
    const [mutationResult, executeMutation] = useMutation(addPaper);

    // Call this to insert a paper, ideally on a form submit
    const createNewPaper = (paperName) => {
        executeMutation({ email: auth.user.email, name: paperName }).then(mutationResult => {
            setNewPaper(mutationResult.data.insert_Paper.returning[0])
            console.log(mutationResult.data.insert_Paper.returning[0])
        })
    }

    const handleFormSubmit = (event => {
        event.preventDefault()
        createNewPaper(event.target[0].value)
    })


    return (
        <div>
            <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Papers', dest: '/app/papers'}, {name: 'Create Paper', dest: '/app/papers/create'}]}/>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Paper Title
                    <input type="text" name="paperName" />
                </label>
                <input type="submit" value="Submit" />
            </form>

        </div>
    )
}

export default withLoginRequired(withAuth(CreatePaper))
