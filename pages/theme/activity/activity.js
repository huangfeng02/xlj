// pages/index/index.js
var app = getApp()
var util = require('../../../utils/util.js');
var WxParse = require('../../../utils/wxParse/wxParse.js');

Page({
    data:{
        imgUrl:'',//头部大图
        content:'',//内容
        title:'',//标题
        priceAdult:'',//成人价格
        priceChild:'',//小孩价格
        priceExtro:0,//单房差价
        score:0,//路费抵扣
        days:'',//天数
        extent:'',//里程
        carNum:'',//参与车辆
        seat:'',//剩余座位
        priceCar:'',//拼车价格
        deadTime:'',//报名截止
        experienceContent:'',//沿途体验
        noticeJson:'',//参加需知
        userContent:'没有简介',//领队简介
        activityCount:'',//组织过多少次活动
        name:'',//组织者名字
        avatarUrl:'',//组织者头像
        contentList:'',//行程安排
        hasOwners:false,//是否有车主拼车
        owners:'',//车主数量
        ownersList:'',//车主
        activityId:'',//活动id
        phone:''//组织者电话
    },
    callPhone:function(event){
       var phoneNum=  event.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: phoneNum
        })
    },
    onLoad:function(options){
        var activityId=options.activityId;
        this.setData({
            activityId:activityId
        })
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000,
            success:function(){

            }
        })
        var _this=this;

        wx.request({
            url: 'https://xunluji.com/activity/detial',
            header: {
                'content-type': 'application/json'
            },
            data:{
                activityId:activityId
            },
            success: function(res) {
                wx.hideToast()
                var data=res.data.result;
                var expressionList=data.expressionList,expLen=expressionList.length,expBuff=[];
                for(var i=0;i<expLen;i++){
                    var imgBuff=[];
                    if(expressionList[i].imgUrl!=null&&expressionList[i].imgUrl.length>0){
                        var imgList=expressionList[i].imgUrl.split(","),imgLen=imgList.length;
                        for(var k=0;k<imgLen;k++){
                            imgBuff.push('<img src="'+imgList[k]+'"/>');
                        }
                       // console.log(imgBuff.join(''))
                    }
                    expBuff.push(imgBuff.join('')+'<p style="padding-bottom: 10px;">'+expressionList[i].content+'</p>')
                }

                WxParse.wxParse('article', 'html', expBuff.join(''), _this,5);

                _this.setData({
                    imgUrl:data.imgUrl,
                    content:data.content,
                    title:data.title,
                    priceAdult:data.priceAdult,
                    priceChild:data.priceChild,
                    days:data.days,
                    extent:data.extent,
                    carNum:data.carNum,
                    seat:data.seat,
                    priceCar:data.priceCar,
                    deadTime:util.reverse(data.deadTime,0),
                    noticeJson:data.noticeJson,
                    userContent:data.userContent,
                    activityCount:data.activityCount,
                    name:data.name,
                    avatarUrl:data.avatarUrl,
                    contentList:data.contentList,
                    phone:data.phone,
                    priceExtro:data.priceExtro,
                    score:data.score
                })

            },
            complete: function(res) {

            },
            fail: function(res) {
            }

        })

        // 页面初始化 options为页面跳转所带来的参数
    },
    onReady:function(){
        // 页面渲染完成
    },
    onShow:function(){
        // 页面显示
    },
    onHide:function(){
        // 页面隐藏
    },
    onUnload:function(){
        // 页面关闭
    }
})