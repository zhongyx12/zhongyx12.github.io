/*
文件名：Shore.js
版本时间：2014-9-29
作者：钟仰新
测试：钟仰新(走读与简单调试)
功能：生命游戏的展现代码，用于将内核的细胞阵列展现在html页面中。
*/

//展现层的全局参数
var mainloop;   //记录展现主循环的id
var fps = 20;   //展现的刷新帧率
var sleep = 50; //展现每一帧的刷新时间，fps * sleep == 1000
var cellSize = 2;   //展现层显示每个细胞的边长，展现形状为正方形
var grid;   //游戏中的细胞阵列实例
var canvas; //html的画布控件
var gc;     //画布空间的“内容”，用于展示层绘制
var grid_start = false; //记录游戏运行状态，false表示未开始或暂停，true表示进行中

//html输入框控件失去焦点事件函数
function inputLost(id)
{
    var dom = document.getElementById(id);
    dom.style.backgroundColor = "rgb(175, 175, 175)";
    dom.style.color = "white";
}

//html输入框控件获得焦点事件函数
function inputFocus(id) {
    var dom = document.getElementById(id);
    dom.style.backgroundColor = "white";
    dom.style.color = "black";
}

//body的onload函数，初始化细胞阵列grid，同时用canvas画出空的细胞阵列背景
function init()
{
    canvas = document.getElementById("MyCanvas");
    gc = canvas.getContext("2d");
    grid = new Grid({ length: 200, width: 200});

    grid.init();
    grid.random();  //随机生成细胞信息

    //画出空的细胞阵列背景
    gc.fillStyle = "orange";
    gc.fillRect(0, 0, grid.length, grid.width);
}

//主循环的执行函数，在画布上画出当前细胞阵列状态，同时判断下一时刻状态
function run()
{
    //绘制细胞阵列
    for (var i = 0; i < grid.width; i++)
        for (var j = 0; j < grid.length; j++)
        {
            if (grid.cells[i][j] == grid.temp[i][j])
                continue;
            if (grid.cells[i][j] == lived)
                gc.fillStyle = "green";
            else
                gc.fillStyle = "orange";
            gc.fillRect(j, i, 1, 1);
        }

    //更新下一时刻细胞阵列信息
    grid.updateCells();
}

//html开始/暂停按钮的onclick函数，用于开始/暂停游戏主循环
function start_pause()
{
    var btn;
    if (grid_start == false)    //游戏本来处于暂停态，准备开始
    {
        mainloop = setInterval(run, sleep); //开启主循环
        btn = document.getElementById("start_pause");
        btn.setAttribute("value", "暂停");
        grid_start = true;
    }
    else    //游戏本来处于进行态，准备暂停
    {
        window.clearInterval(mainloop); //暂停主循环
        btn = document.getElementById("start_pause");
        btn.setAttribute("value", "开始");
        grid_start = false;
    }
}

//html随机按钮的onclick函数，重新随机生成细胞阵列
function random()
{
    if (grid_start == true) //如果主循环进行中，先暂停再重新初始化
        window.clearInterval(mainloop);
    var btn = document.getElementById("start_pause");
    btn.setAttribute("value", "开始");
    grid_start = false;
    grid.random();  //重新初始化细胞阵列
    run();
}

//html中修改FPS按钮的onclick函数，修改游戏展示的FPS帧数
function modify_fps()
{
    var text = document.getElementById("fps");
    var newfps = parseInt(text.value);

    //异常输入处理
    if (text.value == "")
        return false;
    if (window.isNaN(newfps))
    {
        alert("FPS请输入一个整数");
        return false;
    }
    if (newfps <= 0 || newfps > 1000)
    {
        alert("FPS的范围是(0,1000]");
        return false;
    }

    text.value = "";
    fps = newfps;
    sleep = 1000.0 / newfps;

    var showText = document.getElementById("showFPS");
    showText.innerText = newfps + "";

    if (grid_start == true) //如果游戏主循环进行中，则停下主循环，使用新的FPS(sleep间隔时间)进行新的主循环
    {
        window.clearInterval(mainloop);
        mainloop = setInterval(run, sleep);
    }
    return true;
}

