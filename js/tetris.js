
var tetris={
	OFFSET:15,//保存容器的内边距
	CSIZE:26,
	shape:null,//保存正在下落的主角
	nextShape:null,
	timer:null,
	interval:1000,
	wall:null,//保存所有已停止下落的方块
	RN:20,
	CN:10,
	lines:0,
	score:0,
	SCORES:[0,10,50,120,200],
	state:1,
	RUNNING:1,
	PAUSE:2,
	GAMEROVER:0,
	LN:10,
	LNINTERVAL:1000,
	MIN:100,
	level:1,
	start:function(){
		//将wall初始化为空数组
    //r从0开始，到<RN结束，每次增1
      //设置wall中r位置的行为CN个元素的空数组
    //随机生成主角图形，保存在shape中
		this.innterval=1000;
		this.level=1;
		this.state=this.RUNNING;
		this.lines=0;
		this.score=0; 
		this.wall=[];
		for(var r=0;r<this.RN;r++){
			this.wall[r]=new Array(this.CN);
		}
		this.shape=this.randomShape();
		this.nextShape=this.randomShape();
		this.paint();
		this.timer=setInterval(this.moveDown.bind(this),this.interval);
		var me=this;
		document.onkeydown=function(e){
			switch(e.keyCode){
      			case 37:if(me.state==me.RUNNING){me.moveLeft();}break;
				case 39:if(me.state==me.RUNNING){me.moveRight();} break;
				case 40:if(me.state==me.RUNNING){me.moveDown();}break;
				case 38:if(me.state==me.RUNNING){me.rotateR();}break;
				case 90:if(me.state==me.RUNNING){me.rotateL();}break;
				case 83:if(me.state==me.GAMEOVER){me.start();}break;
				case 80:if(me.state==me.RUNNING){me.pause();}break;
				case 67:if(me.state==me.PAUSE){me.myContinue()}break;
				case 81:if(me.state!=me.GAMEOVER){me.quit()}break;
				case 32:if(me.state==me.RUNNING){me.hardDrop()}
			}
		}
	},
	hardDrop:function(){
		while(this.canDown()){
			this.shape.moveDown();
		}
		this.paint();
	},
	myContinue:function(){
		this.state=this.RUNNING;
		this.paint();
	},
	pause:function(){
	this.state=this.PAUSE;
	this.paint();
	},
	canRotate:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.r>19||cell.r<0||cell.c<0||cell.c>9||this.wall[cell.r][cell.c]!=undefined){
				return false;
			}
			return true;
		}
	},
	rotateR:function(){
		this.shape.rotateR();
		!this.canRotate()?this.shape.rotateL():this.paint();
	},
	rotateL:function(){
		this.shape.rotateL();
		!this.canRotate()?this.shape.rotateR():this.paint();
		
	},
	canLeft:function(){
		for(var r=0;r<this.shape.cells.length;r++){
			var cell=this.shape.cells[r];
			if(cell.c==0||this.wall[cell.r][cell.c-1]!=undefined){
				return false;
			}
		}
		return true;	
		
	},
	canRight:function(){
		for(var r=0;r<this.shape.cells.length;r++){
			var cell=this.shape.cells[r];
			if(cell.c==9||this.wall[cell.r][cell.c+1]!=undefined){
				return false;
			}
		}
		return true;	
		
	},

	moveLeft:function(){
		if(this.canLeft()){
			this.shape.moveLeft();
			this.paint();
		}
	},
	moveRight:function(){
		if(this.canRight()){
			this.shape.moveRight();
			this.paint();
		}
	},
	canDown:function(){
		 //遍历shape中每个cell
      //将当前cell临时存储在变量cell中
      //如果cell的r已经等于19
        //或wall中cell的下方位置不等于undefined
        //返回false
    //(遍历结束)
    //返回true
		for(var i=0;i<this.shape.cells.length;i++){//?????????
			var cell=this.shape.cells[i];
			if(cell.r==19||this.wall[cell.r+1][cell.c]!=undefined){
				return false;
			}
		}
		return true;
	},

	quit:function(){
		this.state=this.GAMEOVER;
		clearInterval(this.timer);
		this.timer=null;
		this.paint();
	},
	moveDown:function(){
		if(this.state==this.RUNNING){
		//如果可以下落
		if(this.canDown()){
			this.shape.moveDown();
		}else{//否则
			this.landIntoWall();//调用landIntoWall，将shape放入墙中
			var ln=this.deleteRows();
			this.lines+=ln;
			this.score+=this.SCORES[ln];
			if(this.lines>this.level*this.LN){
				this.level++;
				if(this.interval>this.MIN){
					this.interval-=this.LIINTERVAL;
					clearInterval(this.timer);
					this.timer=setInterval(this.moveDown.bind(this),this.interval);
				}
			}
		if(this.isGameOver()){//如果游戏结束
				this.quit();
			}else{//否则
				this.shape=this.nextShape;
				this.nextShape=this.randomShape();//调用randomShape方法，随机生成图形，保存在shape中
				}
		}
		this.paint();
		}
	},
	paintState:function(){
		if(this.state==this.PAUSE){
			var img=new Image();
			img.src="img/pause.png";
			pg.appendChild(img);
		}else if(this.state==this.GAMEOVER){
			var img=new Image();
			img.src="img/game-over.png";
			pg.appendChild(img);
		}
	},
	isGameOver:function(){
		for(var i=0;i<this.nextShape.cells.length;i++){
			var cell=this.nextShape.cells[i];
			if(this.wall[cell.r][cell.c]!=undefined){
				return true;
			}
		}
		return false;
	},
	paintNext:function(){
		var frag=document.createDocumentFragment();
		for(var i=0;i<this.nextShape.cells.length;i++){
			var cell=this.nextShape.cells[i];
			var img=new Image();
			img.src=cell.src;
			img.style.top=this.OFFSET+(cell.r+1)*this.CSIZE+"px";
			img.style.left=this.OFFSET+(cell.c+10)*this.CSIZE+"px";
			frag.appendChild(img);
		}
		pg.appendChild(frag);

	},
	paintScore:function(){
		lines.innerHTML=this.lines;
		score.innerHTML=this.score;
		level.innerHTML=this.level;
	},
	deleteRows:function(r){
		for(var r=this.RN-1,ln=0;r>=0&&this.wall[r].join("")!="";r--){
			if(this.isFull(r)){
				this.deleteRow(r);
				r++;
				ln++;
				if(ln==4){
				break;
				}
			} 
		}
		return ln;
	},
	deleteRow:function(delr){
		for(var r=delr;r>0;r--){
			this.wall[r]=this.wall[r-1];
			this.wall[r-1]=new Array(this.CN);
			for(var i=0;i<this.CN;i++){
				var cell=this.wall[r][i];
				cell!=undefined&&cell.r++;
				}
				if(this.wall[r-2].join("")==""){break;}
			}
		},
	isFull:function(r){
		return String(this.wall[r]).search(/^,|,,|,$/)==-1;
	
	},
	randomShape:function(){//专门随机创建一个图形
		
	 var r=parseInt(Math.random()*3);//在0~2之间生成随机数，保存在变量r中
    //判断r
	//如果是0：返回一个新的O类型的图形对象
      //如果是1：返回一个新的I类型的图形对象
      //如果是2：返回一个新的T类型的图形对象
		/*if(r==0){
			return new O();
		}else if(r==1){
			return new I();
		}else if(r==2){
			return new T();
		}*/
		switch(r){
		case 0:return new O();
		case 1:return new I();
		case 2:return new T();
		}
	},
	landIntoWall:function(){
	 //遍历shape中每个cell
      //将当前cell临时存储在变量cell中
      //将当前cell赋值给wall中相同位置
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			this.wall[cell.r][cell.c]=cell;//??
			
		}
	},
	paintWall:function(){
		var frag=document.createDocumentFragment();
		 //自底向上遍历wall中每行的每个cell
		 for(var r=this.RN-1;r>=0&&this.wall[r].join("")!="";r--){
			 for(var c=0;c<this.CN;c++){
				 var cell=this.wall[r][c];

      //将当前格子，保存在变量cell中
      //创建一个新Image对象，保存在变量img中
	  if(cell){
		  var img=new Image();
		  img.src=cell.src;//设置img的src为cell的src
		  //设置img的top为OFFSET+cell的r*CSIZE
		  img.style.top=this.OFFSET+cell.r*this.CSIZE+"px";
		  //设置img的left为OFFSET+cell的c*CSIZE
		  img.style.left=this.OFFSET+cell.c*this.CSIZE+"px";
		  frag.appendChild(img);//将img追加到frag中
		}
	  } //(遍历结束)
    //将frag追加到pg中
	pg.appendChild(frag);
		}
	},
	paint:function(){
		var reg=/<img[^>]*>/g;
		pg.innerHTML=pg.innerHTML.replace(reg,"");
		this.paintShape();
		this.paintWall();
		this.paintScore();
		this.paintNext();
		this.paintState();
	},

	paintShape:function(){
		var frag=document.createDocumentFragment();
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			var img=new Image();
			img.src=cell.src;
			img.style.top=this.OFFSET+cell.r*this.CSIZE+"px";
			img.style.left=this.OFFSET+cell.c*this.CSIZE+"px";
			frag.appendChild(img);
		}
		pg.appendChild(frag);

	},
}
	window.onload=function(){
		tetris.start();
	}