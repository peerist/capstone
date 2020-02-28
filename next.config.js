const withCSS = require('@zeit/next-css')
module.exports = withCSS({

  env: {
    AUTH0_DOMAIN: 'peerist-capstone.auth0.com',
    AUTH0_CLIENT_ID: 'oXGxBeJWGHRv1rAMsi73GPWvxcr0voxQ',
    REDIRECT_URI: 'http://localhost:3000/',
    POST_LOGOUT_REDIRECT_URI: 'http://localhost:3000/'
  }

})
