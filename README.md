Obvs, a portfolio site to present history, accomplishments, and projects.

Really, just a simple SPA with dynamic routing, built to later integrate with headless CMS and/or SSR/SSG. It so far runs off of static JSON containing flags to activate different features of various portfolio pieces.

To call out a few things that could fly under the radar... on tablet/touch/landscape, my solution for activating the informational state of the thumbnails (without the hover present on desktop/laptop) in either two or three-column breakpoints. And my swipe feature in the portfolio piece detail view. I also kinda dig the depth that looks like a drawer in the mobile nav menu.

I've started refactoring for TypeScript, but gonna come back to it after frying some bigger fish. It's pretty tedious, but important as I like to set up certain things to extract features into later projects. ¯\\_(ツ)\_/¯

Another todo is that I built this with the intention to make the technical scope tags for each project into filters, so clickable to link out to a portfolio view of items filtered by the tag. Or it may be crazy to have that many portfolio items, but I think originally the idea was that I may want to continously contribute to projects, but only have a subset featured on the home page... Maybe in the next iteration...

Some of the portfolio peices were a major undertaking bringing back to life... MAJOR time sink. And the only way I can think to make that not a problem in the future is just to be keeping up on a portfolio at all times...

That home hero design is going to change any day now, I swear. 🙂

TODO: Swap out Bootstrap grid for flexbox.

Merely that I feel like I know my audience here, there's no support for IE like I would have in every other project.

Yeah there's more jQuery in this than I would like. Those choices haven't always been up to me.

If anyone out there wants to use this, pleast just ask, and maybe contribute. 😉

Ok, that's all I have to say for now. ✌️

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
