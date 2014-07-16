function JudgeStabUp(stabX, stabY, playerX, playerY)
{//传入的是向上的刺的左上角的坐标和人的左上角坐标,通过线性规划求出死亡判定区域
	var x = playerX + 16;
	var y = playerY + 16;
	var death = false;
	if (y >= stabY -16 && y <= stabY+16 && y >= ((-2)*x + 2*stabX + stabY) && y >= (2*x - 2*stabX + stabY - 64))
		death = true;
	return death;
}

function JudgeStabDown(stabX, stabY, playerX, playerY)
{
	var x = playerX + 16;
	var y = playerY + 16;
	var death = false;
	if (y >= stabY-3 && y <= stabY+39 && y <= (2*x - 2*stabX + stabY + 16) && y <= ((-2)*x + 2*stabX + stabY + 79))
		death = true;
	return death;
}

function JudgeStabLeft(stabX, stabY, playerX, playerY)
{
	var x = playerX + 16;
	var y = playerY + 16;
	var death = false;
	if (x >= stabX - 9 && x <= stabX+24 && y >= ((-0.5)*x + 0.5*stabX + stabY - 5) && y <= (0.5*x - 0.5*stabX + stabY + 24))
		death = true;
	return death;
}

function JudgeStabRight(stabX, stabY, playerX, playerY)
{
	var x = playerX + 16;
	var y = playerY + 16;
	var death = false;
	if (x >= stabX + 9 && x <= stabX+41 && y <= ((-0.5)*x + 0.5*stabX + stabY + 42) && y >= (0.5*x - 0.5*stabX + stabY - 24))
		death = true;
	return death;
}