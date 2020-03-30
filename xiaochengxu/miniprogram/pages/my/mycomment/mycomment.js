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

  // //页面上拉触底事件的处理函数
  // onReachBottom: function () {
  //   console.log("上拉触底事件")
  //   let that = this
  //   if (!that.data.loadMore) {
  //     that.setData({
  //       loadMore: true, //加载中  
  //       loadAll: false //是否加载完所有数据
  //     });
  //     //加载更多，这里做下延时加载
  //     setTimeout(function () {
  //       that.getmyComment()
  //     }, 2000)
  //   }
  // },

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
      fail: res =>{
        console.log('获取失败',res)
      }
    })
  },

  // //访问网络,请求数据  
  // getData() {
  //   let that = this;
  //   //第一次加载数据
  //   if (currentPage == 1) {
  //     this.setData({
  //       loadMore: true, //把"上拉加载"的变量设为true，显示  
  //       loadAll: false //把“没有数据”设为false，隐藏  
  //     })
  //   }
  //   //云数据的请求
  // db.collection("comment")
  //     .skip(currentPage * pageSize) //从第几个数据开始
  //     .limit(pageSize)
  //     .orderBy('createTime', 'desc')
  //     .where({
  //       _openid: that.data.openid
  //     })
  //     .get({
  //       success: res =>  {
  //         if (res.data && res.data.length > 0) {
  //           console.log("请求成功", res.data)
  //           currentPage++
  //           //把新请求到的数据添加到dataList里  
  //           let list = that.data.comment_list.concat(res.data)
  //           that.setData({
  //             comment_list: list, //获取数据数组    
  //             loadMore: false //把"上拉加载"的变量设为false，显示  
  //           });
  //           if (res.data.length < pageSize) {
  //             that.setData({
  //               loadMore: false, //隐藏加载中。。
  //               loadAll: true //所有数据都加载完了
  //             });
  //           }
  //         } else {
  //           that.setData({
  //             loadAll: true, //把“没有数据”设为true，显示  
  //             loadMore: false //把"上拉加载"的变量设为false，隐藏  
  //           });
  //         }
  //       },
  //       fail(res) {
  //         console.log("请求失败", res)
  //         that.setData({
  //           loadAll: false,
  //           loadMore: false
  //         });
  //       }
  //     })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getmyComment();

    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });
  
  },
  
})