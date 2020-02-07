var God = require("./god");
var random = require("./random");


module.exports = class Reaper extends God{

	constructor(x,y,index){
		super(x,y,index);
	}
	
	move(){
		let newCell = random(this.chooseCell(0));
		if(newCell){
			matrix[this.y][this.x] = 0;
			this.x = newCell[0];
			this.y = newCell[1];
			matrix[newCell[1]][newCell[0]] = 4;
			if(weather == "summer" || weather == "spring" || weather == "autumn"){
				this.destroy();	
			}
			
		}
	}

	destroy(){
	   this.getNewCoordinates();
	   for(let i = 0; i < this.directions.length; i++){
		  let x  = this.directions[i][0];
		  let y = this.directions[i][1];
		  if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
				
				if(matrix[y][x] == 1){
                     for(let c in grassArr){
						if (x == grassArr[c].x && y == grassArr[c].y) {
							grassArr.splice(c, 1);
						}
 
					 }
				}
				else if(matrix[y][x] == 2){
					for(let c in grassEaterArr){
						if (x == grassEaterArr[c].x && y == grassEaterArr[c].y) {
							grassEaterArr.splice(c, 1);
						}
					 }
				}
				else if(matrix[y][x] == 3){
					for(let c in predatorArr){
						if (x == predatorArr[c].x && y == predatorArr[c].y) {
							predatorArr.splice(c, 1);
						}
 
					 }
				}
				/*else if(matrix[y][x] == 4){
					for(let c in reaperArr ){
						if (x == reaperArr[c].x && y == reaperArr[c].y) {
							reaperArr.splice(c, 1);
						}
					 }
				}*/
				else if(matrix[y][x] == 6){
					for(let c in hunterArr ){
						if (x == hunterArr[c].x && y == hunterArr[c].y) {
							hunterArr.splice(c, 1);
						}
					 }
				}
				matrix[y][x] = 0;
		   }
	   }
	}
}
