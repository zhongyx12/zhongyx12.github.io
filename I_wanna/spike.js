
function createSpikeUp(a, b){		
	var cfg = {
		img : "spikeUp",

		x : a,
		y : b,

		//x/y坐标的最大值和最小值, 可用来限定移动范围.
		minX : -32,
		maxX : 1000,
		minY : -32,
		maxY : 600,
		
		handleInput : null,

		defaultAnimId : "damage",		
		anims : {
			
		    "damage": new Animation({
					img : "spikeUp" ,
					frames : [
						{x : 0, y : 0, w : 32, h : 32, duration : 100 }
					]
				})
		},

		collideWidthOther: function (sprite2) {
		    return JudgeStabUp(this.x, this.y, sprite2.x, sprite2.y);
	    }
			
	};
	return new Sprite(cfg) ;
}

function createSpikeDown(a, b) {
    var cfg = {
        img: "spikeDown",

        x: a,
        y: b,

        //x/y坐标的最大值和最小值, 可用来限定移动范围.
        minX: -32,
        maxX: 1000,
        minY: -32,
        maxY: 600,

        handleInput: null,

        defaultAnimId: "damage",
        anims: {

            "damage": new Animation({
                img: "spikeDown",
                frames: [
                    { x: 0, y: 0, w: 32, h: 32, duration: 100 }
                ]
            })
        },

        collideWidthOther: function (sprite2) {
            return JudgeStabDown(this.x, this.y, sprite2.x, sprite2.y);
        }

    };
    return new Sprite(cfg);
}

function createSpikeLeft(a, b) {
    var cfg = {
        img: "spikeLeft",

        x: a,
        y: b,

        //x/y坐标的最大值和最小值, 可用来限定移动范围.
        minX: -32,
        maxX: 1000,
        minY: -32,
        maxY: 600,

        handleInput: null,

        defaultAnimId: "damage",
        anims: {

            "damage": new Animation({
                img: "spikeLeft",
                frames: [
                    { x: 0, y: 0, w: 32, h: 32, duration: 100 }
                ]
            })
        },

        collideWidthOther: function (sprite2) {
            return JudgeStabLeft(this.x, this.y, sprite2.x, sprite2.y);
        }

    };
    return new Sprite(cfg);
}

function createSpikeRight(a, b) {
    var cfg = {
        img: "spikeRight",

        x: a,
        y: b,

        //x/y坐标的最大值和最小值, 可用来限定移动范围.
        minX: -32,
        maxX: 1000,
        minY: -32,
        maxY: 600,

        handleInput: null,

        defaultAnimId: "damage",
        anims: {

            "damage": new Animation({
                img: "spikeRight",
                frames: [
                    { x: 0, y: 0, w: 32, h: 32, duration: 100 }
                ]
            })
        },

        collideWidthOther: function (sprite2) {
            return JudgeStabRight(this.x, this.y, sprite2.x, sprite2.y);
        }

    };
    return new Sprite(cfg);
}

function createCherry(a, b) {
    var cfg = {
        img: "Cherry",

        x: a,
        y: b,

        //x/y坐标的最大值和最小值, 可用来限定移动范围.
        minX: -32,
        maxX: 1000,
        minY: -32,
        maxY: 600,

        handleInput: null,

        defaultAnimId: "damage",
        anims: {
            "damage": new Animation({
                img: "cherry",
                frames: [
                    { x: 0, y: 0, w: 21, h: 24, duration: 500 },
                    { x: 21, y: 0, w: 21, h: 24, duration: 500 }
                ]
            }),
            "hidden": new Animation({
                img: "cherry",
                frames: [
                    { x: 42, y: 0, w: 21, h: 24, duration: 500 }
                ]
            })
        },

        collideWidthOther : function(sprite2){
            if (sprite2.x > this.x - 25 && sprite2.x < this.x + 14 && sprite2.y > this.y - 30 && sprite2.y < this.y + 15)
                return true;
        }

    };
    return new Sprite(cfg);
}

function createCloud(a, b) {
    var cfg = {
        img: "Cloud",

        x: a,
        y: b,

        //x/y坐标的最大值和最小值, 可用来限定移动范围.
        minX: -32,
        maxX: 1000,
        minY: -32,
        maxY: 600,

        handleInput: function () {
            if (this.collideWidthOther(game.player) && this.currentAnim === this.anims["normal"])
                this.setAnim("damage");
        },

        defaultAnimId: "normal",
        anims: {
            "normal": new Animation({
                img: "cloud",
                frames: [
                    { x: 0, y: 0, w: 72, h: 48, duration: 500 }
                ]
            }),
            "damage": new Animation({
                img: "cloud",
                frames: [
                    { x: 72, y: 0, w: 72, h: 48, duration: 500 }
                ]
            })
        },

        collideWidthOther: function (sprite2) {
            if (sprite2.x > this.x - 25 && sprite2.x < this.x + 64 && sprite2.y > this.y - 30 && sprite2.y < this.y + 37)
                return true;
        }

    };
    return new Sprite(cfg);
}