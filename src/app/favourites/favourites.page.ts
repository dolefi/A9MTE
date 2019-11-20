import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

    StoreArray: any = [];
    downloadArray: any = [];
    maxValue: string = "Nothing gotten yet";
    //ID: number = 0;

    constructor(private storage: Storage) {
    }

    ngOnInit(): void {
        this.buttonGet();
    }

    buttonGet() {
        this.storage.forEach((value, key) => {
            this.StoreArray.push(JSON.parse(value));
        }).catch(err => { console.log('errr', err) })
        console.log("created array", this.StoreArray);
        this.StoreArray.shift();
    }

    buttonClear() {
        this.storage.clear();
        console.log("cleared storage");
    }
}