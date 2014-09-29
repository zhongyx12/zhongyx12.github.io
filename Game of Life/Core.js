/*
文件名：Core.js
版本时间：2014-9-29
作者：钟仰新
测试：包煜
功能：生命游戏的内核代码，用于存储细胞阵列生死信息，以及下一时刻的生死判断。
*/

//预定义细胞的生死表示规则，1表示细胞生，0表示细胞已死
var lived = 1;
var dead = 0;

//以下所有代码为细胞阵列类Grid的定义，包括函数和成员

//构造函数
function Grid(cfg){
    for (var attr in cfg){
        this[attr]=cfg[attr];
    }
}

//Grid类原型定义
Grid.prototype = {
    constructor: Grid,

    length : 10,    //细胞阵列横向细胞数目，下称“长”
    width : 10,     //细胞阵列纵向细胞数目，下称“宽”

    cells : null,   //二维数组指针，记录当前细胞阵列的生死情况
    temp : null,    //二维数组指针，缓存上一时刻细胞阵列的生死情况

    //初始化函数
    init: function ()
    {
        //规定长、宽至少为3
        this.length = this.length > 3 ? this.length : 3;
        this.width = this.width > 3 ? this.width : 3;

        //申请cells和temp二维数组，并将细胞信息都初始化为dead
        this.cells = new Array(this.width);
        this.temp = new Array(this.width);
        for (var i = 0; i < this.width; i++)
        {
            this.cells[i] = new Array(this.length);
            this.temp[i] = new Array(this.length);
            for (var j = 0; j < this.length; j++)
            {
                this.cells[i][j] = dead;
                this.temp[i][j] = dead;
            }
        }
    },

    //改变长、宽的函数，并重新初始化
    modifySize : function (len, wid)
    {
        this.length = len;
        this.width = wid;
        this.init();
    },

    //随机生成函数，执行初始化函数后才能调用，重新随机生成全阵列细胞生死状态
    random : function ()
    {
        var x;
        for (var i = 0; i < this.width; i++)
            for (var j = 0; j < this.length; j++)
            {
                x = Math.random();
                x = x > 0.5 ? lived : dead;
                this.cells[i][j] = x;
            }
    },

    //用数组的形式输入细胞阵列的状态，用于测试
    inputCells_Array : function (arr)
    {
        if (arr == null || arr.length == 0 || arr.length != width)
            return false;
        for (var i = 0; i < this.width; i++)
            if (arr[i].length != this.length)
                return false;

        for (var i = 0; i < this.width; i++)
            for (var j = 0; j < this.length; j++)
                this.cells[i][j] = arr[i][j];

        return true;
    },

    //改变某个位置的细胞生死状态，row横坐标，col纵坐标，state要修改状态
    inputCells_Pos : function (row, col, state)
    {
        if (row > this.width || row < 0 || col > this.length || col < 0)
            return false;
        if (state != lived || state != dead)
            return false;

        this.cells[row][col] = state;
        return true;
    },
    
    //缓存函数，将当前细胞阵列生死信息cells缓存到缓存数组temp中，辅助jedgeCell函数完成判断
    duplicate : function ()
    {
        for (var i = 0; i < this.width; i++)
            for (var j = 0; j < this.length; j++)
                this.temp[i][j] = this.cells[i][j];
    },

    //判断下一时刻的某位置细胞的生死状况，row为该目标细胞的横坐标，col为纵坐标
    judgeCell : function (row, col)
    {
        //按规则判断，livedNum记录该细胞周围8细胞的活细胞数目，初始化为0
        var livedNum = 0;
        var r, c;

        //累计该细胞周围8细胞的活细胞数目
        for (var i = -1; i < 2; i++)
            for (var j = -1; j < 2; j++) {
                if (i == 0 && j == 0)
                    continue;
                r = (row + i + this.width) % this.width;
                c = (col + j + this.length) % this.length;
                if (this.temp[r][c] == lived)
                    livedNum++;
            }

        //按规则判断该细胞的生死，改写cells数组
        if (livedNum == 3)
            return lived;
        if (livedNum == 2)
            return this.temp[row][col];
        else
            return dead;
    },

    //更新细胞状态的函数，按照规则求出下一时刻细胞阵列的生死状态，并更新cells数组
    updateCells : function ()
    {
        this.duplicate();
        for (var i = 0; i < this.width; i++)
            for (var j = 0; j < this.length; j++)
                this.cells[i][j] = this.judgeCell(i, j);
    }
}