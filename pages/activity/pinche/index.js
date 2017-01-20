var app = getApp()
Page({
    data: {
        priceAdult: 100,//大人价格
        priceChild: 50,//小孩价格
        agio: 50,//单房差
        carpool: 50,//拼车单价/人
        carpoolCost: 50,//拼车费
        deductible: 50,//路费抵扣
        totalPrice: 0,//费用合计
        people: 0,//拼车人数
        peopleAdult: 0,//大人
        priceChild: 0,//小孩
        peopleChild: 0,//小孩
    },
    cutAdult: function () {
     this.setData({
         peopleAdult:++this.data.peopleAdult
     })
    }

})
