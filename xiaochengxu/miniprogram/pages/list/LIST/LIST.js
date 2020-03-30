//index.js
//获取应用实例
// const app = getApp()

Page({
  data: {
    TabCur: 0,
    scrollLeft: 0,


    list: '',
    word: '',
    message: ''
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
 
houduanButton1:function(){
  var that = this;
  wx.request({
    url: 'http://localhost:443/getUser',
    method : 'GET',
    header : {
      'content-type': 'application/json'
    },
    success: function(res){
      console.log(res.data)
      var list = res.data.list;
      if(list == null){
        var toastText = '数据获取失败';
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });
      }else{
        that.setData({
          list : list
        })
      }
    }
  })
}

})
