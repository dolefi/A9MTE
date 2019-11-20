import { Component, OnInit} from '@angular/core';
import { NewsService } from '../news.service';
import { DownloadService } from '../download.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

    newsArray: any = [];
    downloadArray: any = [];
    maxValue: string = "Nothing gotten yet";

    constructor(private news: NewsService, private router: Router, private download: DownloadService, private router2: Router, private storage: Storage) {
    }


    ngOnInit(): void {
        this.loadHeadLines("cz");
    }

    selectChange(country_select: any) {
        this.loadHeadLines(country_select);
    }

    loadHeadLines(location) {

        this.news.getNews(location).subscribe(news => {
            this.newsArray = news['articles'];
            console.log(this.newsArray);
        });
    }

    getDetails(news) {
        this.router.navigate(['/newsdetail', { 'title': news.title, 'desc': news.description, 'img': news.urlToImage, 'url': news.url }]);
    }

    buttonSetPush(url) {

        console.log('Storage driver ', this.storage.driver);

        this.storage.ready().then((stuff) => {
            console.log('stuff', stuff);
            this.storage.set('URL', url)
        }).catch(err => { console.log('errr', err) })
    }

    buttonGetPush() {

        console.log('Storage driver ', this.storage.driver);

        this.storage.get('URL').then((val) => {
            if (val != null) this.maxValue = val;
            console.log('Your name is', val);
        })
            .catch(err => { console.log('errr', err) })
    }
}
