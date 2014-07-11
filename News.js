var url = "NewsImg.json";
var urlc = "clientComment/";
var comNum;
var cpp = 6;
var imgNum;
var hoverFlag;
var boardWidth = [];
var boardHeight = [];
var boardX = [];
var boardY = [];
var tempCom = [];
var tempcNum;
var tempcNumTarget;

function processData(obj)
{
	var i;
	var wt, ht, flag;

	wt = $("#ShowBoard").width();
	ht = $("#ShowBoard").height();
	$("#Title").text(obj.title);
	$("#Date").text(obj.date);
	if (window.localStorage.current == undefined)
	    flag = 0;
	else
	    flag = Number(window.localStorage.current);
	for (i = 0; i < obj.num; i++)
	{
	    if (i == flag)
	        $("#Board").append('<div id = "img' + i + '" style = "display : block;" ><img /></div>');
	    else
	        $("#Board").append('<div id = "img' + i + '" style = "display : none;" ><img /></div>');
		$("#img" + i).children().attr("src", obj.link[i]);

		boardX[i] = (wt - obj.width[i]) / 2;
		boardY[i] = (ht - obj.height[i]) / 2;
		boardWidth[i] = obj.width[i];
		boardHeight[i] = obj.height[i];
		$("#Board").append("<div id = 'show" + i + "' class = 'transparent'>");
		$("#show" + i).css("left", "0px");
		$("#show" + i).css("top", (boardHeight[i] - 100) + "px");
		$("#show" + i).css("width", boardWidth[i] + "px");
		$("#show" + i).css("height", "100px");
		$("#show" + i).css("display", "none");
		$("#show" + i).append("<div style = 'position: absolute; top: 10px; left: 75px'><img src = 'slash.png'/></div>");
		if (i < 9)
			$("#show" + i).append("<div class = 'pageNum' style = 'position: absolute; top: 8px; left: 65px'>" + (i + 1) + "</div>");
		else if (i < 99)
			$("#show" + i).append("<div class = 'pageNum' style = 'position: absolute; top: 8px; left: 30px'>" + (i + 1) + "</div>");
		$("#show" + i).append("<div class = 'pageTotal' style = 'position: absolute; top: 50px; left: 125px'>" + obj.num + "</div>");
		$("#show" + i).append("<div class = 'news' style = 'position: absolute; top: 15px; left: 180px'>" + obj.news[i] + "</div>");
		$("#show" + i).children(":last-child").css("width", (boardWidth[i] - 210) + "px");
		$("#right").append('<div id = "switch' + i + '" class = "switchOff" style = "display: none; right: ' + ((obj.num - i) * 30) + 'px"></div>');
		$("#switch"+i).attr("onclick", "changeImg("+ i +")");
	}

	$("#left").mouseover(mouseOver_Left);
	$("#right").mouseover(mouseOver_Right);
	$("#left").mouseleave(mouseOut_Left);
	$("#right").mouseleave(mouseOut_Right);
	$("#Board").mouseover(mouseOver);
	$("#Board").mouseleave(mouseOut);
	imgNum = obj.num;
	if (window.localStorage.current == undefined)
	    window.localStorage.current = 0;
	hoverFlag = 0;
	adjustBoard(window.localStorage.current);
}

function adjustBoard(k)
{
	$("#Board").css("left", boardX[k] + "px");
	$("#Board").css("top", boardY[k] + "px");
	$("#Board").css("width", boardWidth[k] + "px");
	$("#Board").css("height", boardHeight[k] + "px");
	$("#left").css("width", (boardWidth[k] / 2) + "px");
	$("#left").css("height", (boardHeight[k] - 100) + "px");
	$("#right").css("right", "0px");
	$("#right").css("width", (boardWidth[k] / 2) + "px");
	$("#right").css("height", (boardHeight[k] - 100) + "px");
	$("#switch" + window.localStorage.current).attr("class", "switchOff");
	$("#switch" + k).attr("class", "switchOn");
}

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

