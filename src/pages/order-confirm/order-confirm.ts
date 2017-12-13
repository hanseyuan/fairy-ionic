import { Component } from '@angular/core';
import { ModalController,IonicPage, NavController, NavParams } from 'ionic-angular';

import { LogService } from '../../app/utility/service/log.service';
import { MyHttpService } from '../../app/utility/service/myhttp.service';
import {LoginPage} from '../login/login'
import { PayPage } from '../pay/pay';

/**
 * Generated class for the OrderConfirmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html',
})
export class OrderConfirmPage {

  //用户是否登录
  isUserLogin:boolean=false;

  orderList:Array<any>=[];
  price=0;

  constructor(
    public myModalCtr:ModalController,
    public myLog: LogService,
    public myHttp: MyHttpService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmPage');
    this.checkUserLogin();
  }

  //每次进入页面,都会执行该方法
  ionViewWillEnter(){
    this.checkUserLogin();
    this.initData();
  }

  //检查用户是否登录
  checkUserLogin(){
    this.myHttp.sendRequest("http://localhost/framework/fairy/Fairytail/data/cart/session_data.php")
    .subscribe((result:any)=>{
      console.log(result);
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

  //加载数据
  initData(){
      this.myHttp.sendRequest('http://localhost/framework/fairy/Fairytail/data/order/list.php')
    .subscribe((result:any)=>{
      this.myLog.showLog(result);
      this.orderList=result;
  })
}
//显示模态框
  showPayModal(){
    this.sumAll();
     let myModal= this.myModalCtr.create(PayPage,{price:this.price}); myModal.present();
     //监听模态窗什么时候关闭
     myModal.onDidDismiss((data)=>{
       this.myLog.showLog(data);
       if(data.result){
        //返回
        if(this.navCtrl.canGoBack()){
            this.navCtrl.pop();
        }
        //  跳到首页
            this.navCtrl.parent.select(0);
     }

     })

  }

   //计算当前购物车的产品一共多少钱
  sumAll(){
    let totalPrice = 0;
    for(var i=0;i<this.orderList.length;i++){
      var product = this.orderList[i];
      totalPrice+=(product.count*product.price);
    }
    this.price=totalPrice;
   
  }


}
