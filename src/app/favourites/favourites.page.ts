import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

    StoreArray: any = [];
    downloadArray: any = [];
    maxValue: string = "Nothing gotten yet";

    constructor(private storage: Storage, public alertController: AlertController) {
    }

    ngOnInit(): void {
        this.GenerateStoredNews();
    }

    GenerateStoredNews() {
        this.StoreArray.length = 0;
        this.storage.forEach((value, key) => {
            this.StoreArray.push(JSON.parse(value));
        }).catch(err => { console.log('errr', err) })
        console.log("created array", this.StoreArray);
    }

    buttonClear() {
        this.storage.clear();
        console.log("cleared storage");
    }

    async ClearAlert() {
        const alert = await this.alertController.create({
            header: 'Confirmation',
            message: 'This will permanently delete <strong>all</strong> stored news articles!',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Okay',
                    handler: () => {
                        console.log('Confirm Okay');
                        this.buttonClear();
                        this.GenerateStoredNews();
                    }
                }
            ]
        });

        await alert.present();
    }
}