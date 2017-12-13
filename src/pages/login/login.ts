import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LogService } from '../../app/utility/service/log.service';
import { MyHttpService } from '../../app/utility/service/myhttp.service';
import {ToastService} from '../../app/utility/service/toast.service';



/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // 定义参数
  uname:string="";
  upwd:string="";


  constructor(
    public myToastCtrl:ToastService,
    public myLog: LogService,
    public myHttp: MyHttpService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.myLog.showLog('ionViewDidLoad LoginPage');
  }

  // 登录
  doLogin(){
    this.myHttp.sendRequest('http://localhost/framework/fairy/Fairytail/data/login/login.php?uname='
      + this.uname + '&upwd=' + this.upwd)
      .subscribe((result:any)=>{
         this.myLog.showLog(result);
        let showMsg = "";
        if (result.code == 1) {
          //登录成功
          showMsg = "登录成功";
          //当用户登录成功之后，返回上一页
          this.navCtrl.pop();
        }
        else if (result.code ==-2) {
          //用户名格式不正确
          showMsg = "用户名格式不正确";
        }
        else if (result.code == -3) {
          //密码格式不正确
          showMsg = "密码格式不正确"
        }
        else if (result.code == -1) {
          //用户名或密码有误
          showMsg = "用户名或密码有误"
        }
        this.myToastCtrl.myToast(showMsg);

      })
  }


}
