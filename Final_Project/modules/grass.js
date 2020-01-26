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


