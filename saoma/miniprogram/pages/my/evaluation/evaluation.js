var util = require('../../../utils/util.js')
const app = getApp();
//云数据库初始化
const db = wx.cloud.database({});
// 分页显示
let currentPage = 0 // 当前第几页,0代表第一页 
let pageSize = 10 //每页显示多少数据 
Page({
  data: {
    openid: '',
    time: new Date,
    comment_list: [], //这是一个空的数组，等下获取到云数据库的数据将存放在其中
    loadMore: false, //"上拉加载"的变量，默认false，隐藏  
    loadAll: false, //“没有数据”的变量，默认false，隐藏  

    // 评价图片
    starCheckedImgUrl: "https://s1.ax1x.com/2018/08/05/PDQ0it.png",
    starUnCheckedImgUrl: "https://s1.ax1x.com/2018/08/05/PDQdII.png",
  },

  /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    this.getmyComment();
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  // // 定义调用云函数获取myComment
  getmyComment() {
    wx.cloud.callFunction({
      name: 'getmyComment',
      success: res => {
        console.log('获取成功', res)

        this.setData({
          comment_list: res.result.data, //获取数据数组   
          // openid: res
        })
      },
      fail: res => {
        console.log('获取失败', res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });
    wx.showToast({
      title: '暂无评价',
    })
    // setTimeout(function () {
  
    // }, 2000)
  }

})