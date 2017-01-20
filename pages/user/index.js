// pages/mine/index.js
var app = getApp()
var util = require('../../utils/util.js');
Page({
  data:{
      userId:0,//用户id
      name:'请先登录',//昵称
      avatarUrl:'',//头像
      phone:'',//电话
      focusUser:0,//关注
      join:0,//参加
      organized:0,//组织
      integral:0,//积分 路费？
      content:'',//描述？
  },

   getUserInfo:function(){
       var _this=this;
       wx.request({
           url: app.host+"/user/info/show?userId="+this.data.userId,
           header: {
               'content-type': 'application/json'
           },
           success: function (res) {
               var data = res.data.result;
               _this.setData({
                   userId: data.userId,
                   name: data.name,
                   phone: data.phone,
                   avatarUrl: data.avatarUrl,
                   focusUser: data.focusUser,
                   join: data.join,
                   organized: data.organized,
                   integral: data.integral,
                   content: data.content
               })
           },
           fail: function (res) {

           }

       })

   },
  onLoad:function(options){

     /* try {
          var value = wx.getStorageSync('key')
          if (value) {
          }
      } catch (e) {
      }*/


  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
      console.log('onShow');
      var _this=this;
      wx.getStorage({
          key: 'userInfo',
          success: function(res) {
              console.log(JSON.stringify(res.data))
              _this.setData({
                  userId: res.data.userId
              })
              _this.getUserInfo()
          },
          fail:function(res){

              console.log('未登录')
              _this.setData({
                  userId: '',
                  name: '立即登录',
                  phone: '',
                  avatarUrl: '',
                  focusUser: 0,
                  join: 0,
                  organized: 0,
                  integral: 0,
                  content: ''
              })
          }
      })

    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})