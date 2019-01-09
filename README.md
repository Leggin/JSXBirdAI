# JSXBirdAI

JSXBirdAI is a flappy bird ai implemented in the [JSXGraph library](https://jsxgraph.uni-bayreuth.de/wp/index.html). The ai optimizes how to play flappy bird with unsupervised learning, which is implemented as evolutionary algorithm. 

## Run
To run the code use a http server tool like [http-server](https://www.npmjs.com/package/http-server) to serve the index.html.
Example using http-server:
```sh
$ http-server .
```
## How the AI works
Every ball is an independent neural net of size (5,4,1), which means it has an input layer of 5 nodes, one hidden layer of 4 nodes and an ouput layer of 1 node. 
#### Input layer
The 5 input nodes are what each ball "sees":
| Input index | Input value |
| ------ | ------ |
| 0 | the y coordinate of the ball |
| 1 | the x coordinate of the closest obstacle |
| 2 | the y coordinate of the top border of the closest obstacle |
| 3 | the y coordinate of the bottom border of the closest obstacle |
| 4 | the current velocity of the ball |

### Output layer
The output layer consists of one node with sigmoid as activation function. Which means, that the output is either 1 or 0.
If the output is 1, the ball will perform a jump (which is the equivalent of tapping when playing the game yourself). If the output is 0, nothing will happen. 

### Functionality
At the beginning of the animation 600 balls are generated. Each ball has its own neural net. At each animation step, each ball performs a prediction with the given inputs from above. The output of this prediction is then performed on each ball. For each pixel that a ball has progressed through the obstacle course in x-direction, it receives a point. If a ball touches an obstacle, it is removed from the animation, but held in an list of "dead" balls. When there is no ball left, a new generation is created in which 10% of the best scoring balls are remixed, and the rest of the balls are mutated. The mutation is that each weight in the neural net is multiplied by a random value between -1 and 1 as well as each bias. This results in a different neural network, which in turn performs the obstacle course differently than before. 
*The hope is that after a few generations, randomness will result in a neural network that will carry out the obstacle course without crashing.*