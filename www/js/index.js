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

//appdemo_test
$(function(){
    var apptestDom = {
        startX: 0,
        startY: 0,
        winWidth: document.body.clientWidth,
        bannerIndex: 0,
        bannerauto:null,
        init:function(){
            var me = this;
            //初始化
            app.initialize();
            me.handTouch();
            me.initBanner();
            me.bnsBlock();
        },
        //页眉和页脚交互实现
        handTouch:function(){
            var me = this;
            $('#container').on('touchstart',function(e){
                if(!e.touches.length) return;
                var touch = e.touches[0];
                me.startX = touch.pageX;
                me.startY = touch.pageY;
            });
            $('#container').on('touchmove',function(e){
                if (!e.touches.length) return;
                var touch = e.touches[0];
                x = touch.pageX - me.startX;
                y = touch.pageY - me.startY;
                //console.log(me.startY+","+touch.pageY);
                if(Math.abs(y)>Math.abs(x)){
                    $('.top').addClass("slideup");  
                    $('#footer').addClass("slidedown");
                    $('.line').addClass("slidetop");
                }
            });
            $('#container').on('touchend',function(e){
                $('.top').removeClass("slideup");
                $('#footer').removeClass("slidedown");
                $('.line').removeClass("slidetop");   
            });
        },
        //banner初始化
        initBanner:function(){
            var me = this;
            var length = $('#banner').find('li').length;
            //初始化时，分别给第一个banner和最后一个banner克隆一个，用于banner走马灯设计
            if(length>1) $('#banner').append($('#banner').find('li').eq(0).clone());
            if(length>1) $('#banner').prepend($('#banner').find('li').eq(length-1).clone());
            length = $('#banner').find('li').length;
            $('#banner').width(length*me.winWidth);
            $('#banner li').width(me.winWidth);
            //设置banner初始位置
            $('.banner_img').animate({
                'left': +(-me.winWidth)+'px',
            },0,function(){
                $('.banner_img').addClass('active');
            });
            me.bannerAuto();
        },
        //banner自动轮播实现
        bannerAuto:function(){
            var me = this;
            var bannerMax = $('#banner').find('li').length-2;
            clearInterval(me.bannerauto);
            me.bannerauto = setInterval(function(){
                me.bannerSwipeLeft();
            },3000);
        },
        //banner手触左划实现
        bannerSwipeLeft:function(){
            var me = this;
            var bannerMax = $('#banner').find('li').length-2;
            var index = me.bannerIndex + 1;
            if(index>=bannerMax){
                me.bannerIndex = 0;
                index = me.bannerIndex + 1;
                $('.banner_img').css({
                '-webkit-transform': 'translateX('+(-index*me.winWidth)+'px)',
                'transform': 'translateX('+(-index*me.winWidth)+'px)'
                });
                me.bannerIndex++;
            }
            else{
                //console.log(me.bannerIndex);
                $('.banner_img').css({
                '-webkit-transform': 'translateX('+(-index*me.winWidth)+'px)',
                'transform': 'translateX('+(-index*me.winWidth)+'px)'
                });
                me.bannerIndex++;
            }
            if(index==bannerMax) index=0;
            $('.circle').find('li').eq(index).addClass('cur').siblings().removeClass('cur');
            //console.log(me.bannerIndex);
            if(me.bannerIndex==(bannerMax)){
                    $('.banner_img').removeClass('active');
                    $('.banner_img').css({
                        '-webkit-transform': 'translateX('+0+'px)',
                        'transform': 'translateX('+0+'px)'
                    });
                    setTimeout(function(){
                        $('.banner_img').addClass('active');
                        //alert(1);   
                    },600);
                }
        },
        //banner手触右划实现
        bannerSwipeRight:function(){

        },
        //帮你省模块实现
        bnsBlock:function(){
            var me = this;
            var x=0;
            $('.its').width(2*(me.winWidth-20));
            $('.its img').width(me.winWidth-20);
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
        }
    };
    apptestDom.init();
});



