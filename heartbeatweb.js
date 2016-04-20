Date.prototype.getMonthName = function() {
var m = ['Jan','Feb','Mar','Apr','May','June','July',
'Aug','Sept','Oct','Nov','Dec'];
return m[this.getMonth()];
} 

Date.prototype.getDayName = function() {
var d = ['Sun','Mon','Tue','Wed',
'Thu','Fri','Sat'];
return d[this.getDay()];
}

Date.prototype.getEDT = function() {
	//EST
	//var offset = -5;

	//EDT
	var offset = -4;

	//use below
	var utc = this.getTime() +  (this.getTimezoneOffset() * 60000);
	//this is just for testing locally
	//var utc = this.getTime() +  (-420 * 60000);
	var edt = new Date(utc + offset * 3600000);
	return edt;
} 


var heart = document.getElementById("heart");
var localtime = new Date(); //user time
// console.log("localtime: " + localtime);
//var today = new Date();
var today = localtime.getEDT(); //converted to EDT
// console.log("today: " + today);
// var yesterday = new Date();
// yesterday.setDate(today.getDate() - 1);
var yesterdaylocal = new Date(localtime.getTime() - 24 * 3600000);
// console.log("yesterdaylocal: " + yesterdaylocal);
yesterday = new Date(today.getTime() - 24 * 3600000); //in EDT
// console.log("yesterday: " + yesterday);
var firstdayrecorded = new XDate(2014, 1, 21);
var todayX = new XDate(today); //today is already in EDT
var daydiff = Math.ceil(firstdayrecorded.diffDays(todayX));
var firstdaylived = new XDate(1978, 1, 9);
var dayslived = Math.ceil(firstdaylived.diffDays(todayX));
var daysremaining = 29646 - dayslived;
var todaynum = 13192 + daydiff - 1;
//console.log(daydiff);
var drawUpdate = Date.now(); //updates use user time
var heartrateUpdate = Date.now(); //updates use user time
var fps = 20;
var t = 0;
var heartrate = 74;
var beatarray = [];
var dayavgbeat = {};


$("p#heartrate").text(heartrate + " bpm");
//$("p#time").text(yesterday);
// $("p#time").text(("0" + yesterday.getDate()).slice(-2)+ " " + yesterday.getMonthName() + " " + yesterday.getFullYear() + " " + 
// 	yesterday.getHours() + ":" + ("0" + yesterday.getMinutes()).slice(-2) + ":" + ("0" + yesterday.getSeconds()).slice(-2) + " UTC-4");
$("p#time").text(("0" + yesterdaylocal.getDate()).slice(-2)+ " " + yesterdaylocal.getMonthName() + " " + yesterdaylocal.getFullYear() + " " + 
	yesterdaylocal.getHours() + ":" + ("0" + yesterdaylocal.getMinutes()).slice(-2) + ":" + ("0" + yesterdaylocal.getSeconds()).slice(-2));
$("p#dayslived").text(dayslived);
$("p#daysremaining").text(daysremaining);

var yesterday_url = 'getheartrateweb.php?date=' + yesterday.getFullYear() + '-' + ('0' + (yesterday.getMonth() + 1)).slice(-2) + '-' + yesterday.getDate();

$.get(yesterday_url,function(data,status) {
      beatarray = data.split(',');
      firstheartrate();
},'html');

var avghearturl = 'getavgheartrateweb.php';

$.get(avghearturl,function(data,status) {

    var lines = data.split('\n');

    for (var i=0; i<lines.length-1; i++) {
    	// console.log(lines[i]);
    	thisline = lines[i].split(',');
    	dayavgbeat[thisline[1]] = thisline[2];
    }
    // console.log(dayavgbeat);

    drawthesedays(13192, 13192 + daydiff);
    //requestAnimationFrame(update);


},'html');


//drawdays() draws all days
function drawdays() {

	for (var i=0; i<81; i++) {	//number of years
		for (var j=0;j<365;j++) { //number of days per year
			$('#days')
				.append('<div class="dayslived"></div>');
		}
	}

	$( "div.dayslived" ).each(function( index ) {
		var degree = (index%365)*.9863 + 90;
		var rad = Math.floor(index/365)*5 + 150;
		$(this).css({transform: 'rotate(' + degree + 'deg) translate(' + rad + 'px)'});
		if (index > 13219) {
			$(this).css("background", "#333333");
		}
	})

}

// drawdays();

