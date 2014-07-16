function createBlood(){
	var cfg = {
	    img: "blood",

        stoped: false,

	    x: 100,
        y: 100,

		//x/y坐标的最大值和最小值, 可用来限定移动范围.
		minX : -32,
		maxX : 1000,
		minY : -32,
		maxY : 600,

		defaultAnimId : "still",		
		anims : {
			
			"still" : new Animation({
					img : "blood" ,
					frames : [
						{x : 0, y : 0, w : 8, h : 8, duration : 100 }
					]
				})
		},

		handleInput: function () {
		    if (this.x == this.minX || this.y == this.minY || this.x == this.maxX || this.y == this.maxY)
		    {
		        this.speedX = 0;
		        this.speedY = 0;
		        this.acceY = 0;
		        this.stoped = true;
		    }
		},

		initXY: function () {
		        var s = genRandom(-30, 30);
		        var t = genRandom(-35, 35);
		        var moveSpeedX = (s * 20) / 1000;
		        var moveSpeedY = (t * 30) / 1000;
		        this.speedX = moveSpeedX;
		        this.speedY = moveSpeedY;
		        this.acceY = 0.3 / 1000;
		        this.x = game.player.x + 8
		        this.y = game.player.y + 8;
		},

	    //重新计算精灵的活动范围
		recalculateBoundary: BoundaryForDeaths,
		update: function (deltaTime) {
		    //每次循环,改变一下绘制的坐标. 
		    this.x = this.x + this.speedX * deltaTime; //水平方向匀速运动

		    //垂直方向竖直上抛	运动, 根据速度 加速度 时间 来计算位移,并确定新坐标.
		    //如果碰到了天花板
		    // 新的速度.
		    var newSpeedY = this.speedY + this.acceY * deltaTime;
		    this.y = Math.ceil(this.y + (this.speedY + newSpeedY) / 2 * deltaTime);
		    // 更新速度
		    this.speedY = newSpeedY;


		    //限定移动范围
		    this.x = Math.max(this.minX, Math.min(this.x, this.maxX));
		    this.y = Math.max(this.minY, Math.min(this.y, this.maxY));

		    if (this.currentAnim) {
		        this.currentAnim.update(deltaTime);
		    }
		}
	};
	return new Sprite(cfg) ;
}

function createHead() {

    var r = genRandom(0, 3);
    r = 16 * Math.floor(r);

    var cfg = {
        img: "head",

        stoped: false,
        hstoped: false,

        x: 100,
        y: 100,

        //x/y坐标的最大值和最小值, 可用来限定移动范围.
        minX: -32,
        maxX: 1000,
        minY: -32,
        maxY: 600,

        defaultAnimId: "still",
        anims: {

            "still": new Animation({
                img: "head",
                frames: [
                    { x: r, y: 0, w: 16, h: 16, duration: 100 }
                ]
            })
        },

        handleInput: function () {
            if (this.y == this.minY)
                this.speedY = 0;
            if (this.y == this.maxY)
                this.stoped = true;
            if (this.x == this.minX || this.x == this.maxX)
                this.hstoped = true;
            if (this.stoped == true)
            {
                this.speedY = 0;
                this.acceY = 0;
            }
            if (this.hstoped == true)
                this.speedX = 0;
        },

        initXY: function () {
            var s = genRandom(-15, 15);
            var t = genRandom(-15, 2);
            var moveSpeedX = (s * 15) / 1000;
            var moveSpeedY = (-180 + t * 15) / 1000;
            this.speedX = moveSpeedX;
            this.speedY = moveSpeedY;
            this.acceY = 0.4 / 1000;
            this.x = game.player.x + 8;
            this.y = game.player.y + 8;
        },

        //重新计算精灵的活动范围
        recalculateBoundary: BoundaryForDeaths,
        update: function (deltaTime) {
            //每次循环,改变一下绘制的坐标. 
            this.x = this.x + this.speedX * deltaTime; //水平方向匀速运动

            //垂直方向竖直上抛	运动, 根据速度 加速度 时间 来计算位移,并确定新坐标.
            //如果碰到了天花板
            // 新的速度.
            var newSpeedY = this.speedY + this.acceY * deltaTime;
            this.y = Math.ceil(this.y + (this.speedY + newSpeedY) / 2 * deltaTime);
            // 更新速度
            this.speedY = newSpeedY;


            //限定移动范围
            this.x = Math.max(this.minX, Math.min(this.x, this.maxX));
            this.y = Math.max(this.minY, Math.min(this.y, this.maxY));

            if (this.currentAnim) {
                this.currentAnim.update(deltaTime);
            }
        }
    };
    return new Sprite(cfg);
}

