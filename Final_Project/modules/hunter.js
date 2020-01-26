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

	