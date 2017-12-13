import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LogService } from '../../app/utility/service/log.service';
import { MyHttpService } from '../../app/utility/service/myhttp.service';
import {ToastService} from '../../app/utility/service/toast.service';

import {LoginPage} from '../login/login'
import {IndexPage} from '../index/index'


/**
 * Generated class for the UserCenterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html',
})
export class UserCenterPage {

  //用户是否登录
  isUserLogin:boolean=false;



  constructor(
    public myToastCtrl:ToastService,
    public myLog: LogService,
    public myHttp: MyHttpService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  //只执行一次
  ionViewDidLoad() {
    this.myLog.showLog('ionViewDidLoad CartPage');
  }

  //每次进入页面,都会执行该方法
  ionViewWillEnter(){
    this.checkUserLogin();
        
  }

  //检查用户是否登录
  checkUserLogin(){
    this.myHttp.sendRequest("http://localhost/framework/fairy/Fairytail/data/cart/session_data.php")
    .subscribe((result:any)=>{
        if(result.uid)
        {
          //已登录
          this.isUserLogin = true;
        }
        else{
          //未登录
          this.isUserLogin = false;
        }
    })
  }


  //退出登录
  outLogin(){
     this.myHttp.sendRequest("http://localhost/framework/fairy/Fairytail/data/header/logout.php")
    .subscribe((result:any)=>{
      this.myLog.showLog(result);
       let showMsg = "";
        if (result.code == 1) {
          //登录成功
          showMsg = "退出成功,前往首页";
          this.navCtrl.parent.select(0);
        }
        this.myToastCtrl.myToast(showMsg);
      
    })
  }

  // 前往登录页面
  jumpToLogin(){
     this.navCtrl.push(LoginPage);
  }






}
