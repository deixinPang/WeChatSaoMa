const app = getApp()
var util = require('../../utils/util.js')
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //控制底部弹出层是否显示
    modalShow: false,
    starnum: [],
    //多列选择器：
    multiArray: [
      ['总办', '行政人事部', '计财部', '营销部', '工程部', '采供部'],
      ['候爽', '陈凯余']
    ], //二维数组，长度是多少是几列
    objectMultiArray: [
      [{
          id: 0,
          name: '总办'
        },
        {
          id: 1,
          name: '行政人事部'
        },
        {
          id: 2,
          name: '计财部'
        },
        {
          id: 3,
          name: '营销部'
        },
        {
          id: 4,
          name: '工程部'
        },
        {
          id: 5,
          name: '采供部'
        },
      ],
      [{
          id: 0,
          name: "候爽"
        },
        {
          id: 1,
          name: "陈凯余"
        }
      ]
    ],
    multiIndex: [0, 0],

    // 评价图片
    evaluationImgUrl: "https://s1.ax1x.com/2018/08/05/PDM8Bj.png", //评字图片
    starCheckedImgUrl: "https://s1.ax1x.com/2018/08/05/PDQ0it.png", //点亮时图片
    starUnCheckedImgUrl: "https://s1.ax1x.com/2018/08/05/PDQdII.png", //熄灭时图片

    starMap: [
      '非常差',
      '差',
      '一般',
      '好',
      '非常好',
    ],
    evaluations: [{
        id: 0,
        name: "服务态度",
        image: "https://s1.ax1x.com/2018/08/05/PDMaCV.png",
        star: 0,
        note: ""
      },
      {
        id: 1,
        name: "工作效率",
        image: "https://s1.ax1x.com/2018/08/05/PDMd3T.png",
        star: 0,
        note: ""
      },
      {
        id: 2,
        name: "工作质量",
        image: "https://s1.ax1x.com/2018/08/05/PDMN40.png",
        star: 0,
        note: ""
      }
    ]
  },


  //多列选择器：
  bindMultiPickerChange: function(e) {
    var multiArray = this.data.multiArray
    var multiIndex = this.data.multiIndex
    console.log('picker发送选择改变，携带下标为', e.detail.value)
    console.log('picker发送选择改变，携带值为', multiArray[0][multiIndex[0]], multiArray[1][multiIndex[1]])
    this.setData({
      multiIndex: e.detail.value

    })
  },
  bindMultiPickerColumnChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['小侯', '小陈'];
            break;
          case 1:
            data.multiArray[1] = ['张婉玉', '张晶晶', '黄素贞', '刘正琴', '庞德信'];
            break;
          case 2:
            data.multiArray[1] = ['吴瑶瑶', '陈炜曦', '巫梦贤', '王颖诗', '朱炽强', '林洁玲', '黄桂菲', '黎燕金', '宗士伟', '刘宜云', '戚敏仪', '蔡嘉悦', '胡玉玲', '曾碧桃', '林翠花', '王小丹', '刘晨颖', '周素萍'];
            break;
          case 3:
            data.multiArray[1] = ['孟永刚', '林桢', '沈健明', '丁雪姣', '温莉雅', '李黎黎', '肖梓华', '岑灵筱', '定晟', '方艺霖', '吴志航'];
            break;
          case 4:
            data.multiArray[1] = ['刘琪', '刘富荣', '吴健洪'];
            break;
          case 5:
            data.multiArray[1] = ['朱淑贤', '林国球	', '王目友', '杨开勇', '裴红波', '王继红', '宋晓丹', '钟艳泠'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
        console.log(data.multiIndex);
    }
    this.setData(data);
  },

  onLoginSuccess(event) {
    console.log(event)
    var detail = event.detail
    this.setData({
      nickName: detail.nickName,
      headImg: detail.avatarUrl
    })
  },
  onLoginFail() {
    wx.showModal({
      title: '授权用户才能进行评价',
      content: '',
    })
  },

  /**
   * 评分
   */
  chooseStar: function(e) {
    //判断用户是否授权
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success(res) {
              console.log(res)
            }
          })
        } else {
          this.setData({
            modalShow: true,
          })

        }
      }
    })
    var index = e.currentTarget.dataset.index;
    var star = e.target.dataset.star;
    let evaluations = this.data.evaluations;
    let evaluation = evaluations[index];
    console.log(evaluation)
    evaluation.star = star;
    evaluation.note = this.data.starMap[star - 1];
    let starArr = this.data.evaluations.map(i => i.star)

    this.setData({
      evaluations: evaluations,
      starArr: starArr,
    })
  },

  // 提交按钮事件
  indextj: function(e) {
    var that = this;
    var nickName = that.data.nickName
    console.log(nickName)
    // var nickName = that.data.nickName;
    var multiArray = that.data.multiArray
    var multiIndex = that.data.multiIndex
    // var headImg = that.data.avatarUrl
    var headImg = that.data.headImg
    console.log(headImg)
    var time = util.formatTime(new Date());

    db.collection('comment').add({
      data: {
        nickName: nickName,
        comment: e.detail.value.comment,
        department: multiArray[0][multiIndex[0]],
        employee: multiArray[1][multiIndex[1]],
        headImg: headImg,
        star: this.data.starArr,
        time: time,
        createTime: db.serverDate()
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '提交成功',
        })
        this.setData({
          form_info: '',
          evaluation: ''
        });
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());

    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time,
    });
  },
})