
function createPlayer(){
	
	var cfg = {
		
		//初始坐标
		x : 250,
		y : 100,
		
		//移动速度.
		speedX : 0,
		speedY : 0,
		acceY : 0,
		
		//x/y坐标的最大值和最小值, 可用来限定移动范围.
		minX : 0,
		maxX : 500,
		minY : 0,
		maxY : 320,
	
		// 定义走路速度的绝对值 
		walkSpeed : 146/1000,
		
		//定义跳跃初速度,垂直加速度
		jumpSpeed : -225/1000,
		acceY: 1.0 / 1000,
		
		//默认情况下向右站立.
		defaultAnimId : "stand-right",	
		
		flag : false,/*是否KeyUp过*/
		jumping : false,
		jumpingTwice : false,
		justjumped : false,
		
		//定义两个Animation,向左走 和 向右走.
		anims : {
			"stand-left" : new Animation({
					img : "player" ,
					frames : [
						{x : 96, y : 0, w : 32, h : 32, duration : 100},
						{x : 64, y : 0, w : 32, h : 32, duration : 100},
						{x : 32, y : 0, w : 32, h : 32, duration : 100},
						{x : 0, y : 0, w : 32, h : 32, duration : 100}
					]
				} ),
			"stand-right" : new Animation({
					img : "player" ,
					frames : [
						{x : 0, y : 32, w : 32, h : 32, duration : 100},
						{x : 32, y : 32, w : 32, h : 32, duration : 100},
						{x : 64, y : 32, w : 32, h : 32, duration : 100},
						{x : 96, y : 32, w : 32, h : 32, duration : 100}
					]
				} )	,
			"walk-left" : new Animation({
					img : "player" ,
					frames : [
						{x : 96, y : 64, w : 32, h : 32, duration : 100},
						{x : 64, y : 64, w : 32, h : 32, duration : 100},
						{x : 32, y : 64, w : 32, h : 32, duration : 100},
						{x : 0, y : 64, w : 32, h : 32, duration : 100}
					]
				} ),
			"walk-right" : new Animation({
					img : "player" ,
					frames : [
						{x : 0, y : 96, w : 32, h : 32, duration : 100},
						{x : 32, y : 96, w : 32, h : 32, duration : 100},
						{x : 64, y : 96, w : 32, h : 32, duration : 100},
						{x : 96, y : 96, w : 32, h : 32, duration : 100}
					]
				} ),
			"jump-left": new Animation({
			    img: "player",
			    frames: [
                    { x: 32, y: 128, w: 32, h: 32, duration: 100 },
                    { x: 0, y: 128, w: 32, h: 32, duration: 100 }
			    ]
			    } ),
			"jump-right": new Animation({
			    img: "player",
			    frames: [
                    { x: 64, y: 128, w: 32, h: 32, duration: 100 },
                    { x: 96, y: 128, w: 32, h: 32, duration: 100 }
			    ]
			    } ),
			"fall-left": new Animation({
			    img: "player",
			    frames: [
                    { x: 32, y: 160, w: 32, h: 32, duration: 100 },
                    { x: 0, y: 160, w: 32, h: 32, duration: 100 }
			    ]
			    } ),
			"fall-right": new Animation({
			    img: "player",
			    frames: [
                    { x: 64, y: 160, w: 32, h: 32, duration: 100 },
                    { x: 96, y: 160, w: 32, h: 32, duration: 100 }
			    ]
			    } )
		},
		
		inTheSky : function(deltaTime){
			var left= KeyState[Key.Left];
			var right= KeyState[Key.Right];
			var up = KeyState[Key.Shift];
			
			//取得人物当前面对的方向
			var dirX=this.currentAnim.id.split("-")[1];
			
			if (this.jumping && this.speedY < 0)
				{//一段跳上升的过程中
			    	if (left && right || !left && !right)
			        	this.speedX = 0;
			    	else if (left) 
					{
                    	if (dirX == "right")
			            	this.setAnim("jump-left");
			        	this.speedX = -this.walkSpeed;
			    	}
			    	else if (right) 
					{
                    	if (dirX == "left")
			            	this.setAnim("jump-right");
			        	this.speedX = this.walkSpeed;
			    	}
				}
				else if (this.jumping && this.speedY >= 0 && this.speedY - this.acceY * deltaTime < 0)
				{//一段跳的下降过程中，且是刚转为下降状态的瞬间
			    	this.setAnim("fall-" + dirX);
			    	if (left && right || !left && !right)
			        	;
			    	else if (left && this.speedX != -this.walkSpeed) 
					{
			        	this.setAnim("fall-left");
			        	this.speedX = -this.walkSpeed;
			    	}
			    	else if (right && this.speedX != this.walkSpeed) 
					{
			        	this.setAnim("fall-right");
			        	this.speedX = this.walkSpeed;
			    	}
				}
				else if (this.jumping && this.speedY >= 0) 
				{//一段跳的下降过程中
			    	if (left && right || !left && !right)
			        	this.speedX = 0;
			    	else if (left) 
					{
			        	if (dirX == "right")
			            	this.setAnim("fall-left");
			        	this.speedX = -this.walkSpeed;
			    	}
			    	else if (right) 
					{
			        	if (dirX == "left")
			            	this.setAnim("fall-right");
			        	this.speedX = this.walkSpeed;
			    	}
				}
		},

	    //重新计算精灵的活动范围
		recalculateBoundary: function (deltaTime) {
		    //初始化最大的活动范围
		    this.maxX = 1000;
		    this.minX = -32;
		    this.maxY = 600;
		    this.minY = -32;

		    //遍历所有障碍物类型的精灵，进行活动范围的计算
		    for (var i = 0; i < game.sprites[game.mapIndex].length; i++) {
		        var sprite = game.sprites[game.mapIndex][i];
		        //判断是不是障碍物类型的精灵
		        if (!(sprite.currentAnim === sprite.anims["static"]))
		            continue;

		        var frame = sprite.currentAnim.currentFrame;
		        var pframe = this.currentAnim.currentFrame;
		        //获取障碍物精灵的框架坐标
		        var fl = sprite.x, fr = sprite.x + frame.w - 1, ft = sprite.y, fb = sprite.y + frame.h - 1;
		        //获得人物精灵的框架坐标
		        var pl = this.x + 6, pr = this.x + pframe.w - 7, pt = this.y + 9, pb = this.y + pframe.h - 1;
		        //计算人物即将的位移
		        var dx = this.speedX * deltaTime;
		        var dy = this.speedY * deltaTime + 0.5 * this.acceY * deltaTime * deltaTime;

		        //判断，如果障碍物在人物的右方、左方、上方、下方
		        if ((ft < pb && fb > pt) && fl >= pr)
		            this.maxX = Math.min(this.maxX, fl - pframe.w + 7);
		        else if ((ft < pb && fb > pt) && fr <= pl)
		            this.minX = Math.max(this.minX, fr - 6);
		        else if ((fl < pr && fr > pl) && fb <= pt)
		            this.minY = Math.max(this.minY, fb - 9);
		        else if ((fl < pr && fr > pl) && ft >= pb)
		            this.maxY = Math.min(this.maxY, ft - pframe.h);

		        //判断，如果人物下一帧卡进了障碍物里，发生了bug，调整人物的活动范围
		        if (!(ft > Math.ceil(pb + dy) || Math.ceil(pt + dy) > fb || pr + dx < fl || fr < pl + dx)) {
		            var t, newy;
		            //如果人是在左上、右上、左下、右下方穿进墙内，做出相应的精细判断
		            if (pb <= ft && pr <= fl) {
		                t = (fl - pr) / this.speedX;
		                if (t <= 0)
		                    continue;
		                newy = pb + this.speedY * t + 0.5 * this.acceY * t * t;
		                if (newy < ft)
		                    this.maxY = Math.min(this.maxY, ft - pframe.h);
		                else
		                    this.maxX = Math.min(this.maxX, fl - pframe.w + 7);
		            }
		            else if (pb <= ft && pl >= fr) {
		                t = (fr - pl) / this.speedX;
		                if (t <= 0)
		                    continue;
		                newy = pb + this.speedY * t + 0.5 * this.acceY * t * t;
		                if (newy < ft)
		                    this.maxY = Math.min(this.maxY, ft - pframe.h);
		                else
		                    this.minX = Math.max(this.minX, fr - 6);
		            }
		            else if (pt >= fb && pr <= fl) {
		                t = (fl - pr) / this.speedX;
		                if (t <= 0)
		                    continue;
		                newy = pt + this.speedY * t + 0.5 * this.acceY * t * t;
		                if (newy > ft)
		                    this.minY = Math.max(this.minY, fb - 9);
		                else
		                    this.maxX = Math.min(this.maxX, fl - pframe.w + 7);
		            }
		            else if (pt >= fb && pl >= fr) {
		                t = (fr - pl) / this.speedX;
		                if (t <= 0)
		                    continue;
		                newy = pt + this.speedY * t + 0.5 * this.acceY * t * t;
		                if (newy > ft)
		                    this.minY = Math.max(this.minY, fb - 9);
		                else
		                    this.minX = Math.max(this.minX, fr - 6);
		            }
		        }
		    }
		},
			
		handleInput: function (deltaTime) {
			// 读取按键状态, 如果A键为按下状态,则向左移动,如果D键为按下状态,则向右移动.
			var left= KeyState[Key.Left];
			var right= KeyState[Key.Right];
			var up = KeyState[Key.Shift];
			
			//取得人物当前面对的方向
			var dirX=this.currentAnim.id.split("-")[1];
	
	
			// 判断是否落地
			if (this.y == this.maxY) {
			    this.jumping = false;
			    this.jumpingTwice = false;/*二段跳*/
			    this.flag = false;	/*初始化*/
			    this.speedY = 0;
			}
		
			if (this.y < this.maxY && (this.currentAnim.id.split("-")[0] == "stand" || this.currentAnim.id.split("-")[0] == "walk"))
			{
			    this.jumping = true;
			    this.justjumped = true;
			    this.flag = false;
			    this.speedY = 0;
			    this.setAnim("fall-" + dirX);
			}
			else if (this.y == this.minY) {
			    this.speedY = 0;
			    this.inTheSky(deltaTime);
			    game.pressUpKeyTime = 300;
			}
			else if (!((this.jumping && this.jumpingTwice && game.pressUpKeyTime >= 300) || this.flag)) {

			    if (up && !this.jumping && !this.jumpingTwice && game.pressUpKeyTime < 300) {//按了上箭头，还没跳，一段跳的起始
			        document.getElementById("jump").play();
			        this.jumping = true;
			        this.justjumped = true;
			        this.flag = false;
			        this.speedY = this.jumpSpeed;
			        
			        this.setAnim("jump-" + dirX);
			        if (left && right || !left && !right)
			            ;
			        else if (left && this.speedX != -this.walkSpeed) {
			            this.setAnim("jump-left");
			            this.speedX = -this.walkSpeed;
			        }
			        else if (right && this.speedX != this.walkSpeed) {
			            this.setAnim("jump-right");
			            this.speedX = this.walkSpeed;
			        }
			        game.pressUpKeyTime += game.sleep;
			    }
			    else if (up && this.jumping && !this.jumpingTwice && game.pressUpKeyTime < 300 && game.pressUpKeyTime != 0) {//还没到单次跳跃的最大临界响应时间，所以这处于一段跳的上升阶段
			        this.speedY = this.jumpSpeed;
			        if (left && right || !left && !right)
			            this.speedX = 0;
			        else if (left && this.speedX != -this.walkSpeed) {
			            if (dirX == "right")
			                this.setAnim("jump-left");
			            this.speedX = -this.walkSpeed;
			        }
			        else if (right && this.speedX != this.walkSpeed) {
			            if (dirX == "left")
			                this.setAnim("jump-right");
			            this.speedX = this.walkSpeed;
			        }
			        game.pressUpKeyTime += game.sleep;
			    }
			    else if (up && this.jumping && !this.jumpingTwice && game.pressUpKeyTime >= 300) {//在单次跳跃中向上按钮长时间按住不放超过了设置的最大值,因此这里包括一段跳的部分上升阶段,可能还有下降阶段
			        this.inTheSky(deltaTime);
			    }
			    else if (up && this.jumping && !this.jumpingTwice && game.pressUpKeyTime == 0) {//一段跳刚刚完毕，二段跳刚刚开始的时刻
			        document.getElementById("dbjump").play();
			        this.speedY = this.jumpSpeed;
			        this.jumpingTwice = true;
			        
			        this.setAnim("jump-" + dirX);
			        if (left && right || !left && !right)
			            ;
			        else if (left && this.speedX != -this.walkSpeed) {
			            this.setAnim("jump-left");
			            this.speedX = -this.walkSpeed;
			        }
			        else if (right && this.speedX != this.walkSpeed) {
			            this.setAnim("jump-right");
			            this.speedX = this.walkSpeed;
			        }
			        game.pressUpKeyTime += game.sleep;
			    }
			    else if (up && this.jumping && this.jumpingTwice && game.pressUpKeyTime < 300) {//二段跳的向上已经按了且按的时间还未超过临界时间，因此这一定是二段跳的上升阶段
			        this.speedY = this.jumpSpeed;
			        
			        if (left && right || !left && !right)
			            this.speedX = 0;
			        else if (left && this.speedX != -this.walkSpeed) {
			            if (dirX == "right")
			                this.setAnim("jump-left");
			            this.speedX = -this.walkSpeed;
			        }
			        else if (right && this.speedX != this.walkSpeed) {
			            if (dirX == "left")
			                this.setAnim("jump-right");
			            this.speedX = this.walkSpeed;
			        }
			        game.pressUpKeyTime += game.sleep;
			    }
			    else if (up && this.jumping && this.jumpingTwice && game.pressUpKeyTime >= 300) {//在二段跳中向上按钮长时间按住不放超过了设置的最大值,因此这里包括一段跳的部分上升阶段,可能还有下降阶段
			        this.inTheSky(deltaTime);
			    }
			    else if (!up) {
			        if (this.jumpingTwice)
			            this.flag = true;
			        game.pressUpKeyTime = 0;
			        this.inTheSky(deltaTime);
			    }
			}
			else
			    this.inTheSky(deltaTime);
			
			    if (left && right || !left && !right)
			    {
				    // 如果左右都没有按或者都按了, 那么水平方向速度为0,不移动.
				    this.speedX=0;
				
				    //如果不是在跳跃中,那么进入站立状态,	站立时面对的方向根据之前的速度来决定.			
				    if (!this.jumping && this.currentAnim.id.split("-")[0] != "stand")
				    {
					    this.setAnim("stand-"+dirX);
				    }
				
			    }
			    else if(left && (this.speedX != -this.walkSpeed || this.justjumped == true))
			    {
				    //如果按下了左 且当前不是向左走,则设置为向左走
				    if (!this.jumping)
					    this.setAnim("walk-left");
				    if (!this.jumping)
					    this.justjumped = false;
				    this.speedX = -this.walkSpeed;
			    }
			    else if(right && (this.speedX != this.walkSpeed || this.justjumped == true))
			    {
				    //如果按下了右 且当前不是向右走,则设置为向右走
				    if (!this.jumping)
					    this.setAnim("walk-right");
				    if (!this.jumping)
					    this.justjumped = false;
				    this.speedX = this.walkSpeed;
			    }
		    }
	    };

	    return new Sprite(cfg);
}
