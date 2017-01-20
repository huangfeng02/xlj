
var app = getApp()
var util = require('../../../utils/util.js');
Page({
    data: {

    },
    loginOut: function (e) {
        var userId=0;
        var data = wx.getStorageSync('userInfo')
        if (data){
            wx.request({
                url: app.host+"/push/setEmptyt?userId="+data.userId,
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    wx.removeStorageSync('userInfo');
                    console.log(111111)
                   /* wx.switchTab({
                        url: '/pages/user/index'
                    })*/
                    wx.navigateBack({
                        delta: 1
                    })
                },
                fail: function (res) {

                }

            })
        }
    },

    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    }
})