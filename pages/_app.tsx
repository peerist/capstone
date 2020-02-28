
import App from 'next/app'
import { Auth0Provider } from 'use-auth0-hooks'
import UrqlProvider from '../components/urqlProvider';
import auth0 from '../utils/auth0';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Nav from '../components/nav'


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
