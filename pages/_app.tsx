import { ThemeProvider } from 'emotion-theming'
import App from 'next/app'
import auth0 from '../utils/auth0'
import redirectTo from '../utils/redirectTo'

import theme from '../theme'
import Nav from '../components/nav'

import '@fortawesome/fontawesome-svg-core/styles.css';

export default class extends App {
  static async getInitialProps({ctx}) {
    let pageProps = {};

    const user = await auth0.getSession(ctx.req);
    //console.log(ctx.pathname);

    if (!user && ctx.pathname !== '/about') {
      if (ctx.pathname !== '/'){
        redirectTo('/', { res: ctx.res, status: 301 });
      }

    }
    else {
      if (ctx.pathname === '/') redirectTo('/app', { res: ctx.res, status: 301 });
    }

    pageProps['session'] = user;

    return {pageProps};
  }

  render() {
    const {Component, pageProps} = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Nav loginStatus={!!pageProps.session}/>
        <Component />
      </ThemeProvider>
    )
  }
}
