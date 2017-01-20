// pages/index/index.js
var app = getApp()
var util = require('../../utils/util.js');

Page({
  data:{
      name:'深圳',
      themeList:'',
      list:'',
      items:[],
      pageIndex:1,
      pageSize:10,
      isLoading:false,
      hasMore:true
  },
    toBack:function(event){
        var city=event.currentTarget.dataset.city;
        wx.setStorageSync('city',city)
        wx.navigateBack({
            delta: 1
        })
    },
    getPage:function(){
        var _this=this;
        if(this.data.hasMore&&!this.data.isLoading){
            this.setData({
                isLoading: true
            })
            console.log('pageIndex='+this.data.pageIndex)
            wx.request({
                url: app.host+ "/city/list?rows="+this.data.pageSize+"&page="+this.data.pageIndex,
                header: {
                    'content-type': 'application/json'
                },
                success: function(res) {
                    var len= res.data.result.list.length,list=res.data.result.list,listTemp=[];
                    if (len == 0||len<_this.data.pageSize) {
                        _this.setData({
                            hasMore: false,
                            isLoading: false
                        })
                    } else {
                        _this.setData({
                            items: _this.data.items.concat(list),
                            pageIndex: ++_this.data.pageIndex,
                            isLoading: false
                        })
                    }
                },
                fail: function(res) {

                }

            })
        }

    },
    onShow:function(){
        console.log('onShow')
    },
    scrollEventHandle: function () {
        //页面相关事件处理函数--监听页面滚动
    },
    onPullDownRefresh: function() {
        console.log('onPullDownRefresh')
    },
    initData:function(){
        var _this=this;
        wx.request({
            url: app.host+ "/city/list?rows="+this.data.pageSize+"&page="+this.data.pageIndex,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                wx.hideToast()
                var len= res.data.result.list.length,list=res.data.result.list,listTemp=[];

                if (len === 0||len<_this.data.pageSize) {
                    _this.setData({
                        hasMore: false,
                        isLoading: false
                    })
                } else {
                    _this.setData({
                        items: list,
                        pageIndex: ++_this.data.pageIndex,
                        isLoading: false
                    })
                }
            },
            fail: function(res) {

            }

        })
    },
    onLoad:function(options){
        console.log('onLoad')
        this.initData()
       /* wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000,
            success:function(){

            }
        })*/
       // this.initData();
    },
    onShow:function(){
        console.log('onShow')
    }
})