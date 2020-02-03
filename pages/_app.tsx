import { ThemeProvider } from 'emotion-theming'
import App from 'next/app'
import { Auth0Provider } from 'use-auth0-hooks'

import auth0 from '../utils/auth0';

import theme from '../theme'
import Nav from '../components/nav'

import '@fortawesome/fontawesome-svg-core/styles.css';

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Auth0Provider
        domain={process.env.AUTH0_DOMAIN}
        clientId={process.env.AUTH0_CLIENT_ID}
        redirectUri={process.env.REDIRECT_URI}>
          <ThemeProvider theme={theme}>
            <Nav />
            <Component {...pageProps}/>
          </ThemeProvider>
      </Auth0Provider>
    )
  }
}
