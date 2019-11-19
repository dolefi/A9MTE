import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DownloadService {
    DwnApi = 'https://restpack.io/api/screenshot/v6/capture?access_token=';
    apiKey = 'TEST';
    constructor(private http: HttpClient) { }

    downloadArticle(url) {
        const url2 = this.DwnApi + this.apiKey + '&url=' + url + '&json=true&format=png&mode=fullpage&block_ads=true&block_cookie_warnings=true&retina=true&width=1080&height=1920&user_agent=Mozilla%2F5.0%20(iPhone%3B%20CPU%20iPhone%20OS%2011_0%20like%20Mac%20OS%20X)%20Safari%2F604.1';
        return this.http.get(url2);
    }
}
