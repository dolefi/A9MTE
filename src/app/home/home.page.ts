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
    //ID: number = 0;

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

    buttonStore(url, urlToImage, title, description) {

        console.log('Storage driver ', this.storage.driver);
        var array: string[];
        array = [url, urlToImage, title, description]
        let ID = 1;

        this.storage.ready().then((stuff) => {
            console.log('should get old and in with the new');
            
            var name;
            this.storage.get('stored_article_number').then((val) => {
                ID = val;
                ID++;
                name = 'stored_articles_' + ID;
                console.log("pushing: ", JSON.stringify(array));
                this.storage.set(name, JSON.stringify(array));
                this.storage.set('stored_article_number', ID);
            })
        }).catch(err => { console.log('errr', err) })
    }

    buttonGet() {
        this.storage.forEach((value, key) => {
            console.log('Returned Key: ', key);
            console.log('Returned Data: ', JSON.parse(value));
        }).catch(err => { console.log('errr', err) })
    }

    buttonClear() {
        this.storage.clear();
        console.log("cleared storage");
    }
}