function createHandL() {

    var cfg = {
        img: "handL",

        stoped: false,
        hstoped: false,

        x: 100,
        y: 100,

        //x/y坐标的最大值和最小值, 可用来限定移动范围.
        minX: -32,
        maxX: 1000,
        minY: -32,
        maxY: 600,

        defaultAnimId: "still",
        anims: {

            "still": new Animation({
                img: "handL",
                frames: [
                    { x: 0, y: 0, w: 8, h: 7, duration: 100 }
                ]
            })
        },

        handleInput: function () {
            if (this.y == this.minY)
                this.speedY = 0;
            if (this.y == this.maxY)
                this.stoped = true;
            if (this.x == this.minX || this.x == this.maxX)
                this.hstoped = true;
            if (this.stoped == true) {
                this.speedY = 0;
                this.acceY = 0;
            }
            if (this.hstoped == true)
                this.speedX = 0;
        },

        initXY: function () {
            var s = genRandom(-20, 20);
            var t = genRandom(-18, 2);
            var moveSpeedX = (s * 15) / 1000;
            var moveSpeedY = (-180 + t * 15) / 1000;
            this.speedX = moveSpeedX;
            this.speedY = moveSpeedY;
            this.acceY = 0.35 / 1000;
            this.x = game.player.x + 8;
            this.y = game.player.y + 8;
        },

        //重新计算精灵的活动范围
        recalculateBoundary: BoundaryForDeaths,
        update: function (deltaTime) {
            //每次循环,改变一下绘制的坐标. 
            this.x = this.x + this.speedX * deltaTime; //水平方向匀速运动

            //垂直方向竖直上抛	运动, 根据速度 加速度 时间 来计算位移,并确定新坐标.
            //如果碰到了天花板
            // 新的速度.
            var newSpeedY = this.speedY + this.acceY * deltaTime;
            this.y = Math.ceil(this.y + (this.speedY + newSpeedY) / 2 * deltaTime);
            // 更新速度
            this.speedY = newSpeedY;


            //限定移动范围
            this.x = Math.max(this.minX, Math.min(this.x, this.maxX));
            this.y = Math.max(this.minY, Math.min(this.y, this.maxY));

            if (this.currentAnim) {
                this.currentAnim.update(deltaTime);
            }
        }
    };
    return new Sprite(cfg);
}

function createHandR() {

    var cfg = {
        img: "handR",

        stoped: false,
        hstoped: false,

        x: 100,
        y: 100,

        //x/y坐标的最大值和最小值, 可用来限定移动范围.
        minX: -32,
        maxX: 1000,
        minY: -32,
        maxY: 600,

        defaultAnimId: "still",
        anims: {

            "still": new Animation({
                img: "handR",
                frames: [
                    { x: 0, y: 0, w: 8, h: 7, duration: 100 }
                ]
            })
        },

        handleInput: function () {
            if (this.y == this.minY)
                this.speedY = 0;
            if (this.y == this.maxY)
                this.stoped = true;
            if (this.x == this.minX || this.x == this.maxX)
                this.hstoped = true;
            if (this.stoped == true) {
                this.speedY = 0;
                this.acceY = 0;
            }
            if (this.hstoped == true)
                this.speedX = 0;
        },

        initXY: function () {
            var s = genRandom(-20, 20);
            var t = genRandom(-18, 2);
            var moveSpeedX = (s * 15) / 1000;
            var moveSpeedY = (-180 + t * 15) / 1000;
            this.speedX = moveSpeedX;
            this.speedY = moveSpeedY;
            this.acceY = 0.35 / 1000;
            this.x = game.player.x + 8;
            this.y = game.player.y + 8;
        },

        //重新计算精灵的活动范围
        recalculateBoundary: BoundaryForDeaths,
        update: function (deltaTime) {
            //每次循环,改变一下绘制的坐标. 
            this.x = this.x + this.speedX * deltaTime; //水平方向匀速运动

            //垂直方向竖直上抛	运动, 根据速度 加速度 时间 来计算位移,并确定新坐标.
            //如果碰到了天花板
            // 新的速度.
            var newSpeedY = this.speedY + this.acceY * deltaTime;
            this.y = Math.ceil(this.y + (this.speedY + newSpeedY) / 2 * deltaTime);
            // 更新速度
            this.speedY = newSpeedY;


            //限定移动范围
            this.x = Math.max(this.minX, Math.min(this.x, this.maxX));
            this.y = Math.max(this.minY, Math.min(this.y, this.maxY));

            if (this.currentAnim) {
                this.currentAnim.update(deltaTime);
            }
        }
    };
    return new Sprite(cfg);
}

