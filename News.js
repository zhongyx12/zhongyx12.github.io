var url = "NewsImg.json";//初始化json地址
var urlc = "clientComment/";//评论json文件夹地址
var comNum;//评论总数
var cpp = 6;//每页的评论数
var imgNum;//新闻图片总数
var hoverFlag;//鼠标是否悬停在新闻图的flag，0为不是，1为是
var boardWidth = [];//每张图片的宽度
var boardHeight = [];//每张图片的高度
var boardX = [];//每张图片的绝对位置x值
var boardY = [];//每张图片的绝对位置y值
var tempCom = [];//临时存储get到的每页的评论
var tempcNum;//用于记录某次请求已经get到的评论数
var tempcNumTarget;//表示某次请求应该get到的评论总数，以上三个变量是用于处理异步程序中由于网速产生的“乱楼”现象
//还有两个变量是window.localStorage.current，表示现在正在浏览的是第几张图片；以及window.localStorage.curPage，表示现在正在浏览的是第几页评论
//以上两个变量都用于保存“用户习惯”


//用于初始化页面的DOM
//obj为初始化json转化而成的对象，里面包含了的成员有：
//num，记录新闻图片总数；title，记录新闻标题；date，记录新闻日期；link数组，记录新闻图的链接们；
//width和height数组，记录新闻图们的宽与高；news数组，记录每张新闻图的描述。
function processData(obj)
{
	var i;
	var wt, ht, flag;

	wt = $("#ShowBoard").width();//获取新闻图看板区域的宽度
	ht = $("#ShowBoard").height();//获取新闻图看板区域的高度

	$("#Title").text(obj.title);//设置新闻题目
	$("#Date").text(obj.date);//设置新闻日期

    //判断window.localStorage.current，初始化要显示的图片是哪一张，将下标计入flag中
	if (window.localStorage.current == undefined)
	    flag = 0;
	else
	    flag = Number(window.localStorage.current);

    //对每一张图片进行DOM设置，注意，所有新闻图都是在页面一加载时就加载进来的，只是根据浏览情况进行隐藏和显示
	for (i = 0; i < obj.num; i++)
	{
	    //将图片一一加入图片看板中，将其中要展示的那张新闻图设为“display : block”，其它设为“display : none”隐藏起来
	    if (i == flag)
	        $("#Board").append('<div id = "img' + i + '" style = "display : block;" ><img /></div>');
	    else
	        $("#Board").append('<div id = "img' + i + '" style = "display : none;" ><img /></div>');
		$("#img" + i).children().attr("src", obj.link[i]);//设置图片的链接

        //新闻图片采用居中于图片看板的布局方式，一下四句是计算每张图片的宽高和方位
		boardX[i] = (wt - obj.width[i]) / 2;
		boardY[i] = (ht - obj.height[i]) / 2;
		boardWidth[i] = obj.width[i];
		boardHeight[i] = obj.height[i];

		$("#Board").append("<div id = 'show" + i + "' class = 'transparent'>");//增加新闻图的描述板块

        //设置新闻图描述板块的位置和宽高，使该板块位于每张新闻图的下部
		$("#show" + i).css("left", "0px");
		$("#show" + i).css("top", (boardHeight[i] - 100) + "px");
		$("#show" + i).css("width", boardWidth[i] + "px");
		$("#show" + i).css("height", "100px");
		$("#show" + i).css("display", "none");//将描述板块隐藏起来（事实上仅有鼠标hover到特点部分才会展示）

        //下面布置新闻描述板块，分为页码和描述两部分
		$("#show" + i).append("<div style = 'position: absolute; top: 10px; left: 75px'><img src = 'slash.png'/></div>");//只是分割图片页码和总页数的slash
		if (i < 9)//这是设置每张新闻图描述板块中的页码数，如果页码是一位数就怎样的方位，如果页码是两位数又是怎样的方位
			$("#show" + i).append("<div class = 'pageNum' style = 'position: absolute; top: 8px; left: 65px'>" + (i + 1) + "</div>");
		else if (i < 99)
			$("#show" + i).append("<div class = 'pageNum' style = 'position: absolute; top: 8px; left: 30px'>" + (i + 1) + "</div>");

		$("#show" + i).append("<div class = 'pageTotal' style = 'position: absolute; top: 50px; left: 125px'>" + obj.num + "</div>");//设置总页数的DOM
		$("#show" + i).append("<div class = 'news' style = 'position: absolute; top: 15px; left: 180px'>" + obj.news[i] + "</div>");//生成新闻描述
        $("#show" + i).children(":last-child").css("width", (boardWidth[i] - 210) + "px");//设置新闻描述部分的宽度

        //下面生成新闻图右上角的小方框，也就是switch开关，用于快速跳转新闻图
        $("#right").append('<div id = "switch' + i + '" class = "switchOff" style = "display: none; right: ' + ((obj.num - i) * 30) + 'px"></div>');
		$("#switch"+i).attr("onclick", "changeImg("+ i +")");//设置每个开关的click事件，实现跳转
	}

	$("#left").mouseover(mouseOver_Left);//为新闻图的左遮罩增加鼠标悬停显示左箭头的事件
	$("#right").mouseover(mouseOver_Right);//为新闻图的右遮罩增加鼠标悬停显示右箭头的事件
	$("#left").mouseleave(mouseOut_Left);//为新闻图的左遮罩增加鼠标离开隐藏左箭头的事件
	$("#right").mouseleave(mouseOut_Right);//为新闻图的右遮罩增加鼠标离开隐藏右箭头的事件
	$("#Board").mouseover(mouseOver);//为整个新闻图内部区域增加鼠标悬停事件，显示新闻描述和右上方的跳转开关
	$("#Board").mouseleave(mouseOut);//为整个新闻图内部区域增加鼠标离开事件，隐藏新闻描述和右上方的跳转开关
	imgNum = obj.num;//用imgNum这个全局变量，记录新闻图片总数
	if (window.localStorage.current == undefined)//根据localStorage的情况初始化要显示的新闻图片
	    window.localStorage.current = 0;
	hoverFlag = 0;//将鼠标悬停flag设置为0
	adjustBoard(window.localStorage.current);//根据现在显示的图片编号，调整图片区域的宽高和方位，使图片看板和遮罩位置正确
}

