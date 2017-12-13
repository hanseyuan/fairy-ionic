import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LogService } from '../../app/utility/service/log.service';
import { MyHttpService } from '../../app/utility/service/myhttp.service';
import {ToastService} from '../../app/utility/service/toast.service';
import {DetailPage} from '../detail/detail';

/**
 * Generated class for the ListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  myKw:string="";
  nowPage:number=1;
  totalPages:number=1;
  count:number=1;



  product:Array<any>=[];
  detailPage:any;

  constructor(
    public myToastCtrl:ToastService,
    public myLog: LogService,
    public myHttp: MyHttpService,
    public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.myLog.showLog('ionViewDidLoad ListPage');
    this.myKw=this.navParams.get('kw');
    this.myLog.showLog(this.navParams.get('kw'));
    this.initProcuctInfo();
    this.detailPage=DetailPage;
  }

  //加载页面
  initProcuctInfo(){
    this.myHttp.sendRequest('http://localhost/framework/fairy/Fairytail/data/products/products.php?kw='+this.myKw+'&pno='+this.nowPage).subscribe((result:any)=>{
      this.myLog.showLog(result);
      this.product=result.data;
      this.totalPages=result.pageCount;
      this.count=result.count;
    })
  }

  //加载更多
  loadMore(infinite){
    this.nowPage++;
    //访问页码限制
    if(this.nowPage>this.totalPages){
      infinite.complete();  
      return;
    }
     this.myHttp.sendRequest('http://localhost/framework/fairy/Fairytail/data/products/products.php?kw='+this.myKw+'&pno='+this.nowPage)
     .subscribe((result:any)=>{
           this.myLog.showLog(result);
           //  拼接数据
           this.product=this.product.concat(result.data); 
            //结束刷新
           infinite.complete();  
     })

  }




}
