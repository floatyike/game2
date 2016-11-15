//定义格子类型Cell
//定义构造函数Cell,接参数r,c
//为当前对象添加r
 function Cell(r,c){
	this.r=r;
	this.c=c;
	this.src="";
}
/**定义旋转状态State**/
function State(r0,c0,r1,c1,r2,c2,r3,c3){
	this.r0=r0;this.c0=c0;this.r1=r1;this.c1=c1;
	this.r2=r2;this.c2=c2;this.r3=r3;this.c3=c3;
}

function Shape(src,cells,orgi,states){
	this.cells=cells;
	for(var i=0; i<this.cells.length;i++){
		this.cells[i].src=src;
	}
	this.orgi=orgi;
	this.states=states;
	this.statei=0;//创建时默认旋转
	
}

Shape.prototype.IMGS={T:"img/T.png",O:"img/O.png",S:"img/S.png",J:"img/J.png",I:"img/I.png",Z:"img/Z.png",L:"img/L.png"}; 
Shape.prototype.moveDown=function(){
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].r++;
	}
}
Shape.prototype.moveLeft=function(){
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].c--;
	}
}
Shape.prototype.moveRight=function(){
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].c++;
	}
}
Shape.prototype.rotate=function(){
	var state=this.states[this.statei];
	var orgCell=this.cells[this.orgi];
	for(var i=0;i<this.cells.length;i++){
		if(i!=this.orgi){
			var cell=this.cells[i];
			cell.r=orgCell.r+state["r"+i];
			cell.c=orgCell.c+state["c"+i];
		}
	}
}
Shape.prototype.rotateR=function(){
	this.statei++;
	this.statei==this.states.length&&(this.statei=0);
	this.rotate();
}
Shape.prototype.rotateL=function(){
	this.statei--;
	this.statei==-1&&(this.statei=this.states.length-1);
	this.rotate();	
}
function T(){
	Shape.call(this,this.IMGS.T,[
	new Cell(0,3),new Cell(0,4),new Cell(0,5),new Cell(1,4)
	],1,[new State(0,-1,0,0,0,+1,+1,0),
		new State(-1,0,0,0,+1,0,0,-1),
		new State(0,1,0,0,0,-1,-1,0),
		new State(+1,0,0,0,-1,0,0,+1)
		]);
}
//T.prototype=Shape.prototype;//??待确定
Object.setPrototypeOf(T.prototype,Shape.prototype);
 function O(){
	Shape.call(this,this.IMGS.O,[
	new Cell(0,4),new Cell(0,5),new Cell(1,4),new Cell(1,5)
	],1,[new State(0,-1,0,0,1,-1,1,0),
		]);
}
Object.setPrototypeOf(O.prototype,Shape.prototype);
//O.prototype=Shape.prototype;//待确定
function I(){
  //借用构造函数Shape，传入参数值: this.IMGS.O,[
  Shape.call(this,this.IMGS.I,[
    new Cell(0,0),//实例化第1个cell对象，传入位置0,4,
    new Cell(0,1),//实例化第2个cell对象，传入位置0,5,
    new Cell(0,2),//实例化第3个cell对象，传入位置1,4,
    new Cell(0,3)//实例化第4个cell对象，传入位置1,5,
  ],1,[new State(0,-1,0,0,0,+1,0,2),
	new State(-1,0,0,0,+1,0,+2,0)
	  ]);
}
//让T类型的原型继承Shape类型的原型
Object.setPrototypeOf(I.prototype,Shape.prototype);
//I.prototype=Shape.prototype;//待确定
/*     cells     orgi   states
  S 04 05 13 14   3        2
  Z 03 04 14 15   2        2
  L 03 04 05 13   1        4
  J 03 04 05 15   1        4
*/

/*function S(){
  //借用构造函数Shape，传入参数值: this.IMGS.O,[
  Shape.call(this,this.IMGS.S,[
    new Cell(0,4),//实例化第1个cell对象，传入位置0,4,
    new Cell(0,5),//实例化第2个cell对象，传入位置0,5,
    new Cell(1,3),//实例化第3个cell对象，传入位置1,4,
    new Cell(1,4)//实例化第4个cell对象，传入位置1,5,
  ],1,[new State(0,-1,0,0,0,+1,0,2),
	new State(-1,0,0,0,+1,0,+2,0)
	  ]);
}
Object.setPrototypeOf(I.prototype,Shape.prototype);
function Z(){
  //借用构造函数Shape，传入参数值: this.IMGS.O,[
  Shape.call(this,this.IMGS.Z,[
    new Cell(0,3),//实例化第1个cell对象，传入位置0,4,
    new Cell(0,4),//实例化第2个cell对象，传入位置0,5,
    new Cell(1,4),//实例化第3个cell对象，传入位置1,4,
    new Cell(1,5)//实例化第4个cell对象，传入位置1,5,
  ],1,[new State(0,-1,0,0,0,+1,0,2),
	new State(-1,0,0,0,+1,0,+2,0)
	  ]);
}
Object.setPrototypeOf(I.prototype,Shape.prototype);
function L(){
  //借用构造函数Shape，传入参数值: this.IMGS.O,[
  Shape.call(this,this.IMGS.L,[
    new Cell(0,3),//实例化第1个cell对象，传入位置0,4,
    new Cell(0,4),//实例化第2个cell对象，传入位置0,5,
    new Cell(0,5),//实例化第3个cell对象，传入位置1,4,
    new Cell(1,3)//实例化第4个cell对象，传入位置1,5,
  ],1,[new State(0,-1,0,0,0,+1,0,2),
	new State(-1,0,0,0,+1,0,+2,0)
	  ]);
}
Object.setPrototypeOf(I.prototype,Shape.prototype);
function J(){
  //借用构造函数Shape，传入参数值: this.IMGS.O,[
  Shape.call(this,this.IMGS.J,[
    new Cell(0,3),//实例化第1个cell对象，传入位置0,4,
    new Cell(0,4),//实例化第2个cell对象，传入位置0,5,
    new Cell(0,5),//实例化第3个cell对象，传入位置1,4,
    new Cell(1,5)//实例化第4个cell对象，传入位置1,5,
  ],1,[new State(0,-1,0,0,0,+1,0,2),
	new State(-1,0,0,0,+1,0,+2,0)
	  ]);
}*/