//html修改细胞大小按钮的onclick函数，改变细胞显示大小，相当于放大缩小按键
function modify_cellSize()
{
    var text = document.getElementById("size");
    var newcs = parseInt(text.value);

    //异常输入处理
    if (text.value == "")
        return false;
    if (window.isNaN(newcs)) {
        alert("细胞大小请输入一个整数");
        return false;
    }
    if (newcs <= 0 || newcs > 10) {
        alert("细胞大小的范围是[1,10]");
        return false;
    }

    text.value = "";
    cellSize = newcs;

    var showText = document.getElementById("showSize");
    showText.innerText = newcs + "";

    //修改canvas实际大小，达到缩放细胞的效果
    canvas.style.width = grid.length * cellSize + "px";
    canvas.style.height = grid.width * cellSize + "px";
    return true;
}

//html修改细胞大小的"+""-"按钮的onclick函数，改变细胞显示大小，相当于放大缩小按键
function justify_cellSize(offset) {
    var newcs = cellSize + offset;

    //限制细胞大小只能为1~10的整数
    newcs = newcs > 10 ? 10 : newcs;
    newcs = newcs < 1 ? 1 : newcs;

    cellSize = newcs;
    var showText = document.getElementById("showSize");
    showText.innerText = newcs + "";

    //修改canvas实际大小，达到缩放细胞的效果
    canvas.style.width = grid.length * cellSize + "px";
    canvas.style.height = grid.width * cellSize + "px";
    return true;
}

//html修改阵列尺寸按钮的onclick函数，改变细胞阵列横向、纵向细胞数目
function modify_arraySize() {
    var textLen = document.getElementById("length");
    var newLen = parseInt(textLen.value);
    var textWid = document.getElementById("width");
    var newWid = parseInt(textWid.value);
    var lenflag = 1, widflag = 1;   //标志，记录玩家有没输入新的长和宽，有输入为1，没输入为0

    if (textLen.value == "" && textWid.value == "")
        return false;
    if (textWid.value == "")
        widflag = 0;
    if (textLen.value == "")
        lenflag = 0;

    //异常输入处理
    if (lenflag == 1 && window.isNaN(newLen)) {
        alert("横向细胞数目请输入一个整数");
        return false;
    }
    if (lenflag == 1 && (newLen < 3 || newLen > 1000)) {
        alert("横向细胞数目的范围是[3,1000]");
        return false;
    }

    if (widflag == 1 && window.isNaN(newWid)) {
        alert("纵向细胞数目请输入一个整数");
        return false;
    }
    if (widflag == 1 && (newWid < 3 || newWid > 1000)) {
        alert("纵向细胞数目的范围是[3,1000]");
        return false;
    }
    
    textLen.value = "";
    textWid.value = "";

    //如果正在进行主循环，则停下，便于修改长宽的操作
    if (grid_start == true) {
        window.clearInterval(mainloop);
        var btn = document.getElementById("start_pause");
        btn.setAttribute("value", "开始");
        grid_start = false;
    }

    //清空细胞阵列，即清空canvas
    gc.clearRect(0, 0, grid.length, grid.width);

    //修改长、宽（如果用户有输入）
    if (lenflag == 1)
    {
        grid.length = newLen;
        var showText = document.getElementById("showLen");
        showText.innerText = newLen + "";
    }   
    if (widflag == 1)
    {
        grid.width = newWid;
        var showText = document.getElementById("showWid");
        showText.innerText = newWid + "";
    }

    //重新根据新长、宽来初始化随机生成细胞阵列
    grid.init();
    grid.random();

    //重新设置canvas的逻辑长宽和实际长宽
    canvas.setAttribute("width", grid.length + "");
    canvas.setAttribute("height", grid.width + "");
    canvas.style.width = grid.length * cellSize + "px";
    canvas.style.height = grid.width * cellSize + "px";

    //重新绘制空白的细胞阵列背景
    gc.fillStyle = "orange";
    gc.fillRect(0, 0, grid.length, grid.width);
    return true;
}