//根据现在显示的图片编号，调整图片区域的宽高和方位，使图片看板、遮罩和右上方跳转按钮的位置正确，k为现在显示的图片的下标号
function adjustBoard(k)
{
    //看板
	$("#Board").css("left", boardX[k] + "px");
	$("#Board").css("top", boardY[k] + "px");
	$("#Board").css("width", boardWidth[k] + "px");
	$("#Board").css("height", boardHeight[k] + "px");
    //左遮罩
	$("#left").css("width", (boardWidth[k] / 2) + "px");
	$("#left").css("height", (boardHeight[k] - 100) + "px");
    //右遮罩
	$("#right").css("right", "0px");
	$("#right").css("width", (boardWidth[k] / 2) + "px");
	$("#right").css("height", (boardHeight[k] - 100) + "px");
    //右上方跳转开关
	$("#switch" + window.localStorage.current).attr("class", "switchOff");
	$("#switch" + k).attr("class", "switchOn");
}

//初始化新闻图片信息json的回调函数
function handler() {
	if (this.readyState == this.DONE) {
		if (this.status == 200) {
			try {
				processData(JSON.parse(this.responseText));
			} catch (ex) {
				console.log(ex.message);
			}
		}
	}
}

//初始化评论信息json的回调函数，此回调函数只是初级请求阶段，后面还有后续的发送服务器请求的操作
function commentHandler()
{
    if (this.readyState == this.DONE) {
        if (this.status == 200) {
            try {
                comNum = Number(JSON.parse(this.responseText));//用comNum记录评论总数
                for (i = 1; i <= Math.ceil(comNum / cpp) ; i++) //cpp为每页的评论数，计算出来的是评论的总页数
                    $("#pageList").append('<option value ="' + i + '">第' + i + '页</option>');//生成跳转评论下拉菜单的每个选项
                if (window.localStorage.curPage == undefined || Number(window.localStorage.curPage) > Math.ceil(comNum / cpp))
                    window.localStorage.curPage = 1;//根据localStorage.curPage的情况设置现在显示的是评论的第几页
                changeCom(Number(window.localStorage.curPage));//渲染网友评论
            } catch (ex) {
                console.log(ex.message);
            }
        }
    }
}

