function createPlatform(a, b, c, d){
		
	var cfg = {
		img : "platform",

		x : a,
		y : b,

		//x/y坐标的最大值和最小值, 可用来限定移动范围.
		minX : -1000,
		maxX : 1000,
		minY : -600,
		maxY : 600,

		defaultAnimId : "static",		
		anims : {
			
			"static" : new Animation({
					img : "platform" ,
					frames : [
						{x : 0, y : 0, w : c, h : d, duration : 100 }
					]
				})
		}
			
	};
	return new Sprite(cfg) ;
}

function createPlatformWithNoGrass(a, b, c, d) {

    var cfg = {
        img: "platform",

        x: a,
        y: b,

        //x/y坐标的最大值和最小值, 可用来限定移动范围.
        minX: -1000,
        maxX: 1000,
        minY: -600,
        maxY: 600,

        defaultAnimId: "static",
        anims: {

            "static": new Animation({
                img: "platform",
                frames: [
                    { x: 32, y: 32, w: c, h: d, duration: 100 }
                ]
            })
        }

    };
    return new Sprite(cfg);
}


function createSave(a, b) {

    var cfg = {
        img: "Save",

        x: a,
        y: b,
        savetime: null,

        //x/y坐标的最大值和最小值, 可用来限定移动范围.
        minX: -1000,
        maxX: 1000,
        minY: -600,
        maxY: 600,

        defaultAnimId: "save",
        anims: {
            "save": new Animation({
                img: "Save",
                frames: [
                    { x: 0, y: 0, w: 32, h: 32, duration: 100 }
                ]
            }),
            "saved": new Animation({
                img: "Save",
                frames: [
                    { x: 32, y: 0, w: 32, h: 32, duration: 100 }
                ]
            })
        },

        handleInput : function () {
            if (game.playerDied == false && this.collideWidthOther(game.player))
            {
                this.setAnim("saved");
                this.savetime = new Date();
            } 
            else if (this.savetime && new Date - this.savetime >= 1000)
                this.setAnim("save");
        },

        collideWidthOther: function (sprite2) {
            if (sprite2.x >= this.x - 16 && sprite2.x <= this.x + 16 && sprite2.y >= this.y - 16 && sprite2.y <= this.y + 16)
                return true;
            else
                return false;
        }

    };
    return new Sprite(cfg);
}

function createWarp(a, b) {

    var cfg = {
        img: "Warp",

        x: a,
        y: b,
        savetime: null,

        //x/y坐标的最大值和最小值, 可用来限定移动范围.
        minX: -1000,
        maxX: 1000,
        minY: -600,
        maxY: 600,

        defaultAnimId: "next",
        anims: {
            "next": new Animation({
                img: "warp",
                frames: [
                    { x: 2, y: 2, w: 26, h: 26, duration: 100 }
                ]
            })
        },

        collideWidthOther: function (sprite2) {
            if (sprite2.x >= this.x - 25 && sprite2.x <= this.x + 19 && sprite2.y >= this.y - 31 && sprite2.y <= this.y + 17)
                return true;
            else
                return false;
        }

    };
    return new Sprite(cfg);
}

function createWin() {

    var cfg = {
        img: "win",

        x: 0,
        y: 0,

        //x/y坐标的最大值和最小值, 可用来限定移动范围.
        minX: -1000,
        maxX: 1000,
        minY: -600,
        maxY: 600,

        defaultAnimId: "win",
        anims: {
            "win": new Animation({
                img: "win",
                frames: [
                    { x: 0, y: 0, w: 1000, h: 600, duration: 100 }
                ]
            })
        },

        collideWidthOther: null

    };
    return new Sprite(cfg);
}

function createTree(a, b) {

    var cfg = {
        img: "tree",

        x: a,
        y: b,

        //x/y坐标的最大值和最小值, 可用来限定移动范围.
        minX: -1000,
        maxX: 1000,
        minY: -600,
        maxY: 600,

        defaultAnimId: "still",
        anims: {
            "still": new Animation({
                img: "tree",
                frames: [
                    { x: 0, y: 0, w: 111, h: 168, duration: 100 }
                ]
            })
        }

    };
    return new Sprite(cfg);
}

function createButton(a, b) {

    var cfg = {
        img: "button",

        x: a,
        y: b,

        //x/y坐标的最大值和最小值, 可用来限定移动范围.
        minX: -1000,
        maxX: 1000,
        minY: -600,
        maxY: 600,

        defaultAnimId: "still",
        anims: {
            "still": new Animation({
                img: "button",
                frames: [
                    { x: 0, y: 0, w: 32, h: 32, duration: 100 }
                ]
            })
        },

        handleInput: function () {
            if (window.localStorage.buttonFlag == "0" && this.collideWidthOther(game.player)) {
                window.localStorage.buttonFlag = 1;
            }
        },

        collideWidthOther: function (sprite2) {
            if (sprite2.x >= this.x - 16 && sprite2.x <= this.x + 16 && sprite2.y >= this.y - 16 && sprite2.y <= this.y + 16)
                return true;
            else
                return false;
        }

    };
    return new Sprite(cfg);
}