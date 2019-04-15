// pages/content/content.js
let request = require("../../utils/request");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      "/image/list/article/1.png",
      "/image/list/article/2.png",
      "/image/list/article/3.png"
    ],
    articleDetail:{},
    poster:true,
    playing:false,
    currentTime:0,
    currentPercent:0,
    progressWidth:520,
    percentCircleLeft:0,
    audioCirleOriginX:0,
    audioCircleMoveX:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.getData(options.id);
  },
  getData:function(id){
    let that = this;
    request({
      url:"/getArticleDetail/"+id,
      success:function(res){
        that.setData({
          articleDetail:res,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  onplay:function(){
    let videoContext = wx.createVideoContext("video",this);
    console.log(videoContext);
    videoContext.play();
    var poster = !this.data.poster;
    this.setData({
      poster:poster,
    })
    
  },
  audioPlay:function(){
    let bgaudio = wx.getBackgroundAudioManager();
    let audioData = this.data.articleDetail.audio;
    bgaudio.src=audioData.src;
    bgaudio.singer = audioData.singer;
    bgaudio.title = audioData.title;
    
    this.listenAudioPlay();
    this.updateAudioData();
  },
  onAudioPlay:function(){
    let bgaudio = wx.getBackgroundAudioManager();
    let playing = this.data.playing;
    // 必须添加歌手的其他信息，单纯只有播放源会失败

   
    if(playing){
      bgaudio.pause();
    }else{
      // let src = this.data.articleDetail.audio.src;
      // bgaudio.src=src;
      // bgaudio.singer = this.data.articleDetail.audio.singer;
      // bgaudio.title = this.data.articleDetail.audio.title;
      this.audioPlay()
    }
    this.setData({
      playing:!playing,
    })
    // this.listenAudioPlay();
    // this.updateAudioData();
  },
  listenAudioPlay:function(){
    let that = this;
    let bgaudio = wx.getBackgroundAudioManager();
    bgaudio.onPause(function(){
      that.setData({
        playing:false,
      })
    })
    bgaudio.onStop(function(){
      that.setData({
        playing:false,
      })
    })
    bgaudio.onEnded(function(){
      that.setData({
        playing:false,
      })
    })
    bgaudio.onPlay(function(){
      that.setData({
        playing:true,
      })
    })
  },
  updateAudioData:function(){
    let bgaudio = wx.getBackgroundAudioManager();
    let that = this;
    let duration = this.data.articleDetail.audio.duration;
    let width = this.data.progressWidth;
    bgaudio.onTimeUpdate(function(){
      let currentTime = bgaudio.currentTime;
      let currentPercent = (currentTime/duration)*100

      let percentCircleLeft = (currentTime/duration)*width
      that.setData({ 
        currentTime:bgaudio.currentTime.toFixed(),
        currentPercent:currentPercent,
        percentCircleLeft:percentCircleLeft,
      })
    })
  },
  onAudioCircleStart:function(e){
    console.log(e.touches[0].pageX)
    let audioCircleOriginX = (e.touches[0].pageX)*this.getPhoneRadio()
    this.setData({
      audioCircleOriginX:audioCircleOriginX,
    })
  },
  onAudioCircleMove:function(e){
   
    
    let moveX = e.touches[0].pageX*this.getPhoneRadio();
    
    let originX = this.data.audioCircleOriginX;
    let duration = this.data.articleDetail.audio.duration;
    let moveWidth = (moveX-originX);
    console.log("moveWidth"+moveWidth)
    let newPercentCircleLeft = moveWidth+this.data.audioCircleOriginX-84*this.getPhoneRadio();;
   
    if(newPercentCircleLeft<=0){
      newPercentCircleLeft=0
    }
    if(newPercentCircleLeft>=this.data.progressWidth){
      newPercentCircleLeft=this.data.progressWidth
    }
    this.setData({
      percentCircleLeft:newPercentCircleLeft,
      currentPercent:(newPercentCircleLeft/this.data.progressWidth)*100
    })
    let bgaudio = wx.getBackgroundAudioManager();
    // let audioData = this.data.articleDetail.audio;
    // bgaudio.src=audioData.src;
    // bgaudio.singer = audioData.singer;
    // bgaudio.title = audioData.title;
    this.audioPlay();
    bgaudio.seek(newPercentCircleLeft/this.data.progressWidth*duration);
  //  this.updateAudioData();
  
   
  },
  // 获取手机的像素比例，因为etoucher[0].pageX是像素值
  getPhoneRadio:function(){
    let radio=0;
    wx.getSystemInfo({
      success:function(res){
       radio = res.pixelRatio
       console.log("宽度"+res.screenWidth)
      }
    })
    return radio;
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