//用于渲染网友评论，page表示要渲染的是第几页的那些评论
function changeCom(page)
{
    if (page < 1 || page > Math.ceil(comNum / cpp))//评论页码不在范围内就直接退出，用于无效化在第1页点击“上一页”，以及在最后一页点击“下一页”
        return;
    page = page - 1;//纯属使评论页码变成下标

    //将跳转菜单中的“第几页”字样进行更改
    $("#pageList").children("[value='" + window.localStorage.curPage + "']").removeAttr("selected");
    window.localStorage.curPage = page + 1;//改变curPage的值，表示现在显示的是第几页评论
    $("#pageList").children("[value='" + window.localStorage.curPage + "']").attr("selected", "selected");

    //进行每条评论的渲染
    var i, min, max;
    $("#commentList").html("");//先将评论区清空
    max = comNum - page * cpp;//计算这一页中显示的评论最大的是几楼
    min = (comNum - (page + 1) * cpp) > 0 ? (comNum - (page + 1) * cpp) : 0;//计算这一页中显示的评论最小的是几楼，并减1

    //因为每条评论信息是分别存在不同的json中的，则异步请求时有可能出现如第30楼比29楼先请求，却由于网络原因比29楼后得到json，
    //导致29楼先于30楼渲染，造成了“乱楼”现象。为了保持评论是按照楼数单调渲染的，采取如下策略。
    tempcNum = 0;//先初始化一个已得到的评论数目，设置为0
    tempcNumTarget = max - min;//这个表示本次请求总共请求的评论数目
    for (i = max; i > min; i--)//对每个评论进行json的请求
    {
        var comment = new XMLHttpRequest();
        comment.onreadystatechange = commentProcess;//这个回调函数中包含了渲染评论的代码，但不是每次得到评论就马上渲染，
        //而是得到所有评论的json后才进行按顺序渲染，是否已经得到所有json的判断就依靠tempcNum，tempcNumTarget两个全局变量
        comment.open('GET', urlc + i + ".json");
        comment.send();
    }
}

//渲染网友评论的函数，特点是等待所有评论的json都get到后才进行渲染
function commentProcess()
{
    if (this.readyState == this.DONE) {
        if (this.status == 200) {
            try {
                var obj = JSON.parse(this.responseText);//取得某条评论的信息，存在对象中
                var index = comNum - (Number(window.localStorage.curPage) - 1) * cpp - obj.floor;//计算这条评论应该是从上往下按顺序渲染的第几条评论
                tempCom[index] = obj;//将评论信息存在全局的变量中，方便后续渲染，这个数组的顺序就是渲染的正确顺序
                tempcNum++;//这是关键一步，将此变量+1，则表示已经get到的json数+1
                if (tempcNum == tempcNumTarget)//如果已经get到的json数等于应该得到的json总数，就代表所有评论都get下来了，就开始按顺序渲染，否则不渲染！
                    for (var i = 0; i < tempcNumTarget; i++)//开始按顺序渲染
                        produceCom(tempCom[i]);//渲染评论
            } catch (ex) {
                console.log(ex.message);
            }
        }
    }
}

//渲染评论的函数
function produceCom(obj)
{
    $.tmpl($("#commentTemplate"), obj).appendTo("#commentList");//这里用到了第三方库的JS前端模板进行渲染，commentTemplate是模板的id名
}

