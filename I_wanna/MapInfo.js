function mapPos()
{
    game.initPos = [];
    game.initPos[0] = { x: 20, y: 500 };
    game.initPos[1] = { x: 20, y: 500 };
    game.initPos[2] = { x: 20, y: 430 };
    game.initPos[3] = { x: 484, y: 284 };
}

function warpEdge()
{
    var x = game.player.x;
    var y = game.player.y;
    if (!(x >= game.width - 16 || x <= -16 || y >= game.height - 16 || y <= -16))
        return;
    if (game.mapIndex == 0)
    {
        if (y >= 370 && y <= 410 && x >= game.width - 16)
        {
            game.player.speedX = 0;
            return true;
        }   
        else if (y > 410 && y <= 570 && x >= game.width - 16)
        {
            game.restart(1, -10, y);
            return true;
        }  
    }
    if (game.mapIndex == 1) {
        if (y > 395 && y <= 570 && x <= -16) {
            game.restart(0, 980, y);
            return true;
        }
        else if (y > 260 && y <= 345 && x >= game.width - 16)
        {
            game.restart(2, -10, y - 345 + 470 > 400 ? y - 345 + 470 : 400);
            return true;
        }
    }
    if (game.mapIndex == 2) {
        if (y > 385 && y <= 470 && x <= -16) {
            game.restart(1, 980, y - 470 + 345);
            return true;
        }
        /*else if (y > 260 && y <= 345 && x >= game.width - 16) {
            game.restart(2, -10, y - 345 + 470);
            return true;
        }*/
    }
    return false;
}