function drawthesedays(startday, endday) {

	for (var i=0; i<endday-startday; i++) {	//number of years
		$('#days')
			.append('<div class="dayslived"></div>')
	}

	$( "div.dayslived" ).each(function( index ) {
		var thisdaynum = index + startday;
		$(this).data("daynum", thisdaynum);
		$(this).attr('data-daynum', thisdaynum);
		$(this).data("avgheartrate", dayavgbeat[thisdaynum]);
		// console.log(thisdaynum + ", " + dayavgbeat[thisdaynum.toString()]);
		// console.log($(this).data("daynum"));
		// console.log($(this).data("avgheartrate"));
		var normheartavg = ($(this).data("avgheartrate") - 65)/25; // scale between 65 and 90

		//set colors based on avg heart per day
		var scale = chroma.scale(['#480000', 'red']);
		if ( !isNaN(normheartavg) ) {
			$(this).css("background", scale(normheartavg).hex());
		}

		
		//calculate day positions
		var degree = (thisdaynum%365)*.942 + 90;
		//allow space for year text
		degree = degree + 3.15136;

		var rad = Math.floor(thisdaynum/365)*4 + 150 + 1; //1 is a magic number to get this to line up w the image

		// add month breaks
	    if ( thisdaynum%365 > 31 ) {
	      degree = degree + 0.9396781;
	    } 
	    if (thisdaynum%365 > 31+29) {
	      degree = degree + 0.9396781;
	    } 
	    if (thisdaynum%365 > 31+29+31) {
	      degree = degree + 0.9396781;
	    } 
	    if (thisdaynum%365 > 31+29+31+30) {
	      degree = degree + 0.9396781;
	    } 
	    if (thisdaynum%365 > 31+29+31+30+31) {
	      degree = degree + 0.9396781;
	    } 
	    if (thisdaynum%365 > 31+29+31+30+31+30) {
	      degree = degree + 0.9396781;
	    } 
	    if (thisdaynum%365 > 31+29+31+30+31+30+31) {
	      degree = degree + 0.9396781;
	    } 
	    if (thisdaynum%365 > 31+29+31+30+31+30+31+31) {
	      degree = degree + 0.9396781;
	    } 
	    if (thisdaynum%365 > 31+29+31+30+31+30+31+31+30) {
	      degree = degree + 0.9396781;
	    } 
	    if (thisdaynum%365 > 31+29+31+30+31+30+31+31+30+31) {
	      degree = degree + 0.9396781;
	    } 
	    if (thisdaynum%365 > 31+29+31+30+31+30+31+31+30+31+30) {
	      degree = degree + 0.9396781;
	    } 
	    if (thisdaynum%365 > 31+29+31+30+31+30+31+31+30+31+30+31) {
	      degree = degree + 0.9396781;
	    }  

	    // add decade breaks
	    if (thisdaynum > 365*2 - 1) {
	      rad = rad+1.5;
	    } 
	    if (thisdaynum > 365*12 - 1) {
	      rad = rad+1.5;
	    } 
	    if (thisdaynum > 365*22 - 1) {
	      rad = rad+5;
	    } 
	    if (thisdaynum > 365*32 - 1) {
	      rad = rad+1.5;
	    } 
	    if (thisdaynum > 365*42 - 1) {
	      rad = rad+1.5;
	    } 
	    if (thisdaynum > 365*52 - 1) {
	      rad = rad+1.5;
	    } 
	    if (thisdaynum > 365*62 - 1) {
	      rad = rad+1.5;
	    } 
	    if (thisdaynum > 365*72 - 1) {
	      rad = rad+7;
	    }      

		$(this).css({transform: 'rotate(' + degree + 'deg) translate(' + rad + 'px)'});

		//don't draw Feb 29 on non-leap years
		if (thisdaynum == (31+29+365*36)) {
			$(this).css('display','none');
		}

		if (thisdaynum == (31+29+365*37)) {
			$(this).css('display','none');
		}


	})
	
	//test selecting by data daynum
	$('*[data-daynum="' + todaynum + '"]').css("background", "red");

}

//drawthesedays(13192, 13192 + daydiff);

