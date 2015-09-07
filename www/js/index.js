/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
var container = document.getElementById("container");
var startX,startY;
function touchStart(event){
    //event.preventDefault();
    if(!event.touches.length) return;
    var touch = event.touches[0];
    startX = touch.pageX;
    startY = touch.pageY;
    $('.top').addClass("slideup");  
    $('#footer').addClass("slidedown");
    $('.line').addClass("slidetop");
}
container.addEventListener("touchstart",touchStart,false);
function touchEnd(event) {
         $('.top').removeClass("slideup");
         $('#footer').removeClass("slidedown");
         $('.line').removeClass("slidetop");
}
container.addEventListener("touchend", touchEnd, false);
//创建banner轮播效果
var width = document.body.clientWidth;
var i=0;
var time;
$('#banner').width(4*width);
$('.banner_1').width(width);
$('.banner_2').width(width);
$('.banner_3').width(width);
$('.banner_4').width(width);
function leftslide(){
    if($('.banner_1').offset().left==0){
        $('.circle li').eq(1).addClass('cur').siblings().removeClass('cur');  
        $('.banner_1').animate({left:+(-width)+"px"},"slow","linear",function(){
            $('.banner_1').css("left",3*width+"px");
        });
    }
    else{
        $('.banner_1').animate({left:+($('.banner_1').offset().left-width)+"px"},"slow","linear");
    }
    if($('.banner_2').offset().left==0){
        $('.circle li').eq(2).addClass('cur').siblings().removeClass('cur'); 
         $('.banner_2').animate({left:+(-width)+"px"},"slow","linear",function(){
            $('.banner_2').css("left",3*width+"px");
        });
    }
    else{
        $('.banner_2').animate({left:+($('.banner_2').offset().left-width)+"px"},"slow","linear");
    }
    if($('.banner_3').offset().left==0){
        $('.circle li').eq(3).addClass('cur').siblings().removeClass('cur'); 
         $('.banner_3').animate({left:+(-width)+"px"},"slow","linear",function(){
            $('.banner_3').css("left",3*width+"px");
        });
    }
    else{
        $('.banner_3').animate({left:+($('.banner_3').offset().left-width)+"px"},"slow","linear");
    }
    if($('.banner_4').offset().left==0){
        $('.circle li').eq(0).addClass('cur').siblings().removeClass('cur'); 
         $('.banner_4').animate({left:+(-width)+"px"},"slow","linear",function(){
            $('.banner_4').css("left",3*width+"px");
        });
    }
    else{
        $('.banner_4').animate({left:+($('.banner_4').offset().left-width)+"px"},"slow","linear");
    }
}
function rightslide(){
    if($('.banner_1').offset().left==(3*width)){
        $('.banner_1').css("left",(-width)+"px");
        $('.circle li').eq(0).addClass('cur').siblings().removeClass('cur');  
        $('.banner_1').animate({left:+0+"px"},"slow","linear");
    }
    else{
        $('.banner_1').animate({left:+($('.banner_1').offset().left+width)+"px"},"slow","linear");
    }
    if($('.banner_2').offset().left==(3*width)){
        $('.banner_2').css("left",(-width)+"px");
        $('.circle li').eq(1).addClass('cur').siblings().removeClass('cur'); 
         $('.banner_2').animate({left:+0+"px"},"slow","linear");
    }
    else{
        $('.banner_2').animate({left:+($('.banner_2').offset().left+width)+"px"},"slow","linear");
    }
    if($('.banner_3').offset().left==(3*width)){
        $('.banner_3').css("left",(-width)+"px");
        $('.circle li').eq(2).addClass('cur').siblings().removeClass('cur'); 
         $('.banner_3').animate({left:+0+"px"},"slow","linear");
    }
    else{
        $('.banner_3').animate({left:+($('.banner_3').offset().left+width)+"px"},"slow","linear");
    }
    if($('.banner_4').offset().left==(3*width)){
        $('.banner_4').css("left",(-width)+"px");
        $('.circle li').eq(3).addClass('cur').siblings().removeClass('cur'); 
         $('.banner_4').animate({left:+0+"px"},"slow","linear");
    }
    else{
        $('.banner_4').animate({left:+($('.banner_4').offset().left+width)+"px"},"slow","linear");
    }
}
function lunbo(){
    leftslide(); 
}
var m=42;
function msTime(){
    var date = new Date();
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    if(m==-1) m=59;
    $('.minute').html(m);
    if((59-sec)==0) m--;
    $('.hour').html(hour);
    $('.second').html(59-sec);
}
window.onload=function(){
    $('.banner_1').css("left",0+"px");
    $('.banner_2').css("left",width+"px");
    $('.banner_3').css("left",2*width+"px");
    $('.banner_4').css("left",3*width+"px");
    time=setInterval(function(){lunbo();},3000);
    msTime();
    setInterval(function(){msTime();},1000);
}
var banner = document.getElementById("banner");
var x=0,y=0;
function touchMove(event) {
         //event.preventDefault();
         if (!event.touches.length) return;
         var touch = event.touches[0];
         x = touch.pageX - startX;
         y = touch.pageY - startY;
         clearInterval(time);
}
 
banner.addEventListener("touchmove", touchMove, false);


function touchEnd1(event) {
        if(x>0){
            rightslide();   
         }
         else{
            leftslide();
         }
        time=setInterval(function(){lunbo();},3000);
        x=0;
        y=0;
}
banner.addEventListener("touchend", touchEnd1, false);
//  帮你省  4个模块
$('.its').width(2*(width-20));
$('.its img').width(width-20);
var x=0;
$('.bg_bns_4 a').click(function(){
    var flag = $(this).attr('data');
    var chs = $('.ex-container').find("img").each(function(){
        if($(this).attr('class')==flag){x=1;}
    });
    $('.ex-container img').siblings().removeClass('show');
    if(x==1){
        $("img[class="+flag+"]").removeClass("show");
        $("img[class="+flag+"]").addClass("show");
        x=0;
    }
    else{
        $('.blank').addClass("show");
    }
    $('.ex-container').addClass('slidein');
});

$('.ex-container .back').click(function(){
    $('.ex-container').removeClass('slidein');
});