function createFootL() {

    var cfg = {
        img: "footL",

        stoped: false,
        hstoped: false,

        x: 100,
        y: 100,

        //x/y坐标的最大值和最小值, 可用来限定移动范围.
        minX: -32,
        maxX: 1000,
        minY: -32,
        maxY: 600,

        defaultAnimId: "still",
        anims: {

            "still": new Animation({
                img: "footL",
                frames: [
                    { x: 0, y: 0, w: 4, h: 4, duration: 100 }
                ]
            })
        },

        handleInput: function () {
            if (this.y == this.minY)
                this.speedY = 0;
            if (this.y == this.maxY)
                this.stoped = true;
            if (this.x == this.minX || this.x == this.maxX)
                this.hstoped = true;
            if (this.stoped == true) {
                this.speedY = 0;
                this.acceY = 0;
            }
            if (this.hstoped == true)
                this.speedX = 0;
        },

        initXY: function () {
            var s = genRandom(-22, 22);
            var t = genRandom(-20, 2);
            var moveSpeedX = (s * 15) / 1000;
            var moveSpeedY = (-180 + t * 15) / 1000;
            this.speedX = moveSpeedX;
            this.speedY = moveSpeedY;
            this.acceY = 0.35 / 1000;
            this.x = game.player.x + 8;
            this.y = game.player.y + 8;
        },

        //重新计算精灵的活动范围
        recalculateBoundary: BoundaryForDeaths,
        update: function (deltaTime) {
            //每次循环,改变一下绘制的坐标. 
            this.x = this.x + this.speedX * deltaTime; //水平方向匀速运动

            //垂直方向竖直上抛	运动, 根据速度 加速度 时间 来计算位移,并确定新坐标.
            //如果碰到了天花板
            // 新的速度.
            var newSpeedY = this.speedY + this.acceY * deltaTime;
            this.y = Math.ceil(this.y + (this.speedY + newSpeedY) / 2 * deltaTime);
            // 更新速度
            this.speedY = newSpeedY;


            //限定移动范围
            this.x = Math.max(this.minX, Math.min(this.x, this.maxX));
            this.y = Math.max(this.minY, Math.min(this.y, this.maxY));

            if (this.currentAnim) {
                this.currentAnim.update(deltaTime);
            }
        }
    };
    return new Sprite(cfg);
}

