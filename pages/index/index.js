// index.js
const app = getApp();
import mqtt from "../../utils/mqtt.min";
const MQTTADDRESS="输入地址";//mqtt服务器地址
let client = null; // MQTT服务
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';

Page({
  data: {
    title:"光界探索者",
    isConnect:false,//mqtt是否连接
    isPush:false,//是否订阅
    isSubscr:false,
    isLedOpen:false,
    isAtmOpen:false,
    isBriOpen:false,
    isFolOpen:false,
    isRevOpen:false,
    isSpeOpen:false,
    isSend:false,
    mqttConnectDialog:false,
    isOpen1:false,
    isOpen2:false,
    isOpen3:false,
    isCustomize:false,
    address:wx.getStorageSync('address')||'',
    port:wx.getStorageSync('port')||'',
    username:wx.getStorageSync('username')||'',
    password:wx.getStorageSync('password')||'',
    push:wx.getStorageSync('push')||'',
    subscr:wx.getStorageSync('subscr')||'',
    radio: '1',
    CustomizeR:0,
    CustomizeG:0,
    CustomizeB:0,
    corlornum:9,
    result: [0,0,0,0,0,0,0,0],
    times:'',
    isConnect1:false,
    openBluetoothDialog:false,
    bluetoothDialog:false,
    move1:false,
    move2:false,
    move3:false,
    move4:false,
    brightness:0,
    LEDmode:3,
    MOVEmode:1,
    MOVEmode1:0,
    MOVEmode2:0,
    MOVEmode3:0
  },
onChange1(event) {
  if(this.data.isAtmOpen==false)
  {
    this.setData({isAtmOpen:true})
    if(this.data.isBriOpen==true)
    this.setData({isBriOpen:false})
    this.setData({LEDmode:2})
  }
  else if(this.data.isAtmOpen==true)
  {
    this.setData({isAtmOpen:false})
    this.setData({LEDmode:1})
  }
  if(this.data.isLedOpen==true)
  {
  let that=this, msg
    msg ={LEDmode:this.data.LEDmode+1}
    client.publish(that.data.subscr, JSON.stringify(msg), { qos: 0 }, err => {
      if (!err) {
       console.log("发出的",msg);
      }
    });
  }
},
onChange2(event) {
  if(this.data.isBriOpen==false)
  {
    this.setData({LEDmode:0})
    this.setData({isBriOpen:true})
  }
  else if(this.data.isBriOpen==true)
  {
    this.setData({LEDmode:1})
    this.setData({isBriOpen:false})
  }
  if(this.data.isLedOpen==true)
  {
  let that=this, msg
    msg ={LEDmode:this.data.LEDmode+1}
    client.publish(that.data.subscr, JSON.stringify(msg), { qos: 0 }, err => {
      if (!err) {
       console.log("发出的",msg);
      }
    });
  }
},
onChange3(event) {
  let that=this, msg
  this.setData({corlornum:event.detail})
  if(this.data.corlornum==8)
  this.setData({corlornum:0})
  msg ={Corlornum:this.data.corlornum+1}
  client.publish(that.data.subscr, JSON.stringify(msg), { qos: 0 }, err => {
    if (!err) {
      console.log("发出的",msg);
    }
  });
},
onChangeR(event) {
  if(event.detail!="")
  {
    let that=this, msg
    this.setData({CustomizeR:event.detail})
    msg ={CustomizeR:event.detail+1}
    client.publish(that.data.subscr, JSON.stringify(msg), { qos: 0 }, err => {
      if (!err) {
       console.log("发出的",msg);
      }
    });
  }
},
onChangeG(event) {
  if(event.detail!="")
  {
    let that=this, msg
    this.setData({CustomizeG:event.detail+1})
    msg ={CustomizeG:event.detail}
    client.publish(that.data.subscr, JSON.stringify(msg), { qos: 0 }, err => {
      if (!err) {
       console.log("发出的",msg);
      }
    });
  }
},
onChangeB(event) {
  if(event.detail!="")
  {
    let that=this, msg
    this.setData({CustomizeB:event.detail=1})
    msg ={CustomizeB:event.detail}
    client.publish(that.data.subscr, JSON.stringify(msg), { qos: 0 }, err => {
      if (!err) {
       console.log("发出的",msg);
      }
    });
  }
},
onChange4(event) {
  this.setData({result:event.detail})
  console.log("发出的",this.data.result);
},
onChange6(event) {
  if(this.data.isFolOpen==false){
  this.setData({isFolOpen:true,move3:false,move1:false,move2:false,move4:false,MOVEmode:2})
  if(this.data.isRevOpen==true)
  this.setData({isRevOpen:false})
  }
  else if(this.data.isFolOpen==true)
  this.setData({isFolOpen:false,MOVEmode:1})
  let that=this, msg
      msg ={MOVEmode:this.data.MOVEmode+1}
      client.publish(that.data.subscr, JSON.stringify(msg), { qos: 0 }, err => {
        if (!err) {
         console.log("发出的",msg);
        }
      });
},
onChange7(event) {
  if(this.data.isRevOpen==false)
  this.setData({isRevOpen:true,move3:false,move1:false,move2:false,move4:false,MOVEmode3:1})
  else if(this.data.isRevOpen==true)
  this.setData({isRevOpen:false,MOVEmode3:0})
  let that=this, msg
      msg ={MOVEmode3:this.data.MOVEmode3+1}
      client.publish(that.data.subscr, JSON.stringify(msg), { qos: 0 }, err => {
        if (!err) {
         console.log("发出的",msg);
        }
      });
},
onChange8(event) {
  let that=this, msg
  if(this.data.isSpeOpen==false)
  {
    this.setData({isSpeOpen:true})
    msg ={IsSpeOpen:"true"}
  }
  else if(this.data.isSpeOpen==true)
  {
    this.setData({isSpeOpen:false})
    msg ={IsSpeOpen:"false"}
  }
    client.publish(that.data.subscr, JSON.stringify(msg), { qos: 0 }, err => {
    if (!err) {
      console.log("发出的",msg);
    }
  });
},
onDrag(event) {
  let that=this, msg
  this.setData({
    brightness: event.detail.value,
  });
  wx.showToast({
    icon: 'none',
    title: `当前值：${event.detail}`,
  });
  msg ={Brightness:event.detail+1}
  client.publish(that.data.subscr, JSON.stringify(msg), { qos: 0 }, err => {
    if (!err) {
     console.log("发出的",msg);
    }
  });
},
onDrag2(event) {
  this.setData({
    times: event.detail.value,
  });
  wx.showToast({
    icon: 'none',
    title: `当前值：${event.detail}`,
  });
},
onDrag1(event){
  if(this.data.isLedOpen==true)
 {
   this.setData({isLedOpen:false})
   this.setData({LEDmode:3})
 }
  else if(this.data.isLedOpen==false)
  {
    this.setData({isLedOpen:true})
    if(this.data.LEDmode==3)
    this.setData({LEDmode:1})
  }
  let that=this, msg
    msg ={LEDmode:this.data.LEDmode+1}
    client.publish(that.data.subscr, JSON.stringify(msg), { qos: 0 }, err => {
      if (!err) {
       console.log("发出的",msg);
      }
    });
},
onDrag3(event){
  if(this.data.isSend==false)
  {
    this.setData({isSend:true})
    //发送
  }
  else if(this.data.isSend==true)
  this.setData({isSend:false})
},
open1(event){
  if(this.data.isOpen1==false)
  this.setData({isOpen1:true})
  else if(this.data.isOpen1==true)
  this.setData({isOpen1:false})
},
open2(event){
  if(this.data.isOpen2==false)
  this.setData({isOpen2:true})
  else if(this.data.isOpen2==true)
  this.setData({isOpen2:false})
},
open3(event){
  if(this.data.isSpeOpen==false)
  this.setData({isSpeOpen:true})
  else if(this.data.isSpeOpen==true)
  this.setData({isSpeOpen:false})
},
openDialog(){
  this.setData({mqttConnectDialog:true});
},
onClose(){
  this.setData({mqttConnectDialog:false});
},
connectMqtt() {
    let that = this;
    const options = {
      connectTimeout: 4000,
      address: this.data.address, // 输入的连接地址
      port: this.data.port, // 输入的端口号
      username: that.data.username, // 输入的用户名
      password: that.data.password, // 输入的密码
    };
    console.log("address是：", "wxs://" + options.address + '/mqtt');
    client = mqtt.connect("wxs://" + this.data.address + '/mqtt', options); // 连接方法
    client.on("connect", error => {
      console.log("连接成功");
      wx.showToast({ icon: "none", title: "连接成功", });
      this.setData({isConnect:true})
      wx.setStorageSync('username',options.username)
      wx.setStorageSync('password',options.password)
      wx.setStorageSync('address',options.address)
      wx.setStorageSync('port',options.port)
    });
    client.on('message',function(topic,message){
      console.log( "收到消息：", message.toString());
      let getMessageObj = {};//收到的消息
      getMessageObj = JSON.parse(message);//收到的消息转换成json对象
      console.log(getMessageObj);
      if(getMessageObj.hasOwnProperty('Brightness')){
        that.setData({'brightness':Number(getMessageObj.Brightness)})
      }
      if(getMessageObj.hasOwnProperty('Ispeople')){
        if(getMessageObj.Ispeople==1)
        wx.showToast({title: '有人闯入', icon: 'error', duration: 2000})
      }
    });
    client.on("reconnect", error => {
      console.log("正在重连：", error);
      wx.showToast({ icon: "none", title: "正在重连", });
    });
    client.on("error", error => {
      console.log("连接失败：", error);
      wx.showToast({ icon: "none", title: "MQTT连接失败", });
    });
  },
closeConnect(){
  client.end();
  this.setData({isConnect:false,isPush:false,isSubscr:false})
  wx.showToast({ icon: "none", title: "断开成功", });
},
  addPush(){
    // 订阅一个主题
    let that=this
    if(!this.data.isConnect){
      wx.showToast({ icon: "none", title: "请先连接", });
      return;
    }
    client.subscribe(this.data.push, { qos: 0 }, function     (err) {
      if (!err) {
      console.log("订阅成功");
      wx.showToast({ icon: "none", title: "添加成功" });
      wx.setStorageSync('push',that.data.push);
      that.setData({isPush:true});
      }
    })
  },
  closePush(){
    let that=this
    client.unsubscribe('that.data.push', function (err) {
      if (!err) {
        wx.showToast({ icon: "none", title: "断开成功", });
        that.setData({isPush:false});
      }
    });
  },
  addsubscr(){
    if(!this.data.isConnect){
      wx.showToast({ icon: "none", title: "请先连接", });
      return;
    }
    let msg = "发出的消息";
    let that=this;
    client.subscribe(this.data.subscr,{
      qos:0
    },function(err){
      if(!err){
        console.log('添加成功');
        wx.setStorageSync('subscr',that.data.subscr);
        wx.showToast({ icon: "none", title: "添加成功" });
        that.setData({isSubscr:true});
      }
  });
  },
  closesubscr(){
    let that=this
    client.unsubscribe('this.data.subscr', function (err) {
      if (!err) {
        wx.showToast({ icon: "none", title: "断开成功", });
        that.setData({isSubscr:false})
      }
    });
  },
  openBluetoothDialog(){
    this.setData({bluetoothDialog:true})
  },
  onCloseBluetooth(){
    this.setData({bluetoothDialog:false});
  },
  right(){
      if(this.data.move1==false)
      this.setData({move1:true,move3:false,MOVEmode1:2})
      else if(this.data.move1==true)
      this.setData({move1:false,MOVEmode1:0})
      let that=this, msg
      msg ={MOVEmode1:this.data.MOVEmode1+1}
      client.publish(that.data.subscr, JSON.stringify(msg), { qos: 0 }, err => {
        if (!err) {
         console.log("发出的",msg);
        }
      });
    },
    receding(){
      if(this.data.move2==false)
      this.setData({move2:true,move4:false,MOVEmode2:2})
      else if(this.data.move2==true)
      this.setData({move2:false,MOVEmode2:0})
      let that=this, msg
      msg ={MOVEmode2:this.data.MOVEmode2+1}
      client.publish(that.data.subscr, JSON.stringify(msg), { qos: 0 }, err => {
        if (!err) {
         console.log("发出的",msg);
        }
      });
    },
    left(){
      if(this.data.move3==false)
      this.setData({move3:true,move1:false,MOVEmode1:1})
      else if(this.data.move3==true)
      this.setData({move3:false,MOVEmode1:0})
      let that=this, msg
      msg ={MOVEmode1:this.data.MOVEmode1+1}
      client.publish(that.data.subscr, JSON.stringify(msg), { qos: 0 }, err => {
        if (!err) {
         console.log("发出的",msg);
        }
      });
    },
    advance(){
      if(this.data.move4==false)
      this.setData({move4:true,move2:false,MOVEmode2:1})
      else if(this.data.move4==true)
      this.setData({move4:false,MOVEmode2:0})
      let that=this, msg
      msg ={MOVEmode2:this.data.MOVEmode2+1}
      client.publish(that.data.subscr, JSON.stringify(msg), { qos: 0 }, err => {
        if (!err) {
         console.log("发出的",msg);
        }
      });
    },
})