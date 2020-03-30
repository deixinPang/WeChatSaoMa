const app = getApp();
Page({
  data: {
    openid: '',
    thumb: '',
    nickname: '',
    user: {},
    intoCount: 0,
    isCounting: false,
  },
  //进入后台
  // intoAdmin: function (e) {
  //   var _this = this;
  //   if (!this.data.isCounting) {
  //     setInterval(function () {
  //       _this.setData({
  //         intoCount: 0,
  //       })
  //     }, 3000);
  //     this.data.isCounting = true;
  //   }
  //   this.data.intoCount++;
  //   if (this.data.intoCount >= 7) {
  //     wx.navigateTo({
  //       url: '/page/admin/admin'
  //     })
  //   }
  // },
  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  initUserInfo: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'getOpenid',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid);
        console.log('[云函数] [login] user userInfo: ', res.result.userInfo);
        this.setData({
          openid: res.result.openid,
          nickName: res.result.nickName
        })
        app.globalData.openid = res.result.openid;
        wx.setStorageSync('openid', res.result.openid);
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  // // 定义调用云函数获取openid
  // getOpenid() {
  //   let page = this;
  //   wx.cloud.callFunction({
  //     name: 'getOpenid',
  //     complete: res => {
  //       console.log('openid--', res.result.openid)
  //       var openid = res.result.openid
  //       page.setData({
  //         openid: openid
  //       })
  //     }
  //   })
  // },
  onLoad() {

    var self = this;
    // 获取用户信息
    this.initUserInfo();
    this.onGetOpenid();
    // 
    if (!this.data.openid) {
      self.setData({
        //canIUse: wx.canIUse()
        canIUse: true
      })
    }
  },


})