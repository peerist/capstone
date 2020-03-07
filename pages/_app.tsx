import App from 'next/app'
import { Auth0Provider } from 'use-auth0-hooks'


import UrqlProvider from '../components/urqlProvider.js'

import '@fortawesome/fontawesome-svg-core/styles.css';

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
