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

    newsArray: any = [];
    downloadArray: any = [];
    constructor(private news: NewsService, private router: Router, private download: DownloadService, private router2: Router) {
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

    Download_article(URL) {

        this.download.downloadArticle(URL).subscribe(downloadArray => {
            this.newsArray = downloadArray['returned_data'];
            console.log(this.downloadArray);
        });
    }

    getDetails(news) {
        this.router.navigate(['/newsdetail', { 'title': news.title, 'desc': news.description, 'img': news.urlToImage, 'url': news.url }]);
    }

    getDetailsDownload(download) {
        this.router2.navigate(['/downloaddetail', { 'file': download.file, 'length': download.length }]);
    }
}
