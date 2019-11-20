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
    NUMBER: number = 0;

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

    buttonSetPush(url, urlToImage, title, description) {

        console.log('Storage driver ', this.storage.driver);
        var array: string[];
        array = [url, urlToImage, title, description]

        console.log('test', JSON.stringify(array));

        this.storage.ready().then((stuff) => {
            console.log('should get old and in with the new');
           
            this.storage.set('stored_articles', JSON.stringify(array));
        }).catch(err => { console.log('errr', err) })
    }

    buttonGetPush() {

        console.log('Storage driver ', this.storage.driver);

        this.storage.get('stored_articles').then((val) => {
            if (val != null) this.maxValue = val;
            console.log('Returned Data: ', JSON.parse(val));

        })
            .catch(err => { console.log('errr', err) })
    }
}
