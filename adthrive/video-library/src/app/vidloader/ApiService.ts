import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiKey: string = 'AIzaSyD1HtugodenyvisPbzf7laAEY9ktdqD970';
  constructor(public http: HttpClient) { }
  getVideos(channel, maxResults, order) {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channel + '&order=' + order + '&part=snippet&type=video,id&maxResults=' + maxResults;
    return this.http.get(url)
      .pipe((res => {
        return res;
      }));
  }
}
