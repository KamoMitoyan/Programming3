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