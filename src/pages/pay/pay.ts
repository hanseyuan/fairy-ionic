import { Component } from '@angular/core';
import {ViewController,LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {
  //总价
  totalPrice=0;

  constructor(
    public myViewCtr:ViewController,
    public myLoadingCtr:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayPage');
    //接收参数
    this.totalPrice=this.navParams.get('price');
  }

  //关闭模态窗
   closeModal(shouldJump:boolean){
     this.myViewCtr.dismiss({result:shouldJump});
  }

  showLoading(){
    let myLoading=this.myLoadingCtr.create({
      content:"支付中"
    });
    //显示一个窗口
    myLoading.present();
    // 3秒后关闭
     setTimeout(()=>{
         myLoading.dismiss();
         //关闭模态窗本身
          this.closeModal(true);
      },3000)
  }


}
