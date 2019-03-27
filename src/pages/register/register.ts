import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {GlobalVariable} from "../../globalVariable/globalVariable";
import $ from 'jquery'
import set = Reflect.set;
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',

})

export class RegisterPage {
  isDisable:boolean=false;
  second=5;
  codeMessage='发送验证码';
  comfirmName='请选择你的地区';
  nameClick:boolean=false;
  phoneClick:boolean=false;
  passClick:boolean=false;
  companyClick:boolean=false;
  codeClick:boolean=false;
  codeRight:boolean=false;
  ifName:boolean=false;
  ifCom:boolean=false;
  ifCode:boolean=false;
  ifTel:boolean=false;
  ifPass:boolean=false;
  nameRight:boolean=false;
  telRight:boolean=false;
  isChecked:boolean=false;
  company='';
  code='';
  password='';
  ifCodeText='';
  ifComText='';
  ifTelText='';
  ifNameText='';
  ifPassText='';
  userName='';
  telephone='';
  finalLocation='';
  person;
  personList;
  showSelect:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.person=GlobalVariable.locationData;
    this.personList=GlobalVariable.locationData;
  }
  verifyCode(){
    if(this.telephone==''){
      this.isDisable=!this.isDisable;
      let toast = this.toastCtrl.create({
        message: '请输入正确的手机号 ! 谢谢配合 !',
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
      });
      toast.present();
      return
    }
    let that = this;
    if(this.isDisable){
      return
    }else{
      this.isDisable=!this.isDisable;
      $.ajax({
        url: 'http://mytest888.natapp1.cc/factor/a/sys/register/getRegisterCode?mobile='+this.telephone,
        data: {},
        type: "get",
        success: function (res) {
          console.log(res);
          if(res.msg=='短信发送成功!'){
            that.sendSuccess();
            that.codeMessage = '倒计时 : ' + that.second + '秒';
            var myTime=setInterval(() => {
              that.countDown(myTime);
            },1000)
          }
        },
        error: function () {
        }
      })
    }

  }
  countDown(t){
    console.log(this);
    if(this.second>0){
      this.second--;
      this.codeMessage = '倒计时 : ' + this.second + '秒';
    }else if(this.second==0){
      clearInterval(t);
      this.codeMessage = '获取验证码';
      this.second=5;
      this.isDisable=!this.isDisable;
    }



    // let that=this;
  }
  sendSuccess() {
    let toast = this.toastCtrl.create({
      message: '短信已发送,请注意查收!',
      duration: 3000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
    });
    toast.present();
  }
  mySelect(){
    this.finalLocation='';
    this.personList=this.person;
    this.showSelect=!this.showSelect
  }
  closeSelect(){
    this.showSelect=!this.showSelect
  }
  changeList(list){
    console.log(list);
    this.finalLocation+='  '+list.name;
    this.personList = list.sub;
    console.log(this.personList);
    if(!list.sub || list.sub.length == 0){
      this.comfirm();
      this.comfirmName=this.finalLocation;
    }
  }
  comfirm(){
    console.log(this.comfirmName);
    this.showSelect=!this.showSelect
  }
  hiddenTel(){
    this.phoneClick=!this.phoneClick;
    this.telRight=false;
    if(this.ifTel){
      this.ifTel=!this.ifTel;
    }
  }
  hiddenCode(){
    this.codeClick=!this.codeClick;
    this.codeRight=false;
    if(this.ifCode){
      this.ifCode=!this.ifCode;
    }
  }
  hiddenCom(){
    this.companyClick=!this.companyClick;
    if(this.ifCom){
      this.ifCom=!this.ifCom;
    }
  }
  hiddenPass(){
    this.passClick=!this.passClick;
    if(this.ifPass){
      this.ifPass=!this.ifPass;
    }
  }
  hiddenName(){
    this.nameClick=!this.nameClick;
    this.nameRight=false;
    if(this.ifName){
      this.ifName=!this.ifName;
    }
  }
  checkTelephone(){
    let that = this;
    this.phoneClick=!this.phoneClick;
    console.log(this.telephone);
    if(this.telephone==''){
      this.ifTel=!this.ifTel;
      this.ifTelText='手机号不能为空'
      return
    }else if(!(/^1[34578]\d{9}$/.test(this.telephone))){
      this.ifTel=!this.ifTel;
      this.ifTelText='手机号有误,请重新填写';
      this.telephone='';
      return ;
    }else{
      $.ajax({
        url: 'http://mystudy666.natapp1.cc/factoring/a/sys/user/validateMobile?mobile='+this.telephone,
        data: {},
        type: "get",
        success: function (res) {
          console.log(res);
          if(!res){
            that.ifTel=!that.ifTel;
            that.ifTelText='该手机号已注册,请重新输入';
          }else{
            that.telRight=!that.telRight
          }
        },
        error: function () {
        }
      })
    }

  }
  checkName(){
    let that = this;
    this.nameClick=!this.nameClick;
    console.log(this.userName);
    if(this.userName==''){
      this.ifName=!this.ifName;
      this.ifNameText='用户名不能为空';
      return
    }else{
      $.ajax({
        url: 'http://mystudy666.natapp1.cc/factoring/a/sys/user/validateLoginName?loginName='+this.userName,
        data: {},
        type: "get",
        success: function (res) {
          console.log(res);
          if(!res){
            that.ifName=!that.ifName;
            that.ifNameText='该用户名已被使用,请重新输入';
          }else{
            that.nameRight=!that.nameRight;
          }
        },
        error: function () {
        }
      })
    }

  }
  checkPass(){
    this.passClick=!this.passClick;
    if(this.password==''){
      this.ifPass=!this.ifPass;
      this.ifPassText='密码不能为空';
      return
    }
  }
  checkCom(){
    this.companyClick=!this.companyClick;
    if(this.company==''){
      this.ifCom=!this.ifCom;
      this.ifComText='公司全称不能为空';
      return
    }
  }
  checkCode(){
    this.codeClick=!this.codeClick;
    let that = this;
    if(this.code==''){
      this.ifCode=!this.ifCode;
      this.ifCodeText='验证码不能为空';
      return
    }else{
      $.ajax({
        url: 'http://mystudy666.natapp1.cc/factoring/a/sys/register/validateMobileCode?randomCode='+this.code+'&mobile='+this.telephone,
        data: {},
        type: "get",
        success: function (res) {
          console.log(res);
          if(!res){
            that.ifCode=!that.ifCode;
            that.ifCodeText='验证码不正确,请重新获取';
          }else{
            that.codeRight=!that.codeRight
          }
        },
        error: function () {
        }
      })
    }

  }
  goReadMe(){
    this.navCtrl.push('ReadMePage')
  }
  goRegister() {
    if(!this.isChecked){
      let toast = this.toastCtrl.create({
        message: '请阅读并同意《点金保理服务协议》后在进行提交 !',
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
      });
      toast.present();
      return
    }
    if(this.comfirmName=='请选择你的地区'||this.company==''||this.telephone==''||this.userName==''||this.password==''||this.code==''){
      let toast = this.toastCtrl.create({
        message: '请填写完整信息再进行提交,谢谢配合!',
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
      });
      toast.present();
    }
    else{
      let that = this;
      $.ajax({
        url: 'http://mystudy666.natapp1.cc/factoring/a/sys/register/registerUser?mobileLogin=true',
        data: {
          roleName:'Vendor',
          mobile:this.telephone,
          randomCode:this.code,
          loginName:this.userName,
          password:this.password,
          confirmNewPassword:this.password,
          compary:this.company,
          remarks:this.comfirmName,
          address: '',
          ck1: 'on'
        },
        type: "post",
        success: function (res) {
          console.log(res);
          if(res.success){
            that.navCtrl.pop()
          }
        },
        error: function () {
        }
      })
    }
  }
}
