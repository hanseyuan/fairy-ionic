import { Injectable } from '@angular/core';
import {ToastController } from 'ionic-angular';

@Injectable()
export class ToastService {

    constructor(public myToastCtrl:ToastController) { }

    myToast(showMsg:string){
        let myToast = this.myToastCtrl.create({
          position:'bottom',
          duration:1500,
          message:showMsg
        });
        myToast.present();
    }

}