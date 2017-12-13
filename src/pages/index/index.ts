import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service';
import {DetailPage} from '../detail/detail'

import { ListPage } from '../list/list'


/**
 * Generated class for the IndexPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {

  banners:Array<any>=[];
  floor1:Array<any>=[];
  floor2:Array<any>=[];
  floor3:Array<any>=[];
  seckill_product:Array<any>=[];

  detailPage:any;
  
    //关键字
    myInput:string="";

  constructor(
    public myHttp:MyHttpService,
    public navCtrl: NavController, 
    public navParams: NavParams) {
        this.detailPage=DetailPage;
  }

  ionViewDidLoad() {
    this.initData1();
    this.initData2();
    this.initData3();
  }

  ionViewWillEnter(){
    this.myInput = "";
  }


//接收数据
// 加载轮播数据
initData1(){
    this.myHttp.sendRequest("http://localhost/framework/fairy/Fairytail/data/index/banners.php")
    .subscribe((result:any)=>{
        // console.log('请求到的数据为:',result);
        this.banners=result;
    })
}

/*秒杀 */
initData2(){
    this.myHttp.sendRequest("http://localhost/framework/fairy/Fairytail/data/index/seckill_product.php")
    .subscribe((result:any)=>{
        // console.log('请求到的数据为:',result);
         this.seckill_product=result;
    })
}
/*楼层*/
initData3(){
    this.myHttp.sendRequest("http://localhost/framework/fairy/Fairytail/data/index/floors.php")
    .subscribe((result:any)=>{
        console.log('请求到的数据为:',result);
        this.floor1=result.f1;
        this.floor2=result.f2;
        this.floor3=result.f3;
    })
}

  //跳转到my-list并发送myInput
  jumpToMyList(){
      this.navCtrl.push(ListPage,{kw:this.myInput});
  }


}
