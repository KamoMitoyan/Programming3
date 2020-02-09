
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/predator.js");
var Reaper = require("./modules/reaper.js");
var Creator = require("./modules/creator.js");
var Hunter = require("./modules/hunter.js");
let random = require('./modules/random');
//! Requiring modules  --  END

//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
predatorArr = [];
reaperArr = [];
creatorArr = [];
hunterArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
reaperHashiv = 0;
creatorHashiv = 0;
hunterHashiv = 0;
weather = "";
let count = 0;
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, predator, reaper, creator,hunter) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < reaper; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < creator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < hunter; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
}
matrixGenerator(50, 3, 8, 3, 3, 2, 8);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            }
            else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if(matrix[y][x] == 3){
                var predator = new Predator(x,y);
                predatorArr.push(predator);
                predatorHashiv++;
            }
            else if(matrix[y][x] == 4){
                var reaper = new Reaper(x,y);
                reaperArr.push(reaper);
                reaperHashiv++;
            }
            else if(matrix[y][x] == 5){
                var creator = new Creator(x,y);
                creatorArr.push(creator);
                creatorHashiv++;
            }
            else if(matrix[y][x] == 6){
                var hunter = new Hunter(x,y);
                hunterArr.push(hunter);
                hunterHashiv++;
            }
        }
    }
}
creatingObjects();

function game() {
	
	count++;

	if(count <= 10){
		weather = "summer";
	}
	else if(count > 10 && count <= 20){
		weather = "autumn";
	}
	else if(count > 20 && count <= 30){
		weather = "winter";
	}
	else if(count > 30 && count < 40){
		weather = "spring";
	}else{
        count = 0;
    }

    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if(predatorArr[0] !== undefined){
        for(var i in predatorArr){
            predatorArr[i].eat();
        }
    }
    if(reaperArr[0] !== undefined){
        for(var i in reaperArr){
            reaperArr[i].move()
        }
    }
    if(creatorArr[0] !== undefined){
        for(var i in creatorArr){
            creatorArr[i].move();
        }
    }
    if(hunterArr[0] !== undefined){
        for(var i in hunterArr){
            hunterArr[i].eat();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        predatorCounter: predatorHashiv,
        reaperCounter: reaperHashiv,
        creatorCounter: creatorHashiv,
        hunterCounter: hunterHashiv,
        weather: weather,
		grassQuantity: grassArr.length,
		grassEaterQuantity: grassEaterArr.length,
		predatorQuantity: predatorArr.length,
		reaperQuantity: reaperArr.length,
		creatorQuantity: creatorArr.length,
		hunterQuantity: hunterArr.length
    }
    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
	
}



setInterval(game, 1000);