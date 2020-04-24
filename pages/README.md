# Pages/

This directory contains all of the user-facing pages. When using the app, you can rely on the page in the URL and find the matching page here. Within the `app/` directory you will find more specific pages.

**_app.tsx**
---
This page is used by NextJS to do some work before presenting the main landing page. We use this component to wrap Auth0's authentication component and our own URQL component around the entire application. That way, login information and the ability to execute database queries is available to all components.

**index.tsx**
---
This page is also used by NextJS to show the rest of the application the user successfully logs in. Authentication information is provided by Auth0 using the `useAuth()` react hook.

**app.js**
---
This holds the 3 main UI buttons for Segments, Papers and Circles. This is the first page that the user encouters that utilizes a GraphQL query and mutation. Two things happen on this page: we query our User table in the database to see if the user aready exists, and if they dont, we create a new user record. The queries used by this page, and all other pages, are found in `queries.js`

**queries.js**
---
This file holds the definitions of all GraphQL queries and mutations. They are exported and imported by each component that needs them.