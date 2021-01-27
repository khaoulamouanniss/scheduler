# Interview Scheduler

React based project to create meetings for students to connect with mentors in real-time.

Tech Stack: React, Classnames, Storybook, Babel, WebSockets, Axios, Webpack Dev Server, Jest, Testing Library, Cypress, prop-types.

# Final Product

!["Showing the appointments for Thursday"](https://github.com/khaoulamouanniss/scheduler/blob/master/docs/appointment-show.jpg?raw=true)


!["Creating a new appointment"](https://github.com/khaoulamouanniss/scheduler/blob/master/docs/appointment-form.jpg?raw=true)  
  
  
!["Deleting an appointment"](https://github.com/khaoulamouanniss/scheduler/blob/master/docs/appointment-statut-deleting.jpg?raw=true)  

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress Test Framework

From the scheduler api directory: 

```sh
npm run test:server
```

From scheduler root directory: 


```sh
npm run cypress
```

## Dependencies

- react
- react-dom
- react scripts
- classnames
- normalize.css
- @babel/core
- @testing-library/jest-dom
- @storybook/react
- node-sass
- axios
- @testing-library/react-hooks
- react-test-renderer
- prop-types