import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
    NewsApi = 'https://newsapi.org/v2/';
    apiKey = '&apiKey=209c9f1a45bf422c8127881fe60969ec';
    constructor(private http: HttpClient) { }

    getNews(loc) {
        const url = this.NewsApi + 'top-headlines?country=' + loc + this.apiKey;
        return this.http.get(url);
    }
}
