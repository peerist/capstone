import { Provider, createClient } from 'urql'
import { useAuth } from 'use-auth0-hooks'
import { ThemeProvider } from 'emotion-theming'
import theme from '../theme'
import Nav from '../components/nav'


/*
* The purpose of this component is to wrap around the entire application
* and provide child components access to the details about the database.
*
* Its here where we would put more details about the role of the logged
* in user and what their permissions would be. That would be handled by
* Auth0.
*/
const UrqlProvider = (props) => {
    /*
    * We wrap all the props given to us around as an object.
    * This lets us use it in the DOM markup below as effectively
    * saying "whatever they passed us, present that with our
    * components around it".
    */
    const { nested } = props
    
    /*
    * This is a leftover of our attempt at getting user permissions
    * and roles working with the Hasura GraphQL Engine.
    */
    const { accessToken } = useAuth({})
    
    /*
    * This method establishes our access to our Hasura GraphQL
    * endpoint. We provide the URL of where the endpoint is,
    * and specify the content type, and importantly,
    * the database password
    * 
    * This is an admin password; we have not implemented permissions
    * within Auth0. In order to do this, Auth0 needs to provide us
    * what the role level is for the logged in user. Then,
    * within Hasura, we setup a role with the right permissions
    * for this user. For now, there is no permission enforcement
    * within the database.
    *
    * Once this client is created, we make it available to the
    * entire application by providing the client to URQL's
    * <Provider component.
    *
    * This will let child components use hooks such as useQuery()
    * and useMutation().
    */
    const client = createClient({
        url: 'http://localhost:8080/v1/graphql',
        fetchOptions: {
            headers: {
                'content-type': 'application/json',
                'x-hasura-admin-secret': 'peeristcapstone'
            }
        }
    })
    return (
        <Provider value={client}>
            <ThemeProvider theme={theme}>
                <Nav />
                {nested}
            </ThemeProvider>
        </Provider>
    )
}

export default UrqlProvider
