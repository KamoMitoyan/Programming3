class God {
	constructor(x,y,index){
		this.x = x;
		this.y = y;
		this.index = index;
		this.directions = [];
	}
	getNewCoordinates(){
		this.directions = [
			[this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
			[this.x - 2, this.y - 2],
			[this.x - 1, this.y - 2],
			[this.x, this.y - 2],
			[this.x + 1, this.y - 2],
			[this.x + 1, this.y - 2],
			[this.x + 2, this.y - 2],
			[this.x - 2, this.y - 1],
			[this.x - 2, this.y],
			[this.x - 2, this.y + 1],
			[this.x - 2, this.y + 2],
			[this.x - 1, this.y + 2],
			[this.x, this.y + 2],
			[this.x + 1, this.y + 2],
			[this.x + 2, this.y + 2],
			[this.x + 2, this.y - 1],
			[this.x + 2, this.y],
			[this.x + 2, this.y + 1]
		];
	}

	chooseCell(character){
        this.getNewCoordinates();
        let found = [];
        for(let i  in this.directions){
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
}

class MainParent{
	constructor(x,y,index){
		this.x = x;
        this.y = y;
		this.index  = index;
		this.directions = [];
	}

	chooseCell(character){
        let found = [];
        for(let i  in this.directions){
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
}

class Grass extends MainParent{
    constructor(x,y,index){
		super(x,y,index);  
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    
    }

    mul(){
        this.multiply++;
        let newCell = random(this.chooseCell(0));
        if(this.multiply >= 4 && newCell){
            let newGrass = new Grass(newCell[0],newCell[1],this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
	}
	
	die(){
		for (var i in grassArr) {
			if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
				grassArr.splice(i, 1);
			}
		}	
	}
}

class GrassEater extends MainParent {
    constructor(x,y,index){
		super(x,y,index);
        this.energy = 8;
    }

    getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character){
        this.getNewCoordinates();
		return	super.chooseCell(character);
    }

    mult(){
		let newCell = random(this.chooseCell(0));
		if(newCell){
			let grEater = new GrassEater(newCell[0],newCell[1]);
			grassEaterArr.push(grEater); 
			matrix[newCell[1]][newCell[0]] = 2;
			this.energy = 8;
		}
    }

    eat(){
	   let newCell = random(this.chooseCell(1));
	   if(newCell){
			this.energy++;
			matrix[this.y][this.x] = 0;
			this.x = newCell[0];
			this.y = newCell[1];
			matrix[newCell[1]][newCell[0]] = 2;
			for (var i in grassArr) {
                if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                    grassArr.splice(i, 1);
                }
			}	
		}
		else{
			this.move();
		}
		if(this.energy >= 10){
			this.mult();
		}
    }
    die(){
		for(let i in grassEaterArr){
			if(grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y){
				matrix[this.y][this.x] = 0;
				grassEaterArr.splice(i,1);
			}
		}
    }

    move(){  
		let newCell = random(this.chooseCell(0));
		if(newCell){
			this.energy--;
			matrix[this.y][this.x] = 0;
			this.x = newCell[0];
			this.y = newCell[1];
			matrix[newCell[1]][newCell[0]] = 2;
		}
		if(this.energy <= 0){
			this.die();
		}
    }
}


class Predator extends MainParent{
	constructor(x,y,index){
		super(x,y,index);
		this.energy = 8;
	}
	getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

	chooseCell(character){
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

	move(){
		let newCell = random(this.chooseCell(0));
			if(newCell){
				this.energy--;
				matrix[this.y][this.x] = 0;
				this.x = newCell[0];
				this.y = newCell[1];
				matrix[newCell[1]][newCell[0]] = 3;
			}
			if(this.energy <= 0){
				this.die();
			}
		}
		eat(){
		let newCell = random(this.chooseCell(2));
		if(newCell){
			this.energy++;
			matrix[this.y][this.x] = 0;
			this.x = newCell[0];
			this.y = newCell[1];
			matrix[newCell[1]][newCell[0]] = 3;
			for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1);
                }
			}	
		}
		else{
			this.move();
		}
		if(this.energy >= 15){
			this.mult();
		}
    }

	mult(){
			let newCell = random(this.chooseCell(0));
			if(newCell){
				let predator = new Predator(newCell[0],newCell[1]);
				predatorArr.push(predator);
				matrix[newCell[1]][newCell[0]] = 3;
				this.energy = 8;
			}
	}

	die(){
		for(let i in predatorArr){
			if(predatorArr[i].x == this.x && predatorArr[i].y == this.y){
				matrix[this.y][this.x] = 0;
				predatorArr.splice(i,1);
			}
		}
	}
}


class Reaper extends God{

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
			this.destroy();
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
				else if(matrix[y][x] == 4){
					for(let c in reaperArr ){
						if (x == reaperArr[c].x && y == reaperArr[c].y) {
							reaperArr.splice(c, 1);
						}
					 }
				}
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


class Creator extends God{
    constructor(x,y,index){
		super(x,y,index);
	}

	move(){
		let newCell = random(this.chooseCell(0));
		if(newCell){
			matrix[this.y][this.x] = 0;
			this.x = newCell[0];
			this.y = newCell[1];
			matrix[newCell[1]][newCell[0]] = 5;
			this.create();
		}
	}

	create(){
		this.getNewCoordinates();
		for(let i = 0; i < this.directions.length; i++){
			let x  = this.directions[i][0];
			let y = this.directions[i][1];
			if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length && matrix[this.directions[i][1]][this.directions[i][0]]==0){
				let randomCh = random([1,2,3]);
				let number = random(0,10);
				if(randomCh == 1 && number <= 5){
					matrix[y][x] = 1;
					let newGr = new Grass(x,y,1);
                    grassArr.push(newGr);
				}
				else if(randomCh == 2 && number >= 6 && number < 8){
					matrix[y][x] = 2;
					let newGrEater = new GrassEater(x,y,2);
                    grassEaterArr.push(newGrEater);
				}
				else if(randomCh == 3 && number >= 9 && number <= 10){
					matrix[y][x] = 3;
					let newPredator = new Predator(x,y,3);
					predatorArr.push(newPredator);
				}
			}
		 }
	}
}


class Hunter extends MainParent {

	constructor(x,y,index){
		super(x,y,index);
		this.killedAnimals = 0;
		this.energy = 8;
	}
	getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
	}

	chooseCell(character){
        this.getNewCoordinates();
        return super.chooseCell(character);
	}
	
	move(){
		let newCell = random(this.chooseCell(0));

		if(newCell){
			this.energy--;
			matrix[this.y][this.x] = 0;
			this.x = newCell[0];
			this.y = newCell[1];
			matrix[newCell[1]][newCell[0]] = 6;
		}
		if(this.energy <= 0 || this.killedAnimals >= 25){
			this.die();
		}
	}

	eat(){
		let newCell = random(this.chooseCell(2));
		let predatorCell = random(this.chooseCell(3));
		let grassCell = random(this.chooseCell(1));
		if(newCell){
			this.energy++;
			this.killedAnimals++;
			matrix[this.y][this.x] = 0;
			this.x = newCell[0];
			this.y = newCell[1];
			matrix[newCell[1]][newCell[0]] = 6;
			for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1);
                }
			}	
		}
		else if(predatorCell){
			this.energy += 2;
			this.killedAnimals += 2;
			matrix[this.y][this.x] = 0;
			this.x = predatorCell[0];
			this.y = predatorCell[1];
			matrix[predatorCell[1]][predatorCell[0]] = 6;
			for (var i in predatorArr) {
                if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                    predatorArr.splice(i, 1);
                }
			}	
		}
		else if(grassCell){
				matrix[this.y][this.x] = 0;
				this.x = grassCell[0];
				this.y = grassCell[1];
				matrix[grassCell[1]][grassCell[0]] = 6;
				for(var i in grassArr){
					if(grassArr[i].x == this.x && grassArr[i].y == this.y){
						grassArr.splice(i,1);
					}
				}
		}
		else if(newCell && grassCell && predatorCell){
			this.energy += 2;
			this.killedAnimals += 2;
			matrix[this.y][this.x] = 0;
			this.x = predatorCell[0];
			this.y = predatorCell[1];
			matrix[predatorCell[1]][predatorCell[0]] = 6;
			for (var i in predatorArr) {
                if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                    predatorArr.splice(i, 1);
                }
			}	
		}
		else if(newCell && grassCell){
			this.energy++;
			this.killedAnimals++;
			matrix[this.y][this.x] = 0;
			this.x = newCell[0];
			this.y = newCell[1];
			matrix[newCell[1]][newCell[0]] = 6;
			for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1);
                }
			}	
		}
		else if(grassCell && predatorCell){
			this.energy += 2;
			this.killedAnimals += 2;
			matrix[this.y][this.x] = 0;
			this.x = predatorCell[0];
			this.y = predatorCell[1];
			matrix[predatorCell[1]][predatorCell[0]] = 6;
			for (var i in predatorArr) {
                if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                    predatorArr.splice(i, 1);
                }
			}	
		}
		else if(newCell && predatorCell){
			this.energy += 2;
			this.killedAnimals += 2;
			matrix[this.y][this.x] = 0;
			this.x = predatorCell[0];
			this.y = predatorCell[1];
			matrix[predatorCell[1]][predatorCell[0]] = 6;
			for (var i in predatorArr) {
                if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                    predatorArr.splice(i, 1);
                }
			}	
		}
		else{
			this.move();
		}
		if(this.energy >= 15 && this.killedAnimals >= 15){
			this.mult();
		}
	}

	mult(){
		let newCell = random(this.chooseCell(0));
			if(newCell){
				let hunter = new Hunter(newCell[0],newCell[1]);
				hunterArr.push(hunter);
				matrix[newCell[1]][newCell[0]] = 6;
				this.energy = 8;
			}
	}

	die(){
		for(let i in hunterArr){
			if(hunterArr[i].x == this.x && hunterArr[i].y == this.y){
				matrix[this.y][this.x] = 0;
				hunterArr.splice(i,1);
			}
		}
	}

}

	