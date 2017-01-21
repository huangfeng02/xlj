// pages/index/index.js
var app = getApp()
var util = require('../../utils/util.js');

Page({
  data:{
      bannerList:'',
      themeList:'',
      list:'',
      city:'深圳市'
  },
    getCity:function(){
        wx.navigateTo({
            url: '../city/index'
        })
    },
  onLoad:function(options){

      var name=options.name;
      console.log('name='+name)
      if(typeof(name)=="undefined"||name==null){
          name="深圳市";
      }
      wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 10000,
          success:function(){

          }
      })
      var _this=this;
      wx.request({
          url: 'https://xunluji.com/activity/list',
          header: {
              'content-type': 'application/json'
          },
          data:{
              keyword:name,
              page:1
          },
          success: function(res) {
              wx.hideToast()
              var arg2=[1,3,5,6]
              var data=res.data.result;
             // console.log(JSON.stringify(data))
              arg2 =arg2.map(function(item,index){
                 return ++item;
              });
              console.log(arg2)
              //util.reverse(data.deadTime,0)


              _this.setData({
                  bannerList:data.bannerList,
                  themeList:data.themeList,
                  list:data.list
              })
          },
          complete: function(res) {

          },
          fail: function(res) {
              //console.log(JSON.stringify(res))
          }

      })

    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
      app.loginWx()
      try {
          var value = wx.getStorageSync('city')
          if (value) {
              this.setData({
                  city:value
              })
          }
      } catch (e) {
      }

    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})