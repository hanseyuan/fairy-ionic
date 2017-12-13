import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LogService } from '../../app/utility/service/log.service';
import { MyHttpService } from '../../app/utility/service/myhttp.service';
import {ToastService} from '../../app/utility/service/toast.service';

import {LoginPage} from '../login/login'
import {IndexPage} from '../index/index'
import {OrderConfirmPage} 
from '../order-confirm/order-confirm'

/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  //用户是否登录
  isUserLogin:boolean=false;
  //保存购物车中的数据
  cartList:Array<any>=[];


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
    this.getCartInfo();
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
  // 前往登录页面
  jumpToLogin(){
     this.navCtrl.push(LoginPage);
  }
  //去首页
  jumpToIndex(){
     this.navCtrl.parent.select(0);
  }


  //获得页面数据
  getCartInfo(){
      this.myHttp.sendRequest('http://localhost/framework/fairy/Fairytail/data/cart/list.php').subscribe((result:any)=>{
        this.myLog.showLog(result);
        this.cartList=result;
      }) 
  }
  // 计算价钱
   sumAll(){
    let totalPrice = 0;
    for(var i=0;i<this.cartList.length;i++){
      var product = this.cartList[i];
      totalPrice+=(product.count*product.price);
    }
    return totalPrice;
  }


  //去结算
  jumpToOrderConfirm(){
    this.navCtrl.push(OrderConfirmPage);
  }

  //修改购物车中产品的数量
  // 参数： isMinus true就是减 false就是加
  // 参数： index cartList中要操作第几个列表项
   modifyCartCount(isMinus:boolean,index:number){
    //定义一个变量 保存当前count
    let myCount = this.cartList[index].count;
    if(isMinus){
      myCount--;
      if(myCount == -1){
        return;
      }
    }else{
      myCount++;
    }
    this.cartList[index].count = myCount;
  }




}