//这是页面初始化函数，用于请求新闻图的json和网友评论的json
function produceImg()
{
    var client = new XMLHttpRequest();//请求新闻图json的变量
    var comment = new XMLHttpRequest();//请求网友评论json的变量
	client.onreadystatechange = handler;
	client.open('GET', url);//回调函数中包含渲染所有新闻图和相关看板、遮罩等的代码
	client.send();
	comment.onreadystatechange = commentHandler;
	comment.open('GET', urlc + "total.json");//先请求的是json里只包含评论总数信息，但回调函数中有后续的评论渲染代码
	comment.send();
}

//此函数用于切换显示的新闻图，target为要显示的新闻图的下标
function changeImg(target)
{
    target = (target + imgNum) % imgNum;//防止下标溢出，同时完成循环播放新闻图的功能
	$("#img" + window.localStorage.current).fadeOut();//将当前显示的图片淡出
	if (hoverFlag == 1)//如果鼠标悬停在新闻图上，则代表现在新闻描述板块是显示的，也要将其淡出
		$("#show" + window.localStorage.current).fadeOut();
	adjustBoard(target);//调整看板、遮罩、右上方跳转按钮的尺寸和方位，使其正确
	$("#img" + target).fadeIn();//将要显示的图片淡入
	if (hoverFlag == 1)//如果鼠标悬停在新闻图上，将新的新闻描述板块淡入显示
		$("#show" + target).fadeIn();
	window.localStorage.current = target;//更改标记，记入现在正在显示的新闻图下标
	if (event != undefined)//如果是事件触发的图片切换，那么停止冒泡，防止多余的新闻图切换
	    event.stopPropagation();
}

//每5秒进行新闻轮播
setInterval(function () {
	if (hoverFlag == 1)//如果鼠标悬停在新闻图上，则不用轮播
		return;
	changeImg(Number(window.localStorage.current) + 1);//鼠标没有悬停在新闻图上，则进行轮播
}, 5000);

//添加鼠标悬停新闻图上的事件
function mouseOver() {
	hoverFlag = 1;//更改悬停标记
	$("#show" + window.localStorage.current).fadeIn(500);//淡入新闻描述板块
	for (var i = 0; i < imgNum; i++)//淡入右上方的跳转按钮
		$("#switch" + i).fadeIn(500);
}

//添加鼠标离开停新闻图上的事件
function mouseOut() {
    $("#show" + window.localStorage.current).fadeOut(500);//淡出新闻描述板块
    for (var i = 0; i < imgNum; i++)//淡出右上方的跳转按钮
		$("#switch" + i).fadeOut(500);
	hoverFlag = 0;//更改悬停标记
}

//添加鼠标悬停左遮罩的事件，淡入左箭头
function mouseOver_Left(){
	$("#leftArrow").fadeIn(500);
}

//添加鼠标悬停右遮罩的事件，淡入右箭头
function mouseOver_Right() {
	$("#rightArrow").fadeIn(500);
}

//添加鼠标离开左遮罩的事件，淡出左箭头
function mouseOut_Left() {
	$("#leftArrow").fadeOut(500);
}

//添加鼠标离开右遮罩的事件，淡出右箭头
function mouseOut_Right() {
	$("#rightArrow").fadeOut(500);
}

//添加键盘按键事件（左、右键切换新闻图）
function keyChangeImg(event) {
    if (hoverFlag == 0)//如果鼠标没有悬停在新闻图上，则对键盘按键事件不响应
        return;
    if (event.keyCode == 39)//如果鼠标悬停在新闻图上，又按了键盘右键，则切换到下一张图片
        changeImg(Number(window.localStorage.current) + 1);
    else if (event.keyCode == 37)//如果鼠标悬停在新闻图上，又按了键盘左键，则切换到上一张图片
        changeImg(Number(window.localStorage.current) - 1);
}