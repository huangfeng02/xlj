
var app = getApp()
var util = require('../../../utils/util.js');
Page({
    data: {
        reset: false,
        second: 60,
        phone: '',
        subTxt: '注册'
    },
    bindPhone: function (e) {
        this.setData({
            phone: e.detail.value
        })
    },
    countdown: function () {
        this.setData({
            reset: true,
            second: 60
        })
        var _this = this;
        _this.timeVal = setInterval(function () {
            var t = _this.data.second;
            if (t == 1) {
                _this.setData({
                    reset: false
                })
                clearInterval(_this.timeVal);
            } else {
                t--;
                _this.setData({
                    second: t
                })
            }
        }, 1000)
    },
    _sendCode: function () {
        var _this = this;
        wx.request({
            url: app.host+"/user/sendVerCode?mobile=" + this.data.phone,
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                if (res.data.status == 0) {
                    _this.countdown()
                }else{
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel:false,
                        success: function(res) {
                        }
                    })

                }
            },
            fail: function (res) {

            }

        })


    },

    formSubmit: function (e) {
        var phone = e.detail.value.phone;
        var psw = e.detail.value.password;
        var code = e.detail.value.verCode;
        var _this = this;
        var data = {
            phone: phone,
            password: psw,
            verCode: code
        }
        this.setData({
            subTxt: "提交中..."
        })
        wx.request({
            url: app.host+"/user/checkAndLogin",
            header: {
                'content-type': 'application/json'
            },
            data: data,
            success: function (res) {
                if (res.data.status == 0) {
                    wx.switchTab({
                        url:'/pages/user/index'
                    })
                }else{
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel:false,
                        success: function(res) {
                        }
                    })
                }
                _this.setData({
                    subTxt: "提交"
                })
            },
            fail: function (res) {

            }

        })


    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
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