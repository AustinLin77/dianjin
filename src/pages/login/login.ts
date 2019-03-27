import { Component } from '@angular/core';

import {  NavController, NavParams, MenuController,Slides, ToastController } from 'ionic-angular';

import { HttpService } from '../../service/HttpService';

import {ViewChild } from '@angular/core';
import { App } from 'ionic-angular';
import $ from 'jquery'
// import  { ForgetPasswordPage } from '../../pages/forget-password/forget-password';
// import  { AgreementPage } from '../../pages/agreement/agreement';
import { HomePage } from '../home/home';
import { TabsPage } from '../../pages/tabs/tabs';
import { APP_SERVE_URL_TEST } from '../../service/Constants';
// import { RegisterPage } from '../../pages/register/register';
// var sha1 = require('node-sha1');
``
import sha1 from 'node-sha1'




@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('sliders')
  sliders: Slides;
  slides = [{imgPath: "assets/imgs/dianjin1.png"}, {imgPath: "assets/imgs/dianjin2.png"}, {imgPath: "assets/imgs/dianjin3.png"}];
  logoWidth : string = screen.width + 'px';
  logoHeight : string = screen.width * 2 / 3 + 'px';
  userName : string;
  password : string;
  flagSrc : string = 'assets/icon_nolook.png';
  inFlag : boolean = true;
  cansee:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App,
              public toastCtrl: ToastController, private httpService: HttpService, private menu : MenuController) {

  }

  ngOnInit(): void {
    // var commit = document.getElementById('login_commit');
    // var commitWith = screen.width - 30 + 'px';
    // var text = "width:" + commitWith + ";background-color: white;color: #008ec3;border: 1px solid #008ec3;";
    // commit.style.cssText = text;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving this page
    this.menu.enable(true);
  }
  showPass(){
    this.cansee=!this.cansee;
    if(this.cansee){
      document.getElementById("password").removeAttribute('type')
    }else{
      document.getElementById('password').setAttribute('type','password')
    }
  }
  login() {
    let that = this;
    $.ajax({
      url: 'http://mytest888.natapp1.cc/factor/app/login',
      data: {
        mobileLogin: 'true',
        username:that.userName,
        password:that.password


        // username: 'qyxinry',
        // password: 'qyxinry'


        // username:'ywjl',
        // password:'ywjl'
        // username:'sunwoda',
        // password:'123456'
        // username:'zjl',
        // password:'zjl'
        // username:'fkjl',
        // password:'fkjl'
        // username:'zjl',
        // password:'zjl'
        // username:'cwzg',
        // password:'123456'
      },
      type: "post",
      success: function (res) {
        console.log(res);
        // localStorage.setItem("ifDianJinLogin", "true");

        if(res.message=='密码错误!'){
          let toast = that.toastCtrl.create({
            message: '密码错误,请重新输入',
            duration: 3000
          });
          toast.present();
        }else{
          localStorage.setItem("roleName", res.extData.companyType);
          localStorage.setItem("name", res.extData.companyName);
          localStorage.setItem("userId", res.extData.userId);
          localStorage.setItem("username", res.extData.userName);
          localStorage.setItem("sellerId", res.extData.companyId);
          that.app.getRootNav().push('GoldMainPage');
        }
      },
      error: function () {
      }
    })
    // console.log('test login');
    // if(this.userName === '' || (typeof(this.userName)=="undefined")) {
    //   this.httpService.presentToast("用户名不能为空！");
    //   return;
    // }
    //
    // if(this.password === '' || (typeof(this.password)=="undefined")) {
    //   this.httpService.presentToast("密码不能为空！");
    //   return;
    // }
    //
    // var passw = sha1(this.password);
    // var data = {
    //   // 'username': this.userName, 'password': passw , "client_id":"lCuDj9Vmjo8eRQgX",
    //   // "grant_type" : "password", "scope" : "app","client_secret":"XRU4z4vcx1JcD5ZUyuccgdGiZle0xlfgmAVgDp8n98o="
    // };
    // console.log(data);
    // this.httpService.postBodyOne('/uaa/oauth/token?username='+this.userName+'&password='+passw+'&client_id=lCuDj9Vmjo8eRQgX&grant_type=password&' +
    //   'scope=app&client_secret=XRU4z4vcx1JcD5ZUyuccgdGiZle0xlfgmAVgDp8n98o=', data).then(res => this.handleSuccess(res));
  }

  // private handleSuccess(result) {
  //   console.log(result);
  //   var token = result.access_token;
  //   console.log(token);
  //   if (typeof(token)=="undefined") {
  //     this.httpService.presentToast("用户名或密码错误！");
  //     return;
  //   }
  //   localStorage.setItem("token", token);
  //   localStorage.setItem("userName", this.userName);
  //
  //   this.httpService.getUser('https://wmsapi.sunwoda.com/user', {}).then(res => this.handleUserInfoSuccess(res));
  // }
  //
  // private handleUserInfoSuccess(result) {
  //   console.log(result);
  //   var tenamtId = result.tenantId;
  //   var userName = result.username;
  //   var avatar = result.avatar;
  //   var id = result.id;
  //   if (typeof(tenamtId)=="undefined") {
  //     this.httpService.presentToast("个人信息获取失败！");
  //     return;
  //   }
  //   localStorage.setItem("teamId", tenamtId);
  //   localStorage.setItem("userName", userName);
  //   localStorage.setItem("userId", id);
  //   localStorage.setItem("avatar", APP_SERVE_URL_TEST + '/' + avatar);
  //   this.httpService.getUser('https://wmsapi.sunwoda.com/api/roles/app/role', {}).then(res => this.handleUserRoleSuccess(res));
  //   this.navCtrl.setRoot(TabsPage,);
    // var maxTime = 1800; // seconds
    // var time = maxTime;
    // document.body.addEventListener("touchmove", function() {
    //   time = maxTime; // reset
    // }, false);
    // document.body.addEventListener("touchstart", function() {
    //   time = maxTime; // reset
    // }, false);
    // var intervalId = window.setInterval(function() {
    //   console.log("aaa")
    //   time--;

    //   if(time <= 0) {
    //     ShowInvalidLoginMessage();
    //     clearInterval(intervalId);
    //   }
    // }, 1000)
    //
    // function ShowInvalidLoginMessage() {
    //   // 清除sessionstorage中的登录ID
    //   // 退到登陆界面
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("userName");
    //   localStorage.removeItem("teamId");
    //   localStorage.removeItem("id");
    //   localStorage.removeItem('sort');
    //
    // }
  // }
  // handleUserRoleSuccess(res){
  //   console.log(res)
  //   if(res.data=='供应商'){
  //     localStorage.setItem("CH-role",'供应商');
  //     localStorage.setItem("role",'0')
  //   }else{
  //     localStorage.setItem("CH-role",'采购商');
  //     localStorage.setItem("role",'1')
  //   }
  // }
  // forgetPassw() {
  //   this.navCtrl.push('ForgetPasswordPage');
  // }
  //
  // // forwardAgreement() {
  // //   this.navCtrl.push(AgreementPage);
  // // }
  //
  // showOrHidePassw() {
  //   console.log('click');
  //   alert(this.inFlag);
  //   this.inFlag = !this.inFlag;
  //   alert(this.flagSrc);
  //   if(this.inFlag) {
  //     this.flagSrc = 'assets/icon_nolook.png';
  //   } else {
  //     this.flagSrc = 'assets/icon_look.png';
  //   }
  //   alert(this.flagSrc);
  // }
  register(){
    this.navCtrl.push('RegisterPage');
  }
}
