import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiService } from "./api.service";

@Component({
  selector: 'app-vidloader',
  templateUrl: './vidloader.component.html',
  styleUrls: ['./vidloader.component.scss']
})
export class VidloaderComponent implements OnInit {

  title = 'video-library'
  videos: any[]
  // Variables for pagination
  currentPage: number
  prevPageToken: string
  nextPageToken: string
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { 
    // Setting up functions here vs ngOnInit() to catch route changes easier and load the api then
    router.events.forEach((event) => {
      // Taking advantage of NavigationEnd since it fires on load too. 
      if(event instanceof NavigationEnd) {
        
        // Declare the var we will be using
        this.videos = []
        this.apiService.channelId
        this.apiService.maxResults
        this.prevPageToken
        this.nextPageToken
        this.currentPage
    
        // Get variables from query string if it exists
        this.route.paramMap.subscribe(params => {
          this.prevPageToken = params.get('prevPageToken');
          this.nextPageToken = params.get('nextPageToken');
          this.currentPage = Number(params.get('currentPage'));
        });
        
        //console.log("Tokens prev: " + this.prevPageToken + " next: " + this.nextPageToken )
        
        // If there is a previus page token present then pass it into the funtion to call the next page
        // Else if there is a next page token then pass it into the funtion to call the previous page
        // Default, no tokens are present then call the funtion for the first load
        if(this.prevPageToken){
          console.log("Fetching prev " + this.apiService.maxResults)
          this.apiService.getVideos(this.apiService.channelId, this.apiService.maxResults, 'date', this.prevPageToken, '')
          .subscribe(list => {
            for (let element of list["items"]) {
              this.videos.push(element)
            }
            this.prevPageToken = list["prevPageToken"]
            this.nextPageToken = list["nextPageToken"]
            this.currentPage = this.currentPage
            // console.log("Prev page token is now " + this.prevPageToken)
            // console.log("Next page token is now " + this.nextPageToken)
          });
        }else if(this.nextPageToken){
          // console.log("Fetching next " + this.apiService.maxResults + " Next page token is " + this.nextPageToken)
          this.apiService.getVideos(this.apiService.channelId, this.apiService.maxResults, 'date', '', this.nextPageToken)
            .subscribe(list => {
              for (let element of list["items"]) {
                this.videos.push(element)
              }
              this.prevPageToken = list["prevPageToken"]
              this.nextPageToken = list["nextPageToken"]
              this.currentPage = this.currentPage
              // console.log("Prev page token is now " + this.prevPageToken)
              // console.log("Next page token is now " + this.nextPageToken)
          });
        }else{
          //                       (channel, maxResults, orderby, nextpagetoken) {
          this.apiService.getVideos(this.apiService.channelId, this.apiService.maxResults, 'date', '', '')
            .subscribe(list => {
              for (let element of list["items"]) {
                this.videos.push(element)
              }
              this.nextPageToken = list["nextPageToken"]
              this.currentPage = 1
            });
        }    
      }
    });

  }

  ngOnInit() {
  
  }      
}