function update() {

	var now = Date.now(); //updates use user time

    if(now - drawUpdate > 1000/fps) {
      draw();
      drawUpdate = now;
    } 		

	if(now - heartrateUpdate > 60000) {
		var oldheartrate = heartrate;
   		var nowdate = new Date();
   		var yesterday2 = new Date(nowdate.getTime() - 24 * 3600000); //in local time
 		nowdate = nowdate.getEDT(); // finding heartrates needs EDT
		// console.log("nowdate: " + nowdate);
  		var nowminutes = nowdate.getHours()*60 + nowdate.getMinutes();
 		// console.log("nowminutes: " + nowminutes);
	   	//grab the new heartrate from beatarray
    	if (beatarray[nowminutes] != 'null') {
    		// console.log(beatarray[nowminutes]);
    		heartrate = beatarray[nowminutes];
    	} else {
    		heartrate = oldheartrate;
    	}
      	// console.log(heartrate);

      	heartrateUpdate = now;
		$("p#heartrate").text(heartrate + " bpm");
		// console.log(now);
		// var yesterday2 = new Date();
		// var yesterday2 = new Date(nowdate.getTime() - 24 * 3600000); //in EDT
		//yesterday2.setDate(now.getDate() - 1);
		// console.log(yesterday2);
		//$("p#time").text(yesterday2);
		// $("p#time").text(("0" + yesterday2.getDate()).slice(-2)+ " " + yesterday2.getMonthName() + " " + yesterday2.getFullYear() + " " + 
		// 	yesterday2.getHours() + ":" + ("0" + yesterday2.getMinutes()).slice(-2) + ":" + ("0" + yesterday2.getSeconds()).slice(-2) + " UTC-" + yesterday2.getTimezoneOffset()/60);
		$("p#time").text(("0" + yesterday2.getDate()).slice(-2)+ " " + yesterday2.getMonthName() + " " + yesterday2.getFullYear() + " " + 
			yesterday2.getHours() + ":" + ("0" + yesterday2.getMinutes()).slice(-2) + ":" + ("0" + yesterday2.getSeconds()).slice(-2));
    }

    requestAnimationFrame(update);

}

function firstheartrate() {
	var now = Date.now(); //updates use user time
	var oldheartrate = heartrate;
		var nowdate = new Date();
		var yesterday2 = new Date(nowdate.getTime() - 24 * 3600000); // in local time
		nowdate = nowdate.getEDT(); // finding heartrates needs EDT
		// console.log("nowdate: " + nowdate);
		var nowminutes = nowdate.getHours()*60 + nowdate.getMinutes();
		// console.log("nowminutes: " + nowminutes);
	//grab the new heartrate from beatarray
	if (beatarray[nowminutes] != 'null') {
		// console.log(beatarray[nowminutes]);
		heartrate = beatarray[nowminutes];
	} else {
		heartrate = oldheartrate;
	}
		// console.log(heartrate);

		heartrateUpdate = now;
	$("p#heartrate").text(heartrate + " bpm");
	// var yesterday2 = new Date(nowdate.getTime() - 24 * 3600000); //in EDT
	// var yesterday2 = new Date();
	// yesterday2.setDate(now.getDate() - 1);
	// console.log("yesterday2: " + yesterday2);
	//$("p#time").text(yesterday2);
	// $("p#time").text(("0" + yesterday2.getDate()).slice(-2)+ " " + yesterday2.getMonthName() + " " + yesterday2.getFullYear() + " " + 
	// 	yesterday2.getHours() + ":" + ("0" + yesterday2.getMinutes()).slice(-2) + ":" + ("0" + yesterday2.getSeconds()).slice(-2) + " UTC-4");
	$("p#time").text(("0" + yesterday2.getDate()).slice(-2)+ " " + yesterday2.getMonthName() + " " + yesterday2.getFullYear() + " " + 
		yesterday2.getHours() + ":" + ("0" + yesterday2.getMinutes()).slice(-2) + ":" + ("0" + yesterday2.getSeconds()).slice(-2));

}

function draw() {
	//heart values via this discussion
	//http://www.wiremod.com/forum/gate-nostalgia-old-school-wiring-discussion-help/32479-simple-heart-rate.html
  	//var heartval = Math.pow(Math.sin(t),9)*Math.cos(t-0.3142);
  	//below completes one "beat" every time t~3.14*n
  	var heartval = Math.pow(Math.sin(t),11)*Math.cos(t-0.3141)+0.005*Math.sin(t*20)*Math.cos(t*5);
  	heart.style.opacity = (heartval + 0.3)/0.7; //shifted and stretched to get opacity ~between 0 and 1
	$('*[data-daynum="' + todaynum + '"]').css("opacity", (heartval + 0.3)/0.7);
	$('*[data-daynum="' + todaynum + '"]').css("height", 3 + ((heartval + 0.3)/0.7)*3);
	$('*[data-daynum="' + todaynum + '"]').css("width", 2 + ((heartval + 0.3)/0.7)*2);
  	//t += 4.0/fps; //MAGIC NUMBER gives 1 cycle per second locally
  	t += (4.0/fps)*(heartrate/60);
}

requestAnimationFrame(update);