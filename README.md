# Earth Dashboard

Earth Dashboard features hundreds of data sets all in one place on the state of the planet’s resources and citizens. Users can visualize challenges facing people and the planet, from climate change to poverty, water risk to state instability, air pollution to human migration, and more.

# Requirements

Native execution requires the following:

- [Nodejs v14.16.0](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/)
- [RW API](https://api.resourcewatch.org/)

# Installation (native) 📦

Run

```bash
yarn
```

in your terminal will install all dependencies. Once done, type:

```bash
yarn dev
```

and your app will be served in [http://localhost:9000/](http://localhost:9000/) (if you didn't change the default port in the `.env`).

# Branch structure

- `main`: This is the production branch. The code from this branch should be deployable at any time.
- `develop`: This is the reference branch for development. This branch will be used for the staging site and all feature/bug branches should be created starting from it.

## Production build

If you need a production-ready build, run:

```bash
yarn build
```

this will generate your build in `./dist` folder ready to run

Happy coding!

## Deploying to servers

Deployment is done using [Capistrano](https://capistranorb.com/), a [Ruby](https://www.ruby-lang.org/en/) gem. It also requires you to have SSH access to the server using a public/private key pair.

Once you have Capistrano and its dependencies up and running, simply run:

```shell
bundle exec cap <environment> deploy
```

Each available environment will have a file with its name in the `config/deploy` folder.

The process may take a few minutes. The deployment is based of Github, not your local machine, so be sure to have the code you want to see live pushed to Github. You can continue editing your code locally while the deployment process takes place.

## env

There's an `.env.sample` file you will need to duplicate and rename to `.env` in order to make the app work. Populate it properly and that's all.
You can find information there about the environment variables that are necessary for this project.

## Troubleshooting 🤔

You might run into some problems installing dependencies:

### Cairo / Canvas

If the installation fails at the point where it installs `canvas`, you may want to take a look at [this](https://github.com/Automattic/node-canvas#compiling).

# Architecture 📂

The application is built on top of [**Next.js**](https://github.com/zeit/next.js/) - _a framework for server-rendered React apps_. _Next_ provides a zero-setup [webpack](https://webpack.js.org/) build ready to develop along a [express](https://expressjs.com/) server to run the application and [SASS](https://sass-lang.com/) styles compilation.

## Folder structure

Earth Dashboard application is split into the next main folders:

- components
- css
- layout
- pages
- public
- redactions (legacy)
- selectors (legacy)
- services
- slices
- utils

### **./pages**

Pages are the first component to be loaded according _Next_ specification. They contain the layout to be loaded. They are also in charge of fetching data for that specific page.

There are the main pages/groups of pages:

- _[topic]_: contains the news page related to each specific topic
- _index_: homepage.
- _about_: about page _(it's actually loading the homepage with the navigation menu open and the about tab selected)_.
- _404_: custom page not found layout.

_NOTE: The way pages and routing works have changed in the last versions of `Next.js` has changed in the most recent versions of the library. For more information about how this works in the version that ED uses - `9.5.3` please check the [official routing documentation](https://nextjs.org/docs/routing/introduction)._

Apart from the custom pages, there exist the following 3 unique pages defined by _Next_:

#### \_app

Page overriding the default page initialization. The code included here applies to all the rest of pages defined for the app. _Please refer to the [Custom `App`](https://nextjs.org/docs/advanced-features/custom-app) section of the official documentation for more information about this._

#### \_document

Custom Document page used to augment the application's `<html>` and `<body>` tags. _Please refer to the [Custom `Document`](https://nextjs.org/docs/advanced-features/custom-document) section of the official documentation for more information about this._

#### \_error

Custom error page _(only shown in production)_. _Please refer to the [Custom Error Page](https://nextjs.org/docs/advanced-features/custom-error-page) section of the official documentation for more information about this._

### **./layouts**

Layouts are the second component to be loaded as part of the page render process. They contain all components that will be displayed in the page. Layouts don't directly fetch data but rather wait for it. Internal components could ask for data though.

### **./components**

Every component will be contained in its own folder with its name. A basic component will contain the component itself (`component.js`) plus an entrypoint to it (`index.js`). If the component needs access to the store, we will provide it here, otherwise we will just import the component. Additional files would be `component-name.module.scss` (containing component-scoped styles), `constants.js` (component-scoped constants), and `data.js` (component-scoped data).

```
./components/sidebar/
   ./constants.js (not required)
   ./component.js (required)
   ./index.js (required)
   ./sidebar.module.scss (not required)
   ./data.js (not required)
```

_Recommendation: Try to make stateless components (unless it's necessary for some reason). This will make components easier to track and reuse._

### **./redactions** + **./selectors**

These two are legacy folders from RW that are necessary for the back office components to work. Please refer to the [Resource Watch documentation](https://github.com/resource-watch/resource-watch) for more information about this.

### **css**

Contains generic application styles, grid, settings, mixins and anything style-related in a global scope. It also contains third-app components styles if needed.

_Legacy note:_ you will notice some style definitions whose scope are the components themselves as part of the `./css/components` folder. These however are RW migrated styles that were necessary for the back office to work properly. Please refer to the [Resource Watch documentation](https://github.com/resource-watch/resource-watch) for more information about this.

### **./services**

Services are in charge of connecting the application with external APIs/other services. Every service contains a set of fetches (usually based on [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)), it's possible to extend them if needed, but take into account there shouldn't be any app-related logic here. Every fetch should be able to be used in any context.

Services are based on [Axios](https://github.com/axios/axios) to manage `XMLHttpRequests/HTTP` requests.

Services are split into entities (most of them coming from [WRI API](https://resource-watch.github.io/doc-api/index-rw.html), feel free to create a new one if needed. Every fetch _must_ be documented. You can find more info about it in the `documentation` section.

All request wrappers are implemented as standalone functions using Axios that can potentially be used anywhere without any initialization. Most - if not all - of them return promises that should be handled in order to retrieve the results or manage potential errors.

### **./utils**

Contains general use functions that are used across the app. Like `constants`, think about the scope of your _util_ before implementing it here, perhaps just adding it at component's level is enough.

### **.public/static**

Contains assets that are used across the app, like `data`, `images`, `favicon`, `robots`...

# App State Management 🌅

Earth Dashboard uses [**Redux**](http://redux.js.org/) together with [**@reduxjs/toolkit**](https://github.com/reduxjs/redux-toolkit) to manage the app state.

Connection to the store must be isolated from the component itself (separating presentation from logic).

```javascript
import { connect } from "react-redux";

// component
import PagesShow from "./component";

export default connect(
  state => ({
    user: state.user,
    id: state.routes.query.id
  }),
  null
)(PagesShow);
```

The example above shows an `index.js` separating the logic from the component layout.

# Authentication 🚫

Authentication is based on the [RW API user management API](https://resource-watch.github.io/doc-api/index-rw.html#user-management) and it's handled entirely by the front-end. Check the methods from [services/user](https://github.com/wri/earth-dashboard/blob/main/services/user.js) and the [user slice](https://github.com/wri/earth-dashboard/blob/main/slices/user.js) for more information about this.

# Mobile/Desktop/Desktop large... versions 📱

We're using [Fresnel](https://github.com/artsy/fresnel) -an SSR compatible approach to CSS, to manage the different versions of the interface depending on the device that's being used. Definitions of the breakpoints plus components that can be used to define the interface for each of the cases can be found on [/utils/responsive](https://github.com/wri/earth-dashboard/blob/main/utils/responsive.js)

# Optimization 🔎

## Bundle Analyzer

[Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) is a development tool that creates an interactive treemap visualization of the contents of all your bundles.

To run it: `yarn bundle-analyzer`.

It will run the application in production build (makes a `yarn build` internally) and open a tab in your browser displaying the bundles treemap.
