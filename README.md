# King's Valley

King's Valley is an abstract startegy game, written by <a href="https://www.youtube.com/watch?v=y9o_ydV63Ho">Mr. Mitsuo Yammamoto</a>.
The purpose of the game is to get your Pharaoh onto the centre square, to allow his dynasty to flourish.<br/>
Each piece can move horizontally, vertically and diagonally. However it has to move until it's blocked by the edge of the board or another piece. And the Scarabs, cannot land on the center square! </br>
You will need to use your Scarabs in conjunction with your enemy's scarabs to allow your Pharaoh to walk into the the Valley and turn it in the the King's Valley.
<p>

![Alt text](./screenshot.png?raw=true "King's Valley")

## The code

I wrote this in React, in order to get some (more) hands-on experience with React and JavaScript. As a systems- and backend developer, you don't get the chance to make UIs. And since I yearned to do some Blender modelling again, I decided to combine that with a little coding challence.
<p>
The code can be changed and improved -- especially refactor the method below.
<code>
#getAllMovesPiece(board, from_x, from_y) 
</code>
Each for should be broken out in it's own little method, or quite possible even with self modifying code... It's JavaScript so reflection/eval is possible, LOL! I just can't be bothered it works. 

### The AI

The AI is a simple straight forward brute force minimax() algorithm. This game is quite difficult to score, it basically as "draw", "win", "lose" and no easy way to cauge who has the upperhand. Unlike most other games. And in some cases it would even ignore a winning move, knowing that you were screwed and play with you like a cat with his prey. And just as you thought you were in the Valley, it would finally step in. This is now solved with an immediate "game_over" check that avoids the minimax scoring.</br>
As funny as it initially was, to see you being led by the Pharaoh down the garden path and before you get into the shed, drop-kicked in the Egyptian (Dutch) jewels.

You can tweak the depth of playing here: 
<code>
  function dragEnd(e) {   
    if (!legalMove) return;
    if (checkForWinner(board)) return true;

    if (player === gameLogic.BLACK) {
      gameLogic.ai(board, 5).then( () => {
        setBoard([...board]);
        if (checkForWinner(board)) return true;
      });
    }
  }
</code>

Just change the 5 to a 4, a 6 really takes long to churn through, and you get confronted with the "Page Not Responding" more than on 5. Which is a nice and challenging level for me. I found away to defeat level 4 all the time.<br/>
I may actually create a difficulty slider at some point.

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
