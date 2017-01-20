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
        discountClass:"icon-agree"//是否选中了路费抵扣 默认选中
    },
    onLoad:function(options){
        console.log(JSON.stringify(options))

        var _this=this;
        this.setData({
            activityId:options.activityId,
            priceAdult:options.priceAdult,
            priceChild:options.priceChild,
            deductible:options.score,//路费抵扣
            agio:options.priceExtro//单房差价
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
        if(this.data.priceAdult!=0&&(this.data.priceAdult%2!=0)){
            if(this.data.agio>0){//可以拼房
                if(n>0){
                   // $("#show_pf_1").addClass("current")
                   // $("#show_pf_0").removeClass("current")
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
        }else{
            this.setData({
                pintxt:''
            })
            this.data.totlePrice = this.data.peopleAdult*this.data.priceAdult+this.data.peopleChild*this.data.priceChild;
        }

       /* if($("#show_pf_1").hasClass("current")){
            totlePrice=totlePrice+parking;
        }else{
            if(!(numAdult%2)){
                totlePrice=totlePrice+parking;
            }else{
                totlePrice=totlePrice+spreadPrice+parking;
            }
        }*/

        var savePrice=0;
        if (this.data.peopleAdult > 0 || this.data.peopleChild > 0) {
            if (this.data.discountClass=="icon-no-agree") {
                this.setData({
                    showDeductible:false
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
                //this.data.totlePrice = this.data.totlePrice - savePrice;
                this.setData({
                    totalPrice:this.data.totlePrice - savePrice,
                    showDeductible:true
                })
            }
        }else{
            this.setData({
                totalPrice:0,
                deductible:0,
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
        var integral =  this.data.deductible;
        //var seat = $("#seat").html();
        var room = '';
        if ($("#show_pf_1").hasClass('current')) {
            room = parseInt($("#adultNum").html()) / 2;
        } else {
            room = Math.ceil(parseInt($("#adultNum").html()) / 2);
        }

        var discount=0;
        if ($(".icon-unselected").length ==0) {
            discount = parseInt($("#minusPrice").html());
        }
        var isCar=1;
        var seat=0;
        if(adult==0){
            utils.alertMsgTip("参加成人数不能为0")
            return;
        }

        if(adult==0&&child==0){
            utils.alertMsgTip("参加人数不能为0")
            return;
        }

        if(isAgree==0){
            utils.alertMsgTip("未同意服务条款")
            return;
        }

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


        $.ajax({
            url: "/wxpay/getOrderId",
            data:{
                "ordersJson":ordersJson
            },
            dataType:"json",
            success: function(data){
                if(data.status == 201){
                    utils.alertMsgTip(data.message);
                    return;
                }
                var orderId=data.data.orderId;
                if(utils.browser.versions.mobile){
                    if(utils.browser.versions.weiXin){
                        $.ajax({
                            url: "/wxpay/prepay?orderId="+orderId+"&openId="+$("#openId").val(),
                            dataType:"json",
                            success: function(xhr){
                                //alert(JSON.stringify(xhr))
                                xhr = xhr.data;
                                function onBridgeReady() {
                                    WeixinJSBridge.invoke('getBrandWCPayRequest', {
                                        "appId"     : xhr.appId,            //公众号名称，由商户传入
                                        "timeStamp" : xhr.timeStamp,          //时间戳，自1970年以来的秒数
                                        "nonceStr"  : xhr.nonceStr,           //随机串
                                        "package"   : xhr.package,
                                        "signType"  : xhr.signType,        //微信签名方式:
                                        "paySign"   : xhr.paySign        //微信签名
                                    }, function(res) {
                                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                                        } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                                        else{
                                            // alert("支付失败")
                                        }
                                    });
                                }

                                if (typeof WeixinJSBridge == "undefined") {
                                    if (document.addEventListener) {
                                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady,false);
                                    } else if (document.attachEvent) {
                                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                    }
                                } else {
                                    onBridgeReady();
                                }
                                pollingInterval = setInterval(function () {
                                    polling(orderId)
                                }, 2000)
                            }
                        })
                    }else{
                        //  location.href='/pay/zfb_wap?orderId='+orderId
                    }
                }else{
                    //window.location.href = '/pay/center?orderId='+orderId
                }



            }
        })



    }

})
