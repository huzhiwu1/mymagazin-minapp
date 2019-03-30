// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // articleLike:{
    //   0:false,
    //   1:true,
    //   2:false,
    //   3:true,
    //   4:false,
    //   5:true,
    //   6:false,
    //   7:true
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHomeData();
    this.getArticleLike();
  },
  getArticleLike:function(){
    let articleLike = wx.getStorageSync("articleLike");
    if(!articleLike){
      articleLike = {}
    }
    this.setData({
      articleLike:articleLike,
    })
  },
  getHomeData:function(){
    var that = this;
    wx.request({
      url:"https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/home",
      type:"GET",
    
      success:function(res){
        that.setData({
          articleList:res.data.articleList,
          markType:res.data.markType,
          recommend:res.data.recommend,
        })
      }
    })
  },
  showMore:function(e){
    console.log(e);
    let type = e.currentTarget.dataset.articletype
    wx.showActionSheet({
      itemList:['内容过期了','内容和'+type+'不相关','不再显示来自'+type+'的内容']
    })
  },

  onLike:function(e){
    console.log(e.currentTarget)
    let articleIndex = e.currentTarget.dataset.articleindex;
    let isLike = this.data.articleLike[articleIndex];
    this.data.articleLike[articleIndex] = !isLike;
    this.setData({
      articleLike:this.data.articleLike
    })
    wx.setStorageSync("articleLike",this.data.articleLike)
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
    // wx.showToast({
    //   title:"测试消息框",
    //   icon:"success",
    //   duration:2000,
    //   success:function(){
    //     console.log("success");
    //   },
    //   fail:function(){
    //     console.log("fail");
    //   },
    //   complete:function(){
    //     console.log("complete")
    //   }
    // })
    // wx.showModal({
    //   title:"模拟对话框",
    //   content:"这里是内容",
    //   showCancel:true,//是否显示取消按钮
    //   cancelText:'这是取消',//取消按钮的文字
    //   cancelColor:'#000',//取消按钮的颜色
    //   confirmText:"确定吗",//确定按钮的文字
    //   confirmColor:'#fff',//确定按钮的颜色
    //   success:function(res){
    //     console.log(res.confirm);//确认则是true
    //     console.log(res.cancel);//取消则是false
    //   },

    // })
    // wx.showLoading({
    //   title:"提示内容",
    //   mask:true,//显示透明蒙层
    //   success:function(){
    //     console.log("success");
    //   }
    // })
    // setTimeout(function(){
    //   wx.hideLoading();//必须主动隐藏loading模拟框
    // },2000)

    // wx.showActionSheet({
    //   itemList:['首页','读书','天气'],//按钮组
    //   itemColor:'#0077ff',//按钮的颜色
    //   success:function(res){
    //     console.log(res.tapIndex);//知道用户按的按钮的序号
    //   },
    //   fail:function(res){
    //     console.log(res.errMsg)
    //   }
    // })
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