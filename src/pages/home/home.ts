import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IndexPage } from '../index/index';
import { CartPage } from '../cart/cart';
import { UserCenterPage } from '../user-center/user-center';
import { NotFoundPage } from '../not-found/not-found';
import {OrderConfirmPage} 
from '../order-confirm/order-confirm'



/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  firstTab:any;
  secondTab:any;
  thirdTab:any;
  fourthTab:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.firstTab=IndexPage;
    this.secondTab=CartPage;
    this.thirdTab=UserCenterPage;
    this.fourthTab=OrderConfirmPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
