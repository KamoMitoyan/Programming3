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

