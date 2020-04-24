# components/

This directory holds a lot of the smaller styled components we use throughtout the application. There is a unique component here, `urqlProvider.js`.

**urqlProvider.js**
---
This is a special component we created to wrap around the entire application and provide every page access to our URQL database and access to user's login information via Auth0. In here, we specify the GraphQL API endpoint url, as well as a few other headers. Currently, every user has Admin-level previlieges across the entire database. We spent a large amount of our development time towards finding how to glue auth0's permissioning with our database, but our client specified it was not a priority.