function map0(index) {
    game.sprites[index] = [];
    game.sprites[index].push(createPlatform(0, 540, 100, 60));
    game.sprites[index].push(createPlatform(100, 470, 30, 130));
    game.sprites[index].push(createPlatform(130, 500, 100, 100));
    game.sprites[index].push(createPlatform(230, 470, 100, 130));
    game.sprites[index].push(createPlatform(330, 440, 30, 160));
    game.sprites[index].push(createPlatform(360, 375, 30, 225));
    game.sprites[index].push(createPlatform(0, 55, 30, 415));
    game.sprites[index].push(createPlatform(30, 275, 35, 130));
    game.sprites[index].push(createPlatform(65, 340, 225, 65));
    game.sprites[index].push(createPlatform(100, 195, 30, 30));
    game.sprites[index].push(createPlatform(130, 160, 35, 65));
    game.sprites[index].push(createPlatform(165, 195, 65, 30));
    game.sprites[index].push(createPlatform(230, 160, 35, 65));
    game.sprites[index].push(createPlatform(330, 210, 35, 90));
    game.sprites[index].push(createPlatform(365, 270, 65, 30));
    game.sprites[index].push(createPlatform(460, 150, 30, 450));
    game.sprites[index].push(createPlatform(425, 210, 35, 35));
    game.sprites[index].push(createPlatform(490, 535, 30, 65));
    game.sprites[index].push(createPlatform(520, 570, 160, 30));
    game.sprites[index].push(createPlatform(680, 410, 35, 190));
    game.sprites[index].push(createPlatform(715, 445, 35, 160));
    game.sprites[index].push(createPlatform(750, 570, 250, 30));
    game.sprites[index].push(createPlatform(550, 445, 30, 60));
    game.sprites[index].push(createPlatform(580, 410, 30, 130));
    game.sprites[index].push(createPlatform(550, 280, 30, 65));
    game.sprites[index].push(createPlatform(580, 310, 30, 65));
    game.sprites[index].push(createPlatform(610, 345, 65, 30));
    game.sprites[index].push(createPlatform(970, 55, 30, 320));
    game.sprites[index].push(createPlatform(675, 310, 105, 65));
    game.sprites[index].push(createPlatform(780, 310, 30, 170));
    game.sprites[index].push(createPlatform(810, 310, 160, 65));
    game.sprites[index].push(createPlatform(490, 150, 160, 65));
    game.sprites[index].push(createPlatform(650, 150, 30, 95));
    game.sprites[index].push(createPlatform(680, 185, 130, 60));
    game.sprites[index].push(createPlatform(810, 215, 130, 30));
   
    game.sprites[index].push(createSpikeUp(165, 468));
    game.sprites[index].push(createSpikeUp(175, 308));//突然上升的刺
    game.sprites[index][game.sprites[index].length - 1].handleInput = function (deltaTime) {
        if (game.player.y >= 220 && game.player.y <= 320 && game.player.x >= 155 && game.player.x <= 190) {
            this.minY = -50;
            this.speedY = -400 / 1000;
        }
    };
    game.sprites[index].push(createSpikeUp(238, 308));
    game.sprites[index].push(createSpikeUp(112, 308));//突然右移的刺
    game.sprites[index][game.sprites[index].length - 1].handleInput = function (deltaTime) {
        if (game.player.y >= 220 && game.player.y <= 340 && game.player.x >= 120 && game.player.x <= 170) {
            this.maxX = 170;
            this.speedX = 400 / 1000;
        }
    };
    game.sprites[index].push(createSpikeUp(98, 163));//突然上移的刺
    game.sprites[index][game.sprites[index].length - 1].handleInput = function (deltaTime) {
        if (game.player.y >= -50 && game.player.y <= 210 && game.player.x >= 75 && game.player.x <= 125) {
            this.minY = -50;
            this.speedY = -400 / 1000;
        }
    };
    game.sprites[index].push(createSpikeUp(131, 128));
    game.sprites[index].push(createSpikeUp(331, 178));
    game.sprites[index].push(createSpikeUp(426, 178));
    game.sprites[index].push(createSpikeUp(467, 118));
    game.sprites[index].push(createSpikeUp(616, 118));
    game.sprites[index].push(createSpikeUp(648, 118));
    game.sprites[index].push(createSpikeUp(680, 153));
    game.sprites[index].push(createSpikeUp(712, 153));
    game.sprites[index].push(createSpikeLeft(428, 340));
    game.sprites[index].push(createSpikeRight(810, 183));
    game.sprites[index].push(createSpikeUp(876, 183));
    game.sprites[index].push(createSpikeUp(908, 278));
    game.sprites[index].push(createSpikeUp(610, 313));
    game.sprites[index].push(createSpikeUp(642, 313));
    game.sprites[index].push(createSpikeUp(578, 278));
    game.sprites[index].push(createSpikeUp(549, 248));
    game.sprites[index].push(createSpikeDown(626, 375));
    game.sprites[index].push(createSpikeUp(750, 538));//突然右移的刺2
    game.sprites[index][game.sprites[index].length - 1].handleInput = function (deltaTime) {
        if (game.player.y >= 480 && game.player.y <= 540 && game.player.x >= 730 && game.player.x <= 785) {
            this.maxX = 780;
            this.speedX = 400 / 1000;
        }
    };
    game.sprites[index].push(createSpikeUp(840, 538));
    game.sprites[index].push(createSpikeUp(872, 538));
    game.sprites[index].push(createSpikeRight(810, 448));//会突然右移的刺组
    game.sprites[index][game.sprites[index].length - 1].handleInput = function (deltaTime) {
        if (game.player.y >= 440 && game.player.y <= 470 && game.player.x >= 810 && game.player.x <= 900) {
            this.maxX = 1050;
            this.speedX = 600 / 1000;
        }
    };
    game.sprites[index].push(createSpikeRight(810, 416));//会突然右移的刺组
    game.sprites[index][game.sprites[index].length - 1].handleInput = function (deltaTime) {
        if (game.player.y >= 440 && game.player.y <= 470 && game.player.x >= 810 && game.player.x <= 900) {
            this.maxX = 1050;
            this.speedX = 600 / 1000;
        }
    };
    game.sprites[index].push(createSpikeDown(930, 375));//会突然下降的刺
    game.sprites[index][game.sprites[index].length - 1].handleInput = function (deltaTime) {
        if (game.player.y >= 380 && game.player.y <= 570 && game.player.x >= 915 && game.player.x <= 945) {
            this.maxY = 1050;
            this.speedY = 700 / 1000;
        }
    };
    game.sprites[index].push(createSpikeUp(614, 538));
    game.sprites[index].push(createSpikeUp(648, 538));
    game.sprites[index].push(createSpikeLeft(938, 155));
    game.sprites[index].push(createSpikeUp(0, 23));
    game.sprites[index].push(createSpikeUp(968, 23));
    game.sprites[index].push(createSpikeLeft(518, 461));
    game.sprites[index].push(createSpikeRight(490, 300));

    game.sprites[index].push(createSave(360, 320));
    game.sprites[index].push(createSave(550, 100));
    game.sprites[index].push(createSave(750, 250));
    game.sprites[index].push(createSave(795, 530));

    //会突然出现并上升的苹果
    game.sprites[index].push(createCherry(340, 425));
    game.sprites[index][game.sprites[index].length - 1].defaultAnimId = "hidden";
    game.sprites[index][game.sprites[index].length - 1].handleInput = function (deltaTime) {
        if (game.player.y >= 280 && game.player.y <= 440 && game.player.x >= 320 && game.player.x <= 350 && this.currentAnim === this.anims["hidden"]) {
            this.setAnim("damage");
            this.minY = -50;
            this.speedY = -600 / 1000;
        }
    };
    //坑爹的暴漫云
    game.sprites[index].push(createCloud(820, 85));
    //突然出现的刺
    game.sprites[index][0].handleInput = function (deltaTime) {
        if (game.player.y >= 385 && game.player.y <= 500 && game.player.x >= 148 && game.player.x <= 166) {
            var t = createSpikeDown(165, 405);
            game.sprites[game.mapIndex].push(t);
            t.init();
        }
    };
    //突然出现的平台
    game.sprites[index][1].handleInput = function (deltaTime) {
        if (game.player.y >= 225 && game.player.y <= 265 && game.player.x >= 345 && game.player.x <= 425) {
            var t = createPlatform(364, 210, 61, 35);
            game.sprites[game.mapIndex].push(t);
            t.init();
        }
    };
}


function map1(index) {
    var j = 0;
    var temp = 0;
    game.sprites[index] = [];
    game.sprites[index][j++] = createTree(570, 432);
    game.sprites[index][j++] = createPlatform(0, 570, 550, 30);
    game.sprites[index][j++] = createPlatform(550, 570, 150, 30);//会下陷的平台
    game.sprites[index][game.sprites[index].length - 1].handleInput = function (deltaTime) {
        if (game.player.y >= 538 && game.player.y <= 550 && game.player.x >= 550 && game.player.x <= 655) {
            this.maxY = 1050;
            this.speedY = 500 / 1000;
        }
    };
    game.sprites[index][j++] = createPlatform(700, 570, 200, 30);
    game.sprites[index][j++] = createPlatform(900, 535, 70, 65);
    game.sprites[index][j++] = createPlatform(970, 345, 30, 255);
    game.sprites[index][j++] = createPlatform(840, 345, 130, 30);
    game.sprites[index][j++] = createPlatform(840, 410, 95, 30);
    game.sprites[index][j++] = createPlatform(0, 90, 30, 320);
    game.sprites[index][j++] = createPlatform(30, 345, 35, 160);
    game.sprites[index][j++] = createPlatform(65, 345, 30, 100);
    game.sprites[index][j++] = createPlatform(95, 345, 35, 35);
    game.sprites[index][j++] = createPlatform(130, 315, 35, 65);
    game.sprites[index][j++] = createPlatform(95, 480, 35, 35);
    game.sprites[index][j++] = createPlatform(130, 415, 35, 100);
    game.sprites[index][j++] = createPlatform(165, 415, 35, 35);
    game.sprites[index][j++] = createPlatform(200, 345, 320, 30);
    game.sprites[index][j++] = createPlatform(520, 315, 40, 60);
    game.sprites[index][j++] = createPlatform(135, 235, 65, 30);

    game.sprites[index][j++] = createPlatform(560, 315, 100, 60);//会突然消失不见的平台,消失条件是人在上面且x在590到640之间
    temp = j - 1;
    game.sprites[index][temp].handleInput = function (deltaTime) {
        var i = 0;
        if (game.player.x >= 580 && game.player.x <= 640 && game.player.y == 283) {
            for (i = 0; i < game.sprites[game.mapIndex].length; i++)
                if (game.sprites[game.mapIndex][i] == this) {
                    break;
                }
            var t = createSpikeLeft(628, 330);
            game.sprites[game.mapIndex][i] = t;
            t.init();
        }
    }

    game.sprites[index][j++] = createPlatform(660, 315, 50, 60);
    game.sprites[index][j++] = createPlatform(710, 285, 60, 60);

    game.sprites[index][j++] = createPlatform(770, 255, 30, 60);//会突然出现刺
    temp = j - 1;
    game.sprites[index][temp].handleInput = function (deltaTime) {
        if (game.player.x >= 700 && game.player.x <= 745 && game.player.y <= 223) {
            var t = createSpikeUp(725, 253);
            game.sprites[game.mapIndex].push(t);
            t.init();
        }
    }

    game.sprites[index][j++] = createPlatform(800, 225, 30, 60);
    game.sprites[index][j++] = createPlatform(830, 225, 60, 30);
    game.sprites[index][j++] = createPlatform(970, 90, 30, 195);
    

    game.sprites[index][j++] = createSpikeUp(0, 58);
    game.sprites[index][j++] = createSpikeUp(968, 58);
    game.sprites[index][j++] = createSpikeUp(31, 314);
    game.sprites[index][j++] = createSpikeUp(63, 314);
    game.sprites[index][j++] = createSpikeUp(95, 314);

    game.sprites[index][j++] = createSpikeUp(290, 313);//会来回跑的刺1
    temp = j - 1;
    game.sprites[index][temp].minX = 200;
    game.sprites[index][temp].maxX = 488;
    game.sprites[index][temp].speedX = 400 / 1000;
    game.sprites[index][temp].handleInput = function (deltaTime) {
        if (this.x == this.maxX || this.x == this.minX) {
            this.speedX =-this.speedX;
        }
    }

    game.sprites[index][j++] = createSpikeUp(350, 313);//会来回跑的刺2
    temp = j - 1;
    game.sprites[index][temp].minX = 200;
    game.sprites[index][temp].maxX = 488;
    game.sprites[index][temp].speedX = 430 / 1000;
    game.sprites[index][temp].handleInput = function (deltaTime) {
        if (this.x == this.maxX || this.x == this.minX) {
            this.speedX = -this.speedX;
        }
    }

    //会突然下降的一排刺
    game.sprites[index][j++] = createSpikeDown(200, 375);
    game.sprites[index][game.sprites[index].length - 1].handleInput = function (deltaTime) {
        if (game.player.y >= 400 && game.player.y <= 570 && game.player.x >= 190 && game.player.x <= 210) {
            this.maxY = 1050;
            this.speedY = 900 / 1000;
        }
    };
    game.sprites[index][j++] = createSpikeDown(232, 375);
    game.sprites[index][game.sprites[index].length - 1].handleInput = function (deltaTime) {
        if (game.player.y >= 400 && game.player.y <= 570 && game.player.x >= 222 && game.player.x <= 242) {
            this.maxY = 1050;
            this.speedY = 900 / 1000;
        }
    };
    game.sprites[index][j++] = createSpikeDown(264, 375);
    game.sprites[index][game.sprites[index].length - 1].handleInput = function (deltaTime) {
        if (game.player.y >= 400 && game.player.y <= 570 && game.player.x >= 254 && game.player.x <= 274) {
            this.maxY = 1050;
            this.speedY = 900 / 1000;
        }
    };
    game.sprites[index][j++] = createSpikeDown(296, 375);
    game.sprites[index][game.sprites[index].length - 1].handleInput = function (deltaTime) {
        if (game.player.y >= 400 && game.player.y <= 570 && game.player.x >= 286 && game.player.x <= 308) {
            this.maxY = 1050;
            this.minX = -50;
            this.speedY = 900 / 1000;
            this.speedX = -100 / 1000;
        }
    };
    game.sprites[index][j++] = createSpikeDown(328, 375);
    game.sprites[index][j++] = createSpikeDown(360, 375);


    game.sprites[index][j++] = createSpikeDown(840, 440);//玩家经过会掉的刺
    temp = j - 1;
    game.sprites[index][temp].handleInput = function (deltaTime) {
        if (game.player.x - 845 >= -20 && game.player.y >= 475)
            this.acceY = 5.0 / 1000;
    }

    game.sprites[index][j++] = createSpikeRight(165, 483);
    game.sprites[index][j++] = createSpikeDown(858, 255);
    game.sprites[index][j++] = createSpikeDown(830, 255);
    game.sprites[index][j++] = createSpikeUp(880, 313);
    game.sprites[index][j++] = createSpikeUp(800, 193);
    game.sprites[index][j++] = createSpikeUp(832, 193);
    game.sprites[index][j++] = createSpikeLeft(938, 253);
    game.sprites[index][j++] = createSpikeUp(902, 313);
    game.sprites[index][j++] = createSpikeRight(200, 234);
    game.sprites[index][j++] = createSpikeUp(135, 203);
    game.sprites[index][j++] = createSpikeUp(167, 203);

    game.sprites[index][0].handleInput = function (deltaTime) {
        if (game.player.y >= 528 && game.player.y <= 570 && game.player.x >= 318 && game.player.x <= 338) {
            var t = createSpikeUp(328, 538);
            game.sprites[game.mapIndex].push(t);
            t.init();
        }
    };

    game.sprites[index].push(createSave(780, 480));
    game.sprites[index].push(createSave(850, 170));
    game.sprites[index].push(createSave(130, 280));
    game.sprites[index].push(createSave(380, 500));

    game.sprites[index].push(createCherry(590, 495));
    game.sprites[index].push(createCherry(650, 510));
    game.sprites[index].push(createCherry(660, 460));
    game.sprites[index].push(createCherry(630, 430));
    game.sprites[index].push(createCherry(635, 480));
    game.sprites[index][game.sprites[index].length - 1].handleInput = function (deltaTime) {
        if (game.player.y > 500 && game.player.y <= 570 && game.player.x >= 420 && game.player.x <= 580) {
            this.maxY = 1050;
            this.minX = -50;
            this.speedY = 250 / 1000;
            this.speedX = -1000 / 1000;
        }
    };
    game.sprites[index].push(createCherry(590, 455));
    game.sprites[index][game.sprites[index].length - 1].handleInput = function (deltaTime) {
        if (game.player.y >= 400 && game.player.y <= 500 && game.player.x >= 390 && game.player.x <= 580) {
            this.maxY = 1050;
            this.minX = -50;
            this.speedY = 200 / 1000;
            this.speedX = -1000 / 1000;
        }
    };

    game.sprites[index].push(createButton(845, 305)); // 过关必触发的机关
    game.sprites[index].push(createSpikeRight(164, 320)); // 过关必消的刺
    game.sprites[index][game.sprites[index].length - 1].handleInput = function (deltaTime) {
        if (window.localStorage.buttonFlag == "1") {
            this.maxX = 1050;
            this.speedX = 500 / 1000;
        }
    };
}

