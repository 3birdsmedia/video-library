
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //apiKey: string = 'AIzaSyD1HtugodenyvisPbzf7laAEY9ktdqD970' 
  //apiKey: string = 'AIzaSyCeV6KjUGKjl-Y5hVXAMhMjjw-5VSp-AJ8' // Quota met 
  apiKey: string = 'AIzaSyDSkNPg1jgg7L6QXIuDVCNslAYC3nF2YOI'
  apiBaseUrl: string = 'https://www.googleapis.com/youtube/v3/'
  videos: any[]
  channelId: string = 'UCbn1OgGei-DV7aSRo_HaAiw'
  maxResults: number = 10
  errorMessage: string = "Loading"

  constructor(public http: HttpClient) { }

  // This gets the group of videos, per 10, gets call on init to fill the first 10, and then anytime a pagination button gets clicked
  //        Channel Id, Number of videos to load, sort order, previous and next page tokens
  getVideos(channel, maxResults, order, prevPage, nextPage ) {
    let url = this.apiBaseUrl + 'search?key=' + this.apiKey + '&channelId=' + channel + '&order=' + order + '&part=snippet&type=video,id&maxResults=' + maxResults
    
    // If there are tokens, append them to the url to load the next or previous page
    console.log(nextPage)
    if(prevPage || nextPage){
      url+="&pageToken="+prevPage+nextPage
    }
    
    // Load the videos from Youtube
    console.log(url)
    return this.http.get(url)
      .pipe((res => {
          return res;
        }),
        // Handle the error on this call since it is the first chance the API would load
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err)
          this.errorMessage = 'There was a ' + err.status + ': "' + err.statusText + '" error, with the message: ' + err.message
          return throwError(err)
        })
      )
  }
}

