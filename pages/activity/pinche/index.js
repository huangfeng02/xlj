var app = getApp()
Page({
    data: {
        openId: '',//openId
        activityId: 0,//活动id
        priceAdult: 0,//大人价格
        priceChild: 0,//小孩价格
        agio: 0,//单房差价
        carpool: 50,//拼车单价/人
        //carpoolCost: 50,//拼车费
        deductible: 0,//路费抵扣
        totalPrice: 0,//费用合计
        people: 0,//拼车人数
        peopleAdult: 0,//大人数量
        peopleChild: 0,//小孩数量
        showType: 1,//
        pintxt: "您是否愿意拼房",
        showPinFang: false,//是否显示拼房
        showDeductible: false,//是否显示为你节省了多少钱
        discountClass:"icon-agree",//是否选中了路费抵扣 默认选中
        tabBtnYes:"tapBtn-yes",//是否选中了拼房按钮 默认选中的class
        tabBtnNo:"",//是否选中了路费抵扣 默认选中
    },
    onLoad:function(options){
        console.log(JSON.stringify(options))

        var _this=this;
        this.setData({
            activityId:options.activityId,
            priceAdult:options.priceAdult,
            priceChild:options.priceChild,
            deductible:options.score,//路费抵扣
            //agio:options.priceExtro//单房差价
            agio:100//单房差价
        })

        wx.login({
            success: function(res) {
                if (res.code) {
                    _this.setData({
                        openId:res.code
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });

    },
    tips_wp:function(n){
        console.log(this.data.agio)
        if(this.data.peopleAdult!=0&&(this.data.peopleAdult%2!=0)){
            if(this.data.agio>0){//可以拼房
                if(n>0){
                    this.setData({
                        tabBtnNo:'',
                        tabBtnYes:'tapBtn-yes'
                    })
                }
                this.setData({
                    showPinFang:true
                })
            }
        }else{
            this.setData({
                showPinFang:false
            })
        }
    },
    pinNo:function(){
        this.setData({
            tabBtnNo:'tapBtn-yes',
            tabBtnYes:''
        })
        this.getPrice()
    },
    pinYes:function(){
        this.setData({
            tabBtnNo:'',
            tabBtnYes:'tapBtn-yes'
        })
        this.getPrice()
    },
    addAdult: function () {
        this.setData({
            peopleAdult: ++this.data.peopleAdult
        })
        this.tips_wp(1)
        this.getPrice()
    },
    cutAdult: function () {

        if (this.data.peopleAdult <= 0) {
            return;
        } else {
            this.setData({
                peopleAdult:--this.data.peopleAdult
            })
        }
        this.tips_wp(1)
        this.getPrice()
    },
    addChild: function () {
        this.setData({
            peopleChild: ++this.data.peopleChild
        })
        this.tips_wp(0)
        this.getPrice()
    },
    cutChild: function () {

        if (this.data.peopleChild <= 0) {
            return;
        } else {
            this.setData({
                peopleChild:--this.data.peopleChild
            })
        }
        this.tips_wp(0)
        this.getPrice()
    },
    getPrice:function(){
        if(this.data.agio>0){//可以拼房单房差不为0
            if(this.data.peopleAdult==1){
                this.setData({
                    pintxt:'您是否愿意拼房?'
                })
            }

            if(this.data.peopleAdult>1){
                if(this.data.peopleAdult%2){
                    this.setData({
                        pintxt:'为您预订'+parseInt(this.data.peopleAdult/2)+'间房(2人/间),落单的1位是否愿意拼房?'
                    })
                }else{
                    this.setData({
                        pintxt:'为您预订'+parseInt(this.data.peopleAdult/2)+'间房(2人/间)'
                    })
                }
            }

            this.data.totlePrice = this.data.peopleAdult*this.data.priceAdult+this.data.peopleChild*this.data.priceChild;
            if(this.data.tabBtnNo=="tapBtn-yes"){
                this.data.totlePrice=this.data.totlePrice+this.data.agio;
            }
        }else{
            this.setData({
                pintxt:''
            })
            this.data.totlePrice = this.data.peopleAdult*this.data.priceAdult+this.data.peopleChild*this.data.priceChild;
        }

        var savePrice=0;
        if (this.data.peopleAdult > 0 || this.data.peopleChild > 0) {
            if (this.data.discountClass=="icon-no-agree") {
                this.setData({
                    showDeductible:false,
                    totalPrice:this.data.totlePrice
                })
            } else {
                if(this.data.deductible>(this.data.totlePrice/2)){
                    savePrice=Math.floor(this.data.totlePrice/2);
                    this.setData({
                        deductible:savePrice
                    })
                }else{
                    savePrice=this.data.deductible;
                    this.setData({
                        deductible:savePrice
                    })
                }
                this.setData({
                    totalPrice:this.data.totlePrice - savePrice,
                    showDeductible:true
                })
            }
        }else{
            this.setData({
                totalPrice:0,
                //deductible:0,
                showDeductible:false
            })

        }

    },
    discount:function(){
        //路费抵扣
        if(this.data.discountClass=="icon-agree"){
            this.setData({
                discountClass:"icon-no-agree"
            })
        }else{
            this.setData({
                discountClass:"icon-agree"
            })
        }
        this.getPrice()
    },
    submit:function(){

        var _this=this;
        var adult = this.data.peopleAdult;
        var child = this.data.peopleChild;
        var pay = this.data.totalPrice;
        var activityId =  this.data.activityId;
        var openId =  this.data.openId;
        // var integral =  this.data.deductible;
        //var seat = $("#seat").html();
        var room = '';
        if (this.data.tabBtnYes=="tapBtn-yes") {//拼房
            room = parseInt(adult) / 2;
        } else {
            room = Math.ceil(parseInt(adult) / 2);
        }

        var discount=0;//路费抵扣
        if (this.data.discountClass=="icon-agree") {
            discount = this.data.deductible;
        }

        var isCar=1;
        var seat=0;
        if(adult==0){
            console.log("大人人数不能为0")
            return;
        }

        if(adult==0&&child==0){
            console.log("参加人数不能为0")
            return;
        }

        /* if(isAgree==0){
         utils.alertMsgTip("未同意服务条款")
         return;
         }*/

        var ordersJson='{"id":"0","activityId":'+activityId+',"pay":'+pay+',"adult":'+adult+',"child":'
            +child+',"room":'+room+',"seat":'+seat+',"isCar":'+isCar+',"discount":'+discount+'}';
        console.log(ordersJson)
        wx.request({
            url: app.host + "/wxpay/getOrderId",
            header: {
                'content-type': 'application/json',
                'Cookie': wx.getStorageSync('sid')
            },
            data:{
                "ordersJson":ordersJson
            },
            success: function (res) {
                console.log(JSON.stringify(res))
                var orderId=res.data.data.orderId;
                 wx.request({
                 url: app.host +"/wxpay/prepay?orderId="+orderId+"&openId="+openId,
                 header: {
                 'content-type': 'application/json'
                 },
                 success: function(res) {

                 wx.requestPayment({
                 'timeStamp': res.data.data.timeStamp,
                 'nonceStr': res.data.data.nonceStr,
                 'package': res.data.data.package,
                 'signType': res.data.data.signType,
                 'paySign': res.data.data.paySign,
                 'success': function (res) {
                 console.log(JSON.stringify(res))
                 },
                 'fail': function (res) {
                 console.log(JSON.stringify(res))
                 }
                 })
                 console.log(res.data)
                 }
                 })


            },
            fail: function (res) {

            }
        })




    }

})
