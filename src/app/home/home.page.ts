import { Component, OnInit} from '@angular/core';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

    country_select: any;

    newsArray: any = [];
    constructor(private news: NewsService, private router: Router) {
    }

    ngOnInit(): void {
        this.loadHeadLines("cz");
    }

    selectChange(country_select) {
        this.loadHeadLines(this.country_select);
        console.info("Selected:", country_select);
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

}

export class SelectExample {
    
}