function createFootR() {

    var cfg = {
        img: "footR",

        stoped: false,
        hstoped: false,

        x: 100,
        y: 100,

        //x/y坐标的最大值和最小值, 可用来限定移动范围.
        minX: -32,
        maxX: 1000,
        minY: -32,
        maxY: 600,

        defaultAnimId: "still",
        anims: {

            "still": new Animation({
                img: "footR",
                frames: [
                    { x: 0, y: 0, w: 4, h: 4, duration: 100 }
                ]
            })
        },

        handleInput: function () {
            if (this.y == this.minY)
                this.speedY = 0;
            if (this.y == this.maxY)
                this.stoped = true;
            if (this.x == this.minX || this.x == this.maxX)
                this.hstoped = true;
            if (this.stoped == true) {
                this.speedY = 0;
                this.acceY = 0;
            }
            if (this.hstoped == true)
                this.speedX = 0;
        },

        initXY: function () {
            var s = genRandom(-22, 22);
            var t = genRandom(-20, 2);
            var moveSpeedX = (s * 15) / 1000;
            var moveSpeedY = (-180 + t * 15) / 1000;
            this.speedX = moveSpeedX;
            this.speedY = moveSpeedY;
            this.acceY = 0.35 / 1000;
            this.x = game.player.x + 8;
            this.y = game.player.y + 8;
        },

        //重新计算精灵的活动范围
        recalculateBoundary: BoundaryForDeaths,
        update: function (deltaTime) {
            //每次循环,改变一下绘制的坐标. 
            this.x = this.x + this.speedX * deltaTime; //水平方向匀速运动

            //垂直方向竖直上抛	运动, 根据速度 加速度 时间 来计算位移,并确定新坐标.
            //如果碰到了天花板
            // 新的速度.
            var newSpeedY = this.speedY + this.acceY * deltaTime;
            this.y = Math.ceil(this.y + (this.speedY + newSpeedY) / 2 * deltaTime);
            // 更新速度
            this.speedY = newSpeedY;


            //限定移动范围
            this.x = Math.max(this.minX, Math.min(this.x, this.maxX));
            this.y = Math.max(this.minY, Math.min(this.y, this.maxY));

            if (this.currentAnim) {
                this.currentAnim.update(deltaTime);
            }
        }
    };
    return new Sprite(cfg);
}

function BoundaryForDeaths(deltaTime) {
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
        var fl = sprite.x, fr = sprite.x + frame.w, ft = sprite.y, fb = sprite.y + frame.h;
        //获得血块精灵的框架坐标
        var pl = this.x, pr = this.x + pframe.w, pt = this.y, pb = this.y + pframe.h;
        //计算血块即将的位移
        var dx = this.speedX * deltaTime;
        var dy = this.speedY * deltaTime + 0.5 * this.acceY * deltaTime * deltaTime;

        //判断，如果障碍物在血块的右方、左方、上方、下方
        if ((ft < pb && fb > pt) && fl >= pr)
            this.maxX = Math.min(this.maxX, fl - pframe.w);
        else if ((ft < pb && fb > pt) && fr <= pl)
            this.minX = Math.max(this.minX, fr);
        else if ((fl < pr && fr > pl) && fb <= pt)
            this.minY = Math.max(this.minY, fb);
        else if ((fl < pr && fr > pl) && ft >= pb)
            this.maxY = Math.min(this.maxY, ft - pframe.h);

        //判断，如果血块下一帧卡进了障碍物里，发生了bug，调整人物的活动范围
        if (!(ft > Math.ceil(pb + dy) || Math.ceil(pt + dy) > fb || pr + dx < fl || fr < pl + dx)) {
            var t, newy;
            //如果人是在左上、右上、左下、右下方穿进墙内，做出相应的精细判断
            if (pb <= ft && pr <= fl) {
                t = (fl - pr) / this.speedX;
                if (t < 0)
                    continue;
                newy = pb + this.speedY * t + 0.5 * this.acceY * t * t;
                if (newy < ft)
                    this.maxY = Math.min(this.maxY, ft - pframe.h);
                else
                    this.maxX = Math.min(this.maxX, fl - pframe.w);
            }
            else if (pb <= ft && pl >= fr) {
                t = (fr - pl) / this.speedX;
                if (t < 0)
                    continue;
                newy = pb + this.speedY * t + 0.5 * this.acceY * t * t;
                if (newy < ft)
                    this.maxY = Math.min(this.maxY, ft - pframe.h);
                else
                    this.minX = Math.max(this.minX, fr);
            }
            else if (pt >= fb && pr <= fl) {
                t = (fl - pr) / this.speedX;
                if (t < 0)
                    continue;
                newy = pt + this.speedY * t + 0.5 * this.acceY * t * t;
                if (newy > ft)
                    this.minY = Math.max(this.minY, fb);
                else
                    this.maxX = Math.min(this.maxX, fl - pframe.w);
            }
            else if (pt >= fb && pl >= fr) {
                t = (fr - pl) / this.speedX;
                if (t < 0)
                    continue;
                newy = pt + this.speedY * t + 0.5 * this.acceY * t * t;
                if (newy > ft)
                    this.minY = Math.max(this.minY, fb);
                else
                    this.minX = Math.max(this.minX, fr);
            }
        }
    }
}
