
function Game(cfg){
	for (var attr in cfg){
		this[attr]=cfg[attr];
	}
}

Game.prototype={
	constructor : Game ,
	
	width : 640,
	height : 480,
	
	canvas : null,
	gc : null,

	FPS : 40 ,
	sleep: 0,
	playerDied: false,
	mapIndex: -1,
	mapNum: 0,

    player: null,
	sprites: null,
	deaths: null,

	initPos: null,
	win : 0,
	
	pressUpTime : 0,/*按上箭头的时间*/
	
	init : function(){
	
		this.canvas=document.createElement("canvas");
		this.canvas.width=this.width;
		this.canvas.height=this.height;
		document.body.appendChild(this.canvas);
	
		this.gc=this.canvas.getContext("2d");
		
		this.initEvent();
		
		if (this.FPS){
			this.sleep=Math.floor(1000/this.FPS);
		}
		
		this.mapIndex = 0;
		this.mapNum = this.mapNum || 1;
		this.sprites = this.sprites || [];
		mapPos();
		this.win = 0;
		this.sprites[this.mapIndex] = this.sprites[this.mapIndex] || [];
	},

	gameStart : function() {
	    //初始化game
	    game.init();
        //开场画面
	    game.opening();
	},

	opening : function() 
	{
	    var Me = this;
	    if (window.localStorage.mapIndex == undefined || window.localStorage.playerX == undefined || window.localStorage.playerY == undefined || window.localStorage.buttonFlag == undefined || window.localStorage.life == undefined) {
	        this.gc.drawImage(ImgCache["opening1"], 0, 0);
	        this.newGame = 1;
	    }
	    else {
	        this.gc.drawImage(ImgCache["opening2"], 0, 0);
	        this.newGame = 0;
	    }
	    document.getElementById("bgsound1").play();
	    this.openingLoop = setInterval(function () {
	        if (KeyState[Key.Shift] == true) {
	            document.getElementById("bgsound1").pause();
	            document.getElementById("bgsound1").currentTime = 0;

	            clearInterval(Me.openingLoop);
	            Me.openingLoop = null;

	            //重刷地图
	            if (game.newGame == 1 || window.localStorage.mapIndex == undefined || window.localStorage.playerX == undefined || window.localStorage.playerY == undefined || window.localStorage.buttonFlag == undefined) {
	                window.localStorage.mapIndex = 0;
	                window.localStorage.playerX = game.initPos[0].x;
	                window.localStorage.playerY = game.initPos[0].y;
	                window.localStorage.buttonFlag = 0;
	                window.localStorage.life = 3;
	                game.restart(0, game.initPos[0].x, game.initPos[0].y);
	            }
	            else {
	                game.restart(Number(window.localStorage.mapIndex), Number(window.localStorage.playerX), Number(window.localStorage.playerY));
	            }
	            //开始game
	            game.start();
	        }
	        else if (KeyState[Key.Up] && KeyState[Key.Down] || !KeyState[Key.Up] && !KeyState[Key.Down])
	                ;
	        else if (Me.newGame == 1 && KeyState[Key.Down]) {
	            Me.gc.drawImage(ImgCache["opening2"], 0, 0);
	            Me.newGame = 0;
	        }
	        else if (Me.newGame == 0 && KeyState[Key.Up]) {
	            Me.gc.drawImage(ImgCache["opening1"], 0, 0);
	            Me.newGame = 1;
	        }
	    }, Me.sleep);
	},

	restart : function(mapIndex, pX, pY , bF){
	    //将必要的精灵加入game的精灵列表里
	    var j;

	    //设置地图
	    this.mapIndex = mapIndex;

	    //加入玩家
	    this.player = createPlayer();
	    this.player.x = pX;
	    this.player.y = pY;

	    map0(0);
	    map1(1);
	    map2(2);
	    map3(3);

	    this.deaths = [];
	    for (var i = 0; i < 100; i++)
	        this.deaths.push(createBlood());
	    this.deaths.push(createHead());
	    this.deaths.push(createHandL());
	    this.deaths.push(createHandR());
	    this.deaths.push(createFootL());
	    this.deaths.push(createFootR());

	    this.player.init();
	    for (var j = 0; j < this.mapNum; j++)
	        for (var i = 0; i < this.sprites[j].length; i++) {
	            this.sprites[j][i].init();
	        }
	    for (var i = 0; i < this.deaths.length; i++) {
	        this.deaths[i].init();
	    }

	    document.getElementById("death").pause();
	    document.getElementById("death").currentTime = 0;
	    document.getElementById("bgsound4").play();
	},

	edge: function () {
	    if (warpEdge())
	        ;
	    else if (this.player.x >= this.width - 16 || this.player.x <= -16 || this.player.y >= this.height - 16 || this.player.y <= -16)
	    {
	        document.getElementById("bgsound4").pause();
	        document.getElementById("bgsound4").currentTime = 0;
	        document.getElementById("death").play();
	        for (var i = 0; i < this.deaths.length; i++)
	            this.deaths[i].initXY();
	        this.playerDied = true;
	        window.localStorage.life = (Number(window.localStorage.life) - 1);
	    }
	},

	initEvent : function(){
		//监听整个document的keydown,keyup事件, 为了保证能够监听到, 监听方式使用Capture
		
		document.addEventListener("keydown",function(evt){
			//按下某按键, 该键状态为true 
			KeyState[evt.keyCode]=true;
		},true);
		document.addEventListener("keyup",function(evt){
			//放开下某按键, 该键状态为true 
			KeyState[evt.keyCode]=false;
		},true);	
	},
		
	start : function(){
		var Me=this;
		//主循环
		this.mainLoop=setInterval(function(){	
			//距上一次执行相隔的时间.(时间变化量), 目前可近似看作sleep.
			var deltaTime=Me.sleep;
			Me.run(deltaTime);
		},Me.sleep);
	
	},
	
	//主循环中要执行的操作
	run: function (deltaTime) {
	    if (this.mapIndex == this.mapNum - 1 && this.win == 0) {
	        document.getElementById("bgsound4").pause();
	        document.getElementById("bgsound4").currentTime = 0;
	        document.getElementById("bgsound2").play();
	        this.win = 1;
	    }
	    if (this.playerDied == false)
	        this.edge();

	    if (this.playerDied == false) {
	        //碰撞检测
	        var coll = this.checkCollide();
	        if (coll) {
	            //如果发生敌人和玩家的碰撞,则结束游戏.
	            document.getElementById("bgsound4").pause();
	            document.getElementById("bgsound4").currentTime = 0;
	            document.getElementById("death").play();
	            for (var i = 0; i < this.deaths.length; i++)
	                this.deaths[i].initXY();
	            window.localStorage.life = (Number(window.localStorage.life) - 1);
	            this.playerDied = true;
	        }
	    }

	    this.recalculateBoundary(deltaTime);
	    this.update(deltaTime);
		this.clear(deltaTime);
		this.draw(deltaTime);

		//处理输入,当前输入,影响下一次迭代.
		this.handleInput(deltaTime);
        
		if (this.playerDied == true)
		{
		    this.mask();
		    for (var i = 0; i < this.deaths.length; i++)
		    {
		        var sprite = this.deaths[i];
		        if (sprite.stoped == false)
		        {
		            sprite.recalculateBoundary(deltaTime);
		            sprite.update(deltaTime);
		        }
		        sprite.draw(this.gc);
		        if (sprite.stoped == false)
		            sprite.handleInput(deltaTime);
		    }
		    this.gameover();
		}

		if (this.playerDied == false)
		    this.checkWarp();

		if (this.playerDied == true && KeyState[Key.R] == true) {
		    var a = 0, b = this.initPos[this.mapIndex].x, c = this.initPos[this.mapIndex].y;
		    if (window.localStorage.mapIndex != undefined)
		        a = Number(window.localStorage.mapIndex);
		    if (window.localStorage.playerX != undefined)
		        b = Number(window.localStorage.playerX);
		    if (window.localStorage.playerY != undefined)
		        c = Number(window.localStorage.playerY);
		    this.restart(a, b, c);
		    this.playerDied = false;
		}

	},

	//碰撞检测,返回true 则发生了主角和敌人的碰撞.
	checkCollide: function () {
	    for (var i = 0; i < this.sprites[this.mapIndex].length; i++) {
	        var sprite = this.sprites[this.mapIndex][i];
	        if (sprite.currentAnim === sprite.anims["damage"]) {
	            var coll = sprite.collideWidthOther(this.player);
	            if (coll)
	                return coll;
	        }
	        if (sprite.currentAnim === sprite.anims["saved"]) {
	            var coll = sprite.collideWidthOther(this.player);
	            if (coll == true)
	            {
	                window.localStorage.mapIndex = game.mapIndex;
	                window.localStorage.playerX = sprite.x + 16;
	                window.localStorage.playerY = sprite.y;
	            }
	        }
		}
		return false;
	},
	
	checkWarp : function ()
	{
	    for (var i = 0; i < this.sprites[this.mapIndex].length; i++) {
	        var sprite = this.sprites[this.mapIndex][i];
	        if (sprite.currentAnim === sprite.anims["next"]) {
	            var coll = sprite.collideWidthOther(this.player);
	            if (coll == true) {
	                if (this.mapIndex + 1 < this.mapNum) {
	                    this.restart(this.mapIndex + 1, this.initPos[this.mapIndex + 1].x, this.initPos[this.mapIndex + 1].y);
	                    return;
	                }
	            }
	        }
	    }
	},

	recalculateBoundary: function (deltaTime) {
	    if (this.playerDied == false)
	        this.player.recalculateBoundary(deltaTime);
	},

	update : function(deltaTime){
	    for (var i = 0; i < this.sprites[this.mapIndex].length; i++) {
			var sprite=this.sprites[this.mapIndex][i];
			sprite.update(deltaTime);
		}
		if (this.playerDied == false)
		    this.player.update(deltaTime);
	},

	clear : function(deltaTime){
	    //使用背景覆盖的方式 清空之前绘制的图片
	    if (this.playerDied == true)
	        this.gc.drawImage(ImgCache["bg_white"], 0, 0);
	    else
	        this.gc.drawImage(ImgCache["bg"], 0, 0);
	    if (this.mapIndex == 2)
	        puzzle(this.gc);
	},

	mask: function () {
	    this.gc.drawImage(ImgCache["blood_mask"], 0, 0);
	},

	gameover: function (){
	    this.gc.drawImage(ImgCache["GAMEOVER"], 0, 0);
	},
	
	draw : function(deltaTime){
	    for (var i = 0; i < this.sprites[this.mapIndex].length; i++) {
			var sprite=this.sprites[this.mapIndex][i];
			sprite.draw(this.gc);
		}
		if (this.playerDied == false)
		    this.player.draw(this.gc);
		this.gc.beginPath();
		this.gc.font = "bold 24px arial"
		if (Number(window.localStorage.life) > 0)
		    this.gc.fillStyle = '#0f0';
        else
		    this.gc.fillStyle = '#f00';
		this.gc.fillText('Life: ' + window.localStorage.life, 12, 22);
	},
	handleInput: function (deltaTime) {
	    if (this.playerDied == false && this.player.handleInput)
	        this.player.handleInput(deltaTime);
	    for (var i = 0; i < this.sprites[this.mapIndex].length; i++) {
			var sprite=this.sprites[this.mapIndex][i];
			if (sprite.handleInput){
			    sprite.handleInput(deltaTime);
			}
		}
	}
	
};