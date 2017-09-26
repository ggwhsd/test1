//index.js
//获取应用实例
const app = getApp()
var count = 0

//多久喝水一次，基础单位为timeper
var drinkTime = 5

//多久休息一次，基础单位为timeper
var restTime = 10

//单位毫秒，正式使用时，调整为1分钟
var timePer = 1000

//计时暂停标志
var pauseFlag = false





function goodMorning(that){
  if (count == restTime) {
  that.setData({
    name_gugw: '是不是有点渴了呢？\r\n提醒你可以喝口水啦！',
    name_service:'小秘书休息中',
    buttonEnable_gugw: false
    
  })
  //reset count
  count = 0;
  pauseFlag=true;
  
  }
  else if (count == drinkTime){
    that.setData({
      name_gugw: '已经持续工作了' + Math.round(count * timePer / 1000 / 60 * 100) / 100+'分，休息一下',
      name_service: '小秘书休息中',
      buttonEnable_gugw: false
    })
    pauseFlag = true;

    
  }
  else
  {
    that.setData({
      name_gugw: '好好努力造福社会',
      name_service: '⏰⏰⏰',
      buttonEnable_gugw: true
    })
    
  }
  count++
  that.BingBing();
  if(!pauseFlag){
    setTimeout(function(){
    goodMorning(that)
    }
    ,timePer)
  }
  else
  {

  }
}

  
  
Page({
  data: {
    //motto: '爱你哟😍',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    name_gugw:'',
    name_service:'小秘书休息中',
    buttonEnable_gugw:false

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
  ,
  
  changeName_gugw: function(e) {
    
    pauseFlag = false
    this.setData({
      name_gugw: ''
    })
    //BingBing();
    goodMorning(this)

    
  },
  //用于提醒，最好是短信提示音，但是现在不会，所以就用屏幕代替
  BingBing: function (e){
    if(pauseFlag) {
      console.log('music begin')
      var music = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
     
      wx.playBackgroundAudio(
        {
          dataUrl: 'https://nj02all01.baidupcs.com/file/3fc18d9ed683e89e2192ce8fed6217c4?bkt=p3-0000e153ffbe9842b2d162ec62882e210fde&fid=504176043-250528-314604572673927&time=1505033593&sign=FDTAXGERLQBHSK-DCb740ccc5511e5e8fedcff06b081203-fTq8naeNOuWMax8hg59tM5gvqZ8%3D&to=69&size=4354066&sta_dx=4354066&sta_cs=4&sta_ft=mp3&sta_ct=0&sta_mt=0&fm2=MH,Guangzhou,Netizen-anywhere,,shanghai,ct&newver=1&newfm=1&secfm=1&flow_ver=3&pkey=0000e153ffbe9842b2d162ec62882e210fde&sl=76480590&expires=8h&rt=sh&r=673814652&mlogid=5860910674874309069&vuk=504176043&vbdid=2731394764&fin=赵雷-鼓楼+%28Live%29.mp3&rtype=1&iv=0&dp-logid=5860910674874309069&dp-callid=0.1.1&hps=1&tsl=80&csl=80&csign=BIrU8ByAgo%2BvCIYFUh9jUtVSnag%3D&so=0&ut=6&uter=4&serv=0&uc=423118455&ic=2486036016&ti=91499ea5817d8028ddf46f8fa59130b771aa5127f1478e0b&by=themis',
          success:function(e){
            console.log('success')
          },
          fail:function(e){
            console.log('fail')
          }
          
        });

    }
  else{
    console.log('music stop');
      wx.stopBackgroundAudio()
    }

  }
  
})
