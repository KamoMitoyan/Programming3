let matrix = [];
 let grassArr = [];
 let grassEaterArr = [];
 let predatorArr = [];
 let reaperArr = [];
 let creatorArr = [];
 let hunterArr = [];
 let side = 10;
 let m = 50;
 let n = 50;
 
 
 function setup() {
    //noStroke();
    frameRate(5);
    createCanvas(m*side,n*side);
    background('#acacac');
    for(let x = 0; x < m; x++){
        matrix[x] = [];
        for(let y = 0; y < n; y++ ){
            let number = random(0,100);
            if(number <= 70){
               matrix[x][y] = random([0,1]);
            }
            else if(number <  95 && number > 70){
               matrix[x][y] = random([1,2,3]);
            }
            else if(number <  99 && number > 95){
                matrix[x][y] = random([6]);
             }
           else if(number <  100 && number > 99){
                matrix[x][y] = random([4,5]);
            }
        }
    }
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix.length; j++ ){
            if(matrix[i][j] == 1){
                let gr = new Grass(j,i,1);
                grassArr.push(gr);
            }
            else if(matrix[i][j] == 2){
                let grEater = new GrassEater(j,i,2);
                grassEaterArr.push(grEater);
            }
			else if(matrix[i][j] == 3){
                let predator = new Predator(j,i,3);
                predatorArr.push(predator);
            }
			else if(matrix[i][j] == 4){
                let reaper = new Reaper(j,i,4);
				reaperArr.push(reaper);
            }
           else if(matrix[i][j] == 5){
                let creator = new Creator(j,i,5);
				creatorArr.push(creator);
            }
            else if(matrix[i][j] == 6){
                let hunter = new Hunter(j,i,6);
			    hunterArr.push(hunter);
            }
        }

    }

 }
 function draw() {

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
 
            if (matrix[y][x] == 1) {
                fill("green");
                
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
			else if (matrix[y][x] == 3) {
                fill("red");
            }
			else if (matrix[y][x] == 4) {
                fill("black");
            }
            else if (matrix[y][x] == 5) {
                fill("white");
            }
            else if (matrix[y][x] == 6) {
                fill("blue");
            }
         
            rect(x * side, y * side, side, side);
        }
    }
    for(let grass of grassArr){
        grass.mul();
    }
   for(let grassEater of grassEaterArr){
        grassEater.eat();
    }
	for(let predator of predatorArr){
        predator.eat();
    }
	for(let reaper of reaperArr){
		reaper.move();
    }
    for(let creator of creatorArr){
        creator.move();
    }
    for(let hunter of hunterArr){
        hunter.eat();
    }
 }
 