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
