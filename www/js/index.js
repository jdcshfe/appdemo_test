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
        StatusBar.styleLightContent();
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
        bannerauto:0,
        topLate:false,
        topLateID:-1,
        bannerTouchType:"left",
        init:function(){
            var me = this;
            //初始化
            app.initialize();
            me.handTouch();
            me.initBanner();
            me.bannerTouch();
            me.bnsBlock();
            me.countDown();
            me.initKcbfb();
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
                    if(!me.topLate){
                        $('.top').addClass("slideup"); 
                        $('.top .wrap').addClass('slideup');
                        $('#footer').addClass("slidedown");
                        $('.line').addClass("slidetop");
                        me.topLate=true;
                    }
                }
            });
            $('#container').on('touchend',function(e){
                clearTimeout(me.topLateID);
                me.topLateID=setTimeout(function(){
                    $('.top').removeClass("slideup");
                    $('.top .wrap').removeClass("slideup");
                    $('#footer').removeClass("slidedown");
                    $('.line').removeClass("slidetop");
                    me.topLate=false;
                },1000);
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
                //me.bannerSwipeRight();
            },3000);
        },
        //banner定位
        bannerPosition:function(index){
            var me = this;
            $('.banner_img').css({
                '-webkit-transform': 'translateX('+(-index*me.winWidth)+'px)',
                'transform': 'translateX('+(-index*me.winWidth)+'px)'
            });
        },
        //banner手触左划实现
        bannerSwipeLeft:function(){
            var me = this;
            var bannerMax = $('#banner').find('li').length-2;
            var index = me.bannerIndex + 1;
            if(index>bannerMax){
                me.bannerIndex = 0;
                index = me.bannerIndex + 1;
                $('.banner_img').removeClass('active');
                $('.banner_img').css({
                '-webkit-transform': 'translateX('+0+'px)',
                'transform': 'translateX('+0+'px)'
                });
                setTimeout(function(){
                    $('.banner_img').addClass('active');
                    me.bannerPosition(index);
                    $('.circle').find('li').eq(index).addClass('cur').siblings().removeClass('cur');
                    $('.bg_img').find('span').eq(index).addClass('cur').siblings().removeClass('cur');
                },10);
            }
            else me.bannerPosition(index);
            if(index==bannerMax) index=0;
            $('.circle').find('li').eq(index).addClass('cur').siblings().removeClass('cur');
            $('.bg_img').find('span').eq(index).addClass('cur').siblings().removeClass('cur');
            me.bannerIndex++;
        },
        //banner手触右划实现
        bannerSwipeRight:function(){
            var me = this;
            var bannerMax = $('#banner').find('li').length-2;
            var index = me.bannerIndex-1;
            if(index<-1){
                me.bannerIndex = bannerMax-1;
                index = me.bannerIndex-1;
                $('.banner_img').removeClass('active');
                $('.banner_img').css({
                '-webkit-transform': 'translateX('+(-bannerMax+1)*me.winWidth+'px)',
                'transform': 'translateX('+(-bannerMax+1)*me.winWidth+'px)'
                });
                setTimeout(function(){
                    $('.banner_img').addClass('active');
                    me.bannerPosition(index);
                    $('.circle').find('li').eq(index).addClass('cur').siblings().removeClass('cur');
                    $('.bg_img').find('span').eq(index).addClass('cur').siblings().removeClass('cur');
                },10);
            }
            else me.bannerPosition(index);
            if(index==-1) index=bannerMax-1;
            $('.circle').find('li').eq(index).addClass('cur').siblings().removeClass('cur');
            $('.bg_img').find('span').eq(index).addClass('cur').siblings().removeClass('cur');
            me.bannerIndex--;
        },
        //手指触摸滑动banner
        bannerTouch:function(){
            var me = this;
            var hammertime = new Hammer(document.getElementById("banner"));
            hammertime.on("panleft panright",function(e){
                //console.log(me.bannerIndex);
                clearInterval(me.bannerauto);
                switch(e.type){
                    case 'panleft': me.bannerTouchType="left"; break;
                    case 'panright': me.bannerTouchType="right"; break;
                }
            });
            hammertime.on("panend", function(e){
                if(me.bannerTouchType=="left") me.bannerSwipeLeft();
                else me.bannerSwipeRight();
                me.bannerauto = setInterval(function(){me.bannerSwipeLeft();},3000);
            });
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
                status
                setTimeout(function(){
                    StatusBar.styleDefault();    
                },300);
            });
            $('.ex-container .back').click(function(){
                $('.ex-container').removeClass('slidein');
                StatusBar.styleLightContent();
            });
        },
        //秒杀倒计时的实现 2015－09-12 12:00
        countDown:function(){
            var time = setInterval(function(){
                var me = this;
                var now = new Date(); 
                var endDate = new Date(2015,08,12,12,00,00); 
                var leftTime=endDate.getTime()-now.getTime(); 
                var leftsecond = parseInt(leftTime/1000);  
                var hour=Math.floor(leftsecond/3600); 
                var minute=Math.floor((leftsecond-hour*3600)/60); 
                var second=Math.floor(leftsecond-hour*3600-minute*60);
                if(hour>99) $('.ms_time span').width("34%");
                if(0<=hour&&hour<10) hour="0"+hour;
                if(0<=minute&&minute<10) minute="0"+minute;
                if(0<=second&&second<10) second="0"+second;
                if(hour==0&&minute==0&&second==0) clearInterval(time);
                $('.ms_time .hour').html(hour);
                $('.ms_time .minute').html(minute);
                $('.ms_time .second').html(second);
            },-1000);
        },
        //初始化库存百分比
        initKcbfb:function(){
            var me = this;
            var wid = (me.winWidth-20)/3;
            var text=null;
            $('.kcbfb span').css({
                'width':+wid*0.8+'px',
                'margin':'0 '+wid*0.1+'px'
            });
            setInterval(function(){
                me.kcbfbSwipe();
            },1000);
        },
        //商品秒杀库存百分条效果实现
        kcbfbSwipe:function(){
            var me =this;
            var num = $('.kcbfb').find('span').length;
            for(var i=0;i<num;i++){
                text = $('.kcbfb').find('span').eq(i).find('em').eq(0).html();
                //console.log($('.kcbfb').find('span').eq(2).offset().left);
                if($('.kcbfb').find('span').eq(i).offset().left<300){
                    $('.kcbfb').find('span').eq(i).find('i').eq(0).css({
                    'opacity':'1',
                    'width': text
                    });
                    $('.kcbfb').find('span').eq(i).find('em').eq(0).css({
                    'left': text
                    });
                }
            }
        }
    };
    apptestDom.init();
});



