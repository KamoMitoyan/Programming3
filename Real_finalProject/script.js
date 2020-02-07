
//! Setup function fires automatically
function setup() {


    var socket = io();

    var side = 10;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let reaperCountElement = document.getElementById('reaperCount');
    let creatorCountElement = document.getElementById('creatorCount');
    let hunterCountElement = document.getElementById('hunterCount');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 
	
    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
		matrix = data.matrix;
		weather = data.weather;
		console.log(weather);
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        predatorCountElement.innerText = data.predatorCounter;
        reaperCountElement.innerText = data.reaperCounter;
        creatorCountElement.innerText = data.creatorCounter;
        hunterCountElement.innerText = data.hunterCounter;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side);
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
				if(weather == "winter"){
					if (matrix[i][j] == 1) {
				        fill("#a9ffa1");
				        rect(j * side, i * side, side, side);
				    } else if (matrix[i][j] == 2) {
				        fill("#fffca1");
				        rect(j * side, i * side, side, side);
				    } else if (matrix[i][j] == 0) {
				        fill('#acacac');
				        rect(j * side, i * side, side, side);
				    } else if (matrix[i][j] == 3) {
				        fill('#ffa1a1');
				        rect(j * side, i * side, side, side);
				    } else if (matrix[i][j] == 4) {
				        fill('black');
				        rect(j * side, i * side, side, side);
				    } else if (matrix[i][j] == 5) {
				        fill('white');
				        rect(j * side, i * side, side, side);
				    }else if(matrix[i][j] == 6){
				        fill('#a1d9ff');
					    rect(j * side, i * side, side, side);
					}
				}
				if(weather == "summer"){
					if (matrix[i][j] == 1) {
					    fill("green");
					    rect(j * side, i * side, side, side);
					} else if (matrix[i][j] == 2) {
					    fill("yellow");
					    rect(j * side, i * side, side, side);
					} else if (matrix[i][j] == 0) {
					    fill('#acacac');
					    rect(j * side, i * side, side, side);
					} else if (matrix[i][j] == 3) {
					    fill('red');
					    rect(j * side, i * side, side, side);
					} else if (matrix[i][j] == 4) {
					    fill('black');
					    rect(j * side, i * side, side, side);
					} else if (matrix[i][j] == 5) {
					    fill('white');
					    rect(j * side, i * side, side, side);
					}else if(matrix[i][j] == 6){
					    fill('blue');
					    rect(j * side, i * side, side, side);
					}
				}
				if(weather == "spring" || weather == "autumn"){
					if (matrix[i][j] == 1) {
					    fill("#1a6b15");
					    rect(j * side, i * side, side, side);
					} else if (matrix[i][j] == 2) {
					    fill("#d3d624");
					    rect(j * side, i * side, side, side);
					} else if (matrix[i][j] == 0) {
					    fill('#acacac');
					    rect(j * side, i * side, side, side);
					} else if (matrix[i][j] == 3) {
					    fill('#a60d0d');
					    rect(j * side, i * side, side, side);
					} else if (matrix[i][j] == 4) {
					    fill('#5c5858');
					    rect(j * side, i * side, side, side);
					} else if (matrix[i][j] == 5) {
					    fill('#f0e8ce');
					    rect(j * side, i * side, side, side);
					}else if(matrix[i][j] == 6){
					    fill('#0f1b73');
					    rect(j * side, i * side, side, side);
					}
				}
            }
        }
    }
}