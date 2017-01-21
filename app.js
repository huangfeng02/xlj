//app.js
App({
    onLaunch: function () {

    },
    getUserInfo: function (cb) {

    },
    loginWx:function(){
        var _this=this;
        wx.login({
            success: function (res) {
                var code = res.code;
                console.log('res='+JSON.stringify(res))
                wx.getUserInfo({
                    success: function (res) {
                        var encryptedData = res.encryptedData;
                        var iv = res.iv;
                        console.log('encryptedData='+encryptedData)
                        console.log('iv='+res.iv)
                        wx.request({
                            url: _this.host+"/wx/applet/login?code="+code,
                            header: {
                                'content-type': 'application/json'
                            },
                            success: function(res) {
                                if(res.data.status==200){
                                    var openid=res.data.data.openid
                                    var sid=res.data.data.sid;
                                    if(sid==""||sid==null){
                                        wx.navigateTo({
                                            url: '/pages/user/login/index?openid='+openid+'&encryptedData='+encryptedData+'&iv='+iv
                                        })
                                    }else{

                                    }

                                }
                            },
                            fail: function(res) {

                            }
                        })
                    }
                })
            }
        });
    },

    globalData: {
        userInfo: null
    },
    host: "https://xunluji.com"

})