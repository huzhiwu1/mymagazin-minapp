// pages/type/index.js
let request = require("../../utils/request");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let typeId = options.typeid;
    let that = this;

    typeId = (typeId + 1) % 3;
    console.log(typeId)
    // wx.request({
    //   url: "https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getArticleTypeTitleInfo/" + typeId,
    //   // type:"GET",
    //   success: function (res) {
    //     if (res.data.code == 0) {
    //       // console.log(res);
    //       that.setData({
    //         headerData: res.data.data,
    //       })
    //     }else{
    //       wx.showToast({
    //         title:"请求错误",
    //         icon:"none"
    //       })
    //     }

    //   },
    //   fail:function(){
    //     wx.showToast({
    //       "title":"请求错误",
    //       icon:"none",
    //     })
    //   }
    // });
    request({
      url:"/getArticleTypeTitleInfo/" + typeId,
      success:function(res){
        that.setData({
          headerData:res,
        })
      }
    })
    request({
      url: "/getArticleTypeList/" + typeId,
      success: function (res) {
        console.log(res);
        that.setData({
          articleList: res,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})