function map2(index) {
    var j = 0;
    var temp = 0;
    game.sprites[index] = [];
    game.sprites[index][j++] = createPlatform(0, 470, 320, 130);
    game.sprites[index][j++] = createPlatform(0, 150, 65, 255);
    game.sprites[index][j++] = createPlatform(130, 310, 60, 95);
    game.sprites[index][j++] = createPlatform(220, 340, 95, 95);

    game.sprites[index][j++] = createPlatform(315, 405, 30, 30);//监听隐藏挡板的出现条件
    temp = j - 1;
    game.sprites[index][temp].handleInput = function (deltaTime) {
        if (game.player.x >= 340 && game.player.x <= 385 && game.player.y <= 370 && game.player.y >= 305 && game.player.speedX > 0) {
            var t = createPlatform(375, 305, 10, 115);//隐藏的挡板
            game.sprites[game.mapIndex].push(t);
            t.init();
        }
    }

    game.sprites[index][j++] = createPlatform(100, 250, 30, 30);
    game.sprites[index][j++] = createPlatform(220, 310, 30, 30);
    game.sprites[index][j++] = createPlatform(100, 150, 30, 65);
    game.sprites[index][j++] = createPlatform(160, 220, 225, 30);

    game.sprites[index][j++] = createPlatform(160, 155, 30, 65);//会急速向右
    temp = j - 1;
    game.sprites[index][temp].handleInput = function (deltaTime) {
        if (game.player.x >= 222 && game.player.x <= 383 && game.player.y <= 188 && game.player.y >= 155) {
            this.speedX = 300 / 1000;
            this.maxX = 355;
        }
    }

    game.sprites[index][j++] = createPlatform(445, 220, 35, 130);
    game.sprites[index][j++] = createPlatform(320, 535, 680, 65);

    game.sprites[index][j++] = createPlatform(480, 220, 30, 145);
    game.sprites[index][j++] = createPlatformWithNoGrass(480, 400, 30, 135);//这二者之间可穿过

    game.sprites[index][j++] = createPlatform(510, 320, 65, 30);//触发隐藏刺3的块
    temp = j - 1;
    game.sprites[index][temp].handleInput = function (deltaTime) {
        if (game.player.x >= 550 && game.player.x <= 610 && game.player.y <= 288 && game.player.y >= 285) {
            var t = createSpikeUp(575, 310);//隐藏刺3
            game.sprites[game.mapIndex].push(t);
            t.init();
        }
    }

    game.sprites[index][j++] = createPlatform(610, 320, 35, 30);

    game.sprites[index][j++] = createPlatform(680, 320, 95, 30);//夹缝中突然出现词的块
    temp = j - 1;
    game.sprites[index][temp].handleInput = function (deltaTime) {
        if (game.player.x >= 710 && game.player.x <= 748 && game.player.y <= 288 && game.player.y >= 285) {
            var t = createSpikeUp(714, 288);//突然出现在夹缝的刺
            game.sprites[game.mapIndex].push(t);
            t.init();
        }
    }

    game.sprites[index][j++] = createPlatform(775, 320, 225, 30);

    game.sprites[index][j++] = createPlatform(545, 220, 30, 65);//隐藏刺1的块
    temp = j - 1;
    game.sprites[index][temp].handleInput = function (deltaTime) {
        if (game.player.x >= 513 && game.player.x <= 575 && game.player.y <= 188 && game.player.y >= 100) {
            var t = createSpikeUp(544, 188);//隐藏刺1
            game.sprites[game.mapIndex].push(t);
            t.init();
        }
    }

    game.sprites[index][j++] = createPlatform(780, 220, 30, 65);

    game.sprites[index][j++] = createPlatform(575, 255, 205, 30);//向右发射一个刺
    temp = j - 1;
    game.sprites[index][temp].handleInput = function (deltaTime) {
        if (game.player.x >= 600 && game.player.x <= 750 && game.player.y <= 223 && game.player.y >= 140 && this.flag == undefined) {
            var t = createSpikeRight(545, 220);
            t.speedX = 100 / 1000;
            game.sprites[game.mapIndex].push(t);
            t.init();
            this.flag = true;
        }
    }

    game.sprites[index][j++] = createPlatform(935, 150, 65, 170);

    game.sprites[index][j++] = createPlatform(415, 400, 35, 30);//会漂浮的悬台
    temp = j - 1;
    game.sprites[index][temp].handleInput = function (deltaTime) {
        var x0 = this.x;
        var y0 = this.y;
        if (game.player.x >= x0 && game.player.x <= x0 + 33 && game.player.y == y0 - 32 && !KeyState[Key.A] && !KeyState[Key.W] && !KeyState[Key.D]) {
            game.player.speedX = 200 / 1000;
            game.player.maxX = 999;
            this.speedX = 200 / 1000;
        }
    }


    game.sprites[index][j++] = createSpikeRight(190, 155);//会急速向右
    temp = j - 1;
    game.sprites[index][temp].handleInput = function (deltaTime) {
        if (game.player.x >= 222 && game.player.x <= 383 && game.player.y <= 188 && game.player.y >= 155) {
            this.speedX = 300 / 1000;
            this.maxX = 385;
        }
    }

    game.sprites[index][j++] = createSpikeRight(190, 187);//会急速向右
    temp = j - 1;
    game.sprites[index][temp].handleInput = function (deltaTime) {
        if (game.player.x >= 222 && game.player.x <= 383 && game.player.y <= 188 && game.player.y >= 155) {
            this.speedX = 300 / 1000;
            this.maxX = 385;
        }
    }

    game.sprites[index][j++] = createSpikeUp(479, 188);

    game.sprites[index][j++] = createSpikeUp(779, 188);//会向上飞的刺
    temp = j - 1;
    game.sprites[index][temp].handleInput = function (deltaTime) {
        if (game.player.x >= 760 && game.player.x <= 810 && game.player.y <= 155) {
            console.log(game.player.x);
            this.speedY = -600 / 1000;
        }
    }

    game.sprites[index][j++] = createSpikeRight(810, 253);
    game.sprites[index][j++] = createSpikeLeft(903, 253);
    game.sprites[index][j++] = createSpikeUp(865, 288);
    game.sprites[index][j++] = createSpikeUp(319, 503);
    game.sprites[index][j++] = createSpikeUp(350, 503);
    game.sprites[index][j++] = createSpikeUp(385, 503);
    game.sprites[index][j++] = createSpikeUp(420, 503);
    game.sprites[index][j++] = createSpikeUp(452, 503);
    game.sprites[index][j++] = createSpikeUp(645, 503);
    game.sprites[index][j++] = createSpikeUp(610, 503);
    game.sprites[index][j++] = createSpikeUp(575, 503);
    game.sprites[index][j++] = createSpikeUp(715, 503);
    game.sprites[index][j++] = createSpikeUp(750, 503);
    game.sprites[index][j++] = createSpikeUp(785, 503);
    game.sprites[index][j++] = createSpikeUp(0, 118);
    game.sprites[index][j++] = createSpikeUp(968, 118);
    game.sprites[index][j++] = createSpikeLeft(413, 255);

    game.sprites[index][j++] = createSpikeDown(33, 405);//会下落的刺
    temp = j - 1;
    game.sprites[index][temp].handleInput = function (deltaTime) {
        if (game.player.x >= 10 && game.player.x <= 50 && game.player.y <= 438 && game.player.y >= 405) {
            this.acceY = 1.0 / 1000;
            this.maxY = 450;
        }
    }
    game.sprites[index][j++] = createWarp(960, 500);
    game.sprites[index][j++] = createSave(437,170);
}

function map3(index)
{
    game.sprites[index] = [];
    game.sprites[index].push(createWin());
    game.sprites[index].push(createPlatform(150, 450, 700, 50));
    game.sprites[index].push(createPlatform(100, 70, 50, 430));
    game.sprites[index].push(createPlatform(850, 70, 50, 430));
}

function puzzle(gc)	//在第三张地图的画布上添加东西迷惑人
{
    gc.drawImage(ImgCache["spikeUp"], 0, 0, 32, 32, 415, 368, 32, 32);
    gc.drawImage(ImgCache["platform"], 0, 32, 30, 35, 480, 365, 30, 35);
}