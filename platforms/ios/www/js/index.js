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
//创建一个新的hammer对象并且在初始化时指定要处理的dom元素
var hammertime = new Hammer(document.getElementById("container"));
         //为该dom元素指定触屏移动事件
    hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    hammertime.on("panup pandown", function (ev) {
            //控制台输出
        $('.top').addClass("slideup");  
        $('#footer').addClass("slidedown");
        $('.line').addClass("slidetop");
    });
    hammertime.on("panend", function (ev) {
            //控制台输出
        $('.top').removeClass("slideup");
        $('#footer').removeClass("slidedown");
        $('.line').removeClass("slidetop");
    });

//创建banner轮播效果
var hammerlunbo = new Hammer(document.getElementById("banner"));
var width = document.body.clientWidth;
var i=0;
var time;
$('#banner').width(4*width);
$('.banner_1').width(width);
$('.banner_2').width(width);
$('.banner_3').width(width);
$('.banner_4').width(width);
function lunbo(){
    var position = $('#banner').position().left;
    i = position/(-width)+1;
    if(i==4) {i=0}
        $('#banner').css({
        'transform':'translateX(-'+(i*width)+'px)',
        '-webkit-transform':'translateX(-'+(i*width)+'px)'
        });
    $('.circle li').eq(i).addClass('cur').siblings().removeClass('cur');  
}
hammerlunbo.on("panleft",function (ev) {
//手指左划
    var position = $('#banner').position().left;
    i = position/(-width)+1;
    clearInterval(time);
});
hammerlunbo.on("panright", function (ev) {
//手指右划
    var position = $('#banner').position().left;
    i = position/(-width)-1;
    clearInterval(time);
});
hammerlunbo.on("panend", function (ev) {
//结束
    if(0<i&&i<4){
        $('#banner').css({
            'transform':'translateX(-'+(i*width)+'px)',
            '-webkit-transform':'translateX(-'+(i*width)+'px)'
        });
        $('.circle li').eq(i).addClass('cur').siblings().removeClass('cur');
    }
    time=setInterval(function(){lunbo();},3000);
});

window.onload=function(){
    time=setInterval(function(){lunbo();},3000);
}

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



