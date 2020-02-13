import { Provider, createClient } from 'urql'
import { useAuth } from 'use-auth0-hooks'
import { ThemeProvider } from 'emotion-theming'
import theme from '../theme'
import Nav from '../components/nav'



const UrqlProvider = (props) => {
    const { nested } = props
    const { accessToken } = useAuth({})
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
