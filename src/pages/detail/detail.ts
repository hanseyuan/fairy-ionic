import { Component } from '@angular/core';
import {ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { LogService }
  from '../../app/utility/service/log.service'
import { MyHttpService }
  from '../../app/utility/service/myhttp.service'

import { NotFoundPage } from '../not-found/not-found'
import { CartPage } from '../cart/cart'
import { LoginPage } from '../login/login'


/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  //接收数据数组
  //phone:Array<any>=[];
  //定义三个变量,绑定跳转
   //实现跳转的
  pageNotFound: any;
  pageLogin: any;
  pageCart: any;

  detailInfo:Array<any>=[];


  constructor(
    public myToastCtrl:ToastController,
    public myLog:LogService,
    public myHttp:MyHttpService,
    public navCtrl: NavController, public navParams: NavParams) {
      //赋值
    this.pageNotFound = NotFoundPage;
    this.pageLogin = LoginPage;
    this.pageCart = CartPage;
  }

  ionViewDidLoad() {
    this.myLog.showLog('ionViewDidLoad DetailPage');
    //获取传递来的参数
    let productId = this.navParams.get('id');
    this.myLog.showLog('productId is ' + productId);
    this.initDetailInfo(productId);
  }
  
    //根据产品id 得到详情数据
  initDetailInfo(id: number) {
    this.myHttp
      .sendRequest('http://localhost/framework/fairy/Fairytail/data/product-details/details.php?lid=' + id)
      .subscribe((result: any) => {
        this.myLog.showLog(result);
        this.detailInfo= result.phone;
        console.log(this.detailInfo);
      })
  }


  //添加商品到购物车
  addToCart(id: number){
      this.myHttp.sendRequest('http://localhost/framework/fairy/Fairytail/data/cart/add.php?count=1&lid=' + id).subscribe((result:any)=>{
        this.myLog.showLog(result);
         let showMsg = "";
        if(result.code == 1)
        {
          //成功
          showMsg = "添加成功";
        }
        else if(result.code == -2)
        {
          //未登录，跳转到登录页面
          showMsg = "未登录，跳转到登录页面";
          this.navCtrl.push(LoginPage);
        }
        else if(result.code == -1)
        {
          //失败
          showMsg="添加失败";
        }
        let myToast = this.myToastCtrl.create({
          position:'bottom',
          duration:1500,
          message:showMsg
        });
        myToast.present();
      })

    
  }





}
