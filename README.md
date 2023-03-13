# King's Valley

King's Valley is an abstract startegy game, written by <a href="https://www.youtube.com/watch?v=y9o_ydV63Ho">Mr. Mitsuo Yamamoto</a>.
Three years a go I created an actual board version, with my own spin on his abstract game layout. I decided to spice the look and feel up with some Pharaohs and Scarabs. And now I wanted to learn some React and JavaScript, so I wrote the game as a browser version.

## Rules and goal of the game

The goal of the game is to get your Pharaoh onto the centre square, to allow his dynasty to flourish.
<p>
Each piece can move horizontally, vertically and diagonally. However it has to move until it's either blocked by a piece or the edge of the board!!! 
<p>
The Scarabs, cannot land on the center square! </br>
You will need to use your Scarabs in conjunction with your enemy's scarabs to allow your Pharaoh to walk into the the Valley and turn it into "The King's Valley!"
<p>
You move the gold (white) pieces by simply drag and drop. The piece will only be allowed to be dropped on a square when it is a valid move.
<p>
You can play it here: <a href="https://gentle-beach-08e592103.2.azurestaticapps.net/">King's Valley</a>

![Alt text](./screenshot.png?raw=true "King's Valley")

## Game modes

There are two game modes you can start/restart:<br/>
↺ = the normal game with the Pharaoh on your side of the board, which is harder!<br/>
↻ = the game option with the Pharaoh on the opposite side of the board, which is easier and more kid friendly.

# The code

I wrote this in React, in order to get some (more) hands-on experience with React and JavaScript. As a systems- and backend developer, you don't get the chance to make UIs. And since I yearned to do some Blender modelling again, I decided to combine that with a little coding challence.
<p>
The code can be changed and improved -- especially refactor the method below.
<code>
#getAllMovesPiece(board, from_x, from_y) 
</code>
Each for should be broken out in it's own little method, or quite possible even with self modifying code... It's JavaScript so reflection/eval is possible, LOL! I just can't be bothered it works. 

### The AI

The AI is a simple straight forward brute force minimax() algorithm. This game is quite difficult to score, it basically as "draw", "win", "lose" and no easy way to cauge who has the upperhand. Unlike most other games. The AI intially would in some cases ignore his winning move; knowing that you were screwed and play with you like a cat with his prey. And just as you thought you were in the Valley, it would finally step in. This is now solved with an explicit "game_over" check, that avoids the minimax scoring to br ran.
<p>
As funny as it initially was, to see you being led by the Pharaoh down the garden path and before you get into the shed, drop-kicked in the Egyptian (Dutch) jewels.
<p>
You can tweak the difficulty level with the: ▲▼ buttons. This can even be done when it's your turn!
<p>
Feel free to take the code and hack it, improve on it! It's available under the GPLv2 License! For me the learning experience is done and I will put this project to rest. Well... perhaps I will create and AI and rule checker in Rust or C++ as a Rest API so we can checker deeper and faster by multithreading it! 

## Build app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
