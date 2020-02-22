import { useAuth } from 'use-auth0-hooks'
import { ThemeProvider } from 'emotion-theming'
import theme from '../theme'
import Nav from '../components/nav'

import withUrqlClient from '../withUrqlClient.js'
import initUrqlClient from '../initUqlClient.js'
import { getUserSegmentsQuery, getUserSegmentsQueryVariables }  from '../pages/app/segments.js'

const UrqlProvider = (props) => {
    const { nested } = props
    return (
      <>
            <ThemeProvider theme={theme}>
                <Nav />
                {nested}
            </ThemeProvider>
      </>
    )
}

UrqlProvider.getInitialProps = async () => {
  const auth = useAuth({})
  const [urqlClient] = initUrqlClient();
  const { data } = await urqlClient
    .query(getUserSegmentsQuery, getUserSegmentsQueryVariables(auth.user.email) )
    .toPromise()

    return { segments: data } 
}

export default withUrqlClient(UrqlProvider)