function commentHandler()
{
    if (this.readyState == this.DONE) {
        if (this.status == 200) {
            try {
                comNum = Number(JSON.parse(this.responseText));
                for (i = 1; i <= Math.ceil(comNum / cpp) ; i++) 
                    $("#pageList").append('<option value ="' + i + '">第' + i + '页</option>');
                var flag;
                if (window.localStorage.curPage == undefined || Number(window.localStorage.curPage) > Math.ceil(comNum / cpp))
                    window.localStorage.curPage = 1;
                changeCom(Number(window.localStorage.curPage));
            } catch (ex) {
                console.log(ex.message);
            }
        }
    }
}

function changeCom(page)
{
    if (page < 1 || page > Math.ceil(comNum / cpp))
        return;
    page = page - 1;
    $("#pageList").children("[value='" + window.localStorage.curPage + "']").removeAttr("selected");
    window.localStorage.curPage = page + 1;
    $("#pageList").children("[value='" + window.localStorage.curPage + "']").attr("selected", "selected");
    var i, min, max;
    $("#commentList").html("");
    max = comNum - page * cpp;
    min = (comNum - (page + 1) * cpp) > 0 ? (comNum - (page + 1) * cpp) : 0;
    tempcNum = 0;
    tempcNumTarget = max - min;
    for (i = max; i > min; i--)
    {
        var comment = new XMLHttpRequest();
        comment.onreadystatechange = commentProcess;
        comment.open('GET', urlc + i + ".json");
        comment.send();
    }
}

function commentProcess()
{
    if (this.readyState == this.DONE) {
        if (this.status == 200) {
            try {
                var obj = JSON.parse(this.responseText);
                var index = comNum - (Number(window.localStorage.curPage) - 1) * cpp - obj.floor;
                tempCom[index] = obj;
                tempcNum++;
                if (tempcNum == tempcNumTarget)
                    for (var i = 0; i < tempcNumTarget; i++)
                        produceCom(tempCom[i]);
            } catch (ex) {
                console.log(ex.message);
            }
        }
    }
}

function produceCom(obj)
{
    $.tmpl($("#commentTemplate"), obj).appendTo( "#commentList" );
}

function produceImg()
{
    var client = new XMLHttpRequest();
    var comment = new XMLHttpRequest();
	client.onreadystatechange = handler;
	client.open('GET', url);
	client.send();
	comment.onreadystatechange = commentHandler;
	comment.open('GET', urlc + "total.json");
	comment.send();
}

function changeImg(target)
{
    target = (target + imgNum) % imgNum;
	$("#img" + window.localStorage.current).fadeOut();
	if (hoverFlag == 1)
		$("#show" + window.localStorage.current).fadeOut();
	adjustBoard(target);
	$("#img" + target).fadeIn();
	if (hoverFlag == 1)
		$("#show" + target).fadeIn();
	window.localStorage.current = target;
	if (event != undefined)
	    event.stopPropagation();
}

setInterval(function () {
	if (hoverFlag == 1)
		return;
	changeImg(Number(window.localStorage.current) + 1);
}, 5000);

function mouseOver() {
	hoverFlag = 1;
	$("#show" + window.localStorage.current).fadeIn(500);
	for (var i = 0; i < imgNum; i++)
		$("#switch" + i).fadeIn(500);
}

function mouseOut() {
	$("#show" + window.localStorage.current).fadeOut(500);
	for (var i = 0; i < imgNum; i++)
		$("#switch" + i).fadeOut(500);
	hoverFlag = 0;
}

function mouseOver_Left(){
	$("#leftArrow").fadeIn(500);
}
function mouseOver_Right() {
	$("#rightArrow").fadeIn(500);
}

function mouseOut_Left() {
	$("#leftArrow").fadeOut(500);
}

function mouseOut_Right() {
	$("#rightArrow").fadeOut(500);
}

function keyChangeImg(event) {
    if (hoverFlag == 0)
        return;
    if (event.keyCode == 39)
        changeImg(Number(window.localStorage.current) + 1);
    else if (event.keyCode == 37)
        changeImg(Number(window.localStorage.current) - 1);
}