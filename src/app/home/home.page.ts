import { Component, OnInit} from '@angular/core';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

    countries: any[] = [
        {
            id: 1,
            name: 'Czech',
            code: 'cz',
        },
        {
            id: 2,
            name: 'Slovakia',
            code: 'sk',
        },
        {
            id: 3,
            name: 'Russia',
            code: 'ru',
        },
        {
            id: 4,
            name: 'America',
            code: 'us',
        },
        {
            id: 5,
            name: 'Germany',
            code: 'de',
        }
    ];


    newsArray: any = [];
    constructor(private news: NewsService, private router: Router) {
    }

    ngOnInit(): void {
        this.loadHeadLines();
    }

    loadHeadLines() {
        
        this.news.getNews("cz").subscribe(news => {
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

