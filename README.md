# TrackTuner
For SSW 590 Final Project

"TrackTuner" is a web app that helps users discover new music based on their favorite artists or songs through the Spotify API. Users can interact with their favorite tracks and playlists, create new ones, and explore music recommendations. The application utilizes a robust, hybrid CI/CD pipeline that leverages GitHub Actions for automation, integrates with Docker for container orchestration, and uses AWS Lambda for serverless deployment. This setup enables seamless deployment of both containerized applications and serverless functions, ensuring efficient and flexible scaling. The pipeline includes automation to maintain optimal performance and reliability throughout the development and deployment process.

Access application by visiting the Elastic Beanstalk domain: http://tracktuner-env-env.eba-feqppmac.us-east-2.elasticbeanstalk.com

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Prior to running the React application locally, make sure to doublecheck the redirectUri in `Spotify.js`

`const redirectUri = encodeURIComponent("http://localhost:3000/")`

Change it from `http://localhost:8080/` to `http://localhost:3000/` if necessary. (8080 is for the Docker image)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

# Running Docker Image

Prior to building the Docker image, make sure to doublecheck the redirectUri in `Spotify.js`

`const redirectUri = encodeURIComponent("http://localhost:8080/")`

Change it from `http://localhost:3000/` to `http://localhost:8080/` if necessary. (3000 is for local deployment)

## Build Image

`cd track-tuner`

You must configure your environment variable at the build stage by pasting it into the command below.

`docker build --build-arg REACT_APP_SPOTIFY_API_KEY=your-spotify-client-id -t track-tuner .`

## Run Container

`docker run -p 8080:80 track-tuner`

Navigate to localhost:8080 to see the application running.
