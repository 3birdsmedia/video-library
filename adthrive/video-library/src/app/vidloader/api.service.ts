
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiKey: string = 'AIzaSyD1HtugodenyvisPbzf7laAEY9ktdqD970'
  apiBaseUrl: string = 'https://www.googleapis.com/youtube/v3/'
  channelDetails: any[]
  uploadId: any[]

  constructor(public http: HttpClient) { }

  // This gets the group of videos, per 10, gets call on init to fill the first 10, and then anytime a pagination button gets clicked
  getVideos(channel, maxResults, order, prevPage, nextPage ) {
    let url = this.apiBaseUrl + 'search?key=' + this.apiKey + '&channelId=' + channel + '&order=' + order + '&part=snippet&type=video,id&maxResults=' + maxResults
    
    //console.log(nextPage)
    if(prevPage || nextPage){
      url+="&pageToken="+prevPage+nextPage
    }
    
    //console.log(url)
    return this.http.get(url)
      .pipe((res => {
        return res;
      }));
  }
}

