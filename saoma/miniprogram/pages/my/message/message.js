Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    avatarUrl: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var nickName = that.data.nickName;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function (res) {
        that.data.nickName = res.userInfo.nickName,
          that.data.avatarUrl = res.userInfo.avatarUrl,
          that.setData({
            nickName: that.data.nickName,
            avatarUrl: that.data.avatarUrl,
          })
      },
      fail: function (res) {
        that.data.nickName = "未授权无法获取用户信息",
          that.setData({
            nickName: that.data.nickName
          })
      }
    })
  },
  bindFormSubmit: function (e) {
    var that = this;
    var nickName =  that.data.nickName;;
       const db = wx.cloud.database()
    db.collection('message').add({
      data: {
        textarea: e.detail.value.textarea,
        nickName: that.data.nickName,
        time: new Date()
      },
      success:function (res){
        wx.showToast({
          title: '提交成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '提交失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
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