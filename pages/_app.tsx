import App from 'next/app'
import { Auth0Provider } from 'use-auth0-hooks'
import UrqlProvider from '../components/urqlProvider';

import '@fortawesome/fontawesome-svg-core/styles.css';

/*
* This file defines details about our Auth0 account,
* and provide the logged in user's details to the
* rest of the application by wrapping around it.
*
* This file also uses the UrqlProvider component
* which provides a database connection to the
* the rest of the application.
*/
export default class extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
        <Auth0Provider
            domain={process.env.AUTH0_DOMAIN}
            clientId={process.env.AUTH0_CLIENT_ID}
          redirectUri={process.env.REDIRECT_URI}>
          <UrqlProvider nested={<Component {...pageProps}/>} />
        </Auth0Provider>
    )
  }
}
