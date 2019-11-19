import { Component, OnInit} from '@angular/core';
import { NewsService } from '../news.service';
import { DownloadService } from '../download.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

    country_select: any;

    newsArray: any = [];
    downloadArray: any = [];
    constructor(private news: NewsService, private router: Router, private download: DownloadService) {
    }


    ngOnInit(): void {
        this.loadHeadLines("cz");
    }

    selectChange(country_select) {
        this.loadHeadLines(this.country_select);
    }

    loadHeadLines(location) {

        this.news.getNews(location).subscribe(news => {
            this.newsArray = news['articles'];
            console.log(this.newsArray);
        });
    }

    Download_article(URL) {

        this.downloadArticle(URL).subscribe(downloadArray => {
            this.newsArray = downloadArray['returned_data'];
            console.log(this.downloadArray);
        });
    }

    getDetails(news) {
        this.router.navigate(['/newsdetail', { 'title': news.title, 'desc': news.description, 'img': news.urlToImage, 'url': news.url }]);
    }

}
