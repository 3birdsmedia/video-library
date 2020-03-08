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
  channelId: string = 'UCbn1OgGei-DV7aSRo_HaAiw'
  maxResults: number = 10
  currentPage: number
  prevPageToken: string
  nextPageToken: string
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { 
    
    router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        
        this.videos = []
        this.prevPageToken
        this.nextPageToken
        this.currentPage
    
        this.route.paramMap.subscribe(params => {
          this.prevPageToken = params.get('prevPageToken');
          this.nextPageToken = params.get('nextPageToken');
          this.currentPage = Number(params.get('currentPage'));
        });
        
        console.log("Tokens prev: " + this.prevPageToken + " next: " + this.nextPageToken )
    
        if(this.prevPageToken){
          console.log("Fetching prev " + this.maxResults)
          this.apiService.getVideos(this.channelId, this.maxResults, 'date', this.prevPageToken, '')
          .subscribe(list => {
            for (let element of list["items"]) {
              this.videos.push(element)
            }
            this.prevPageToken = list["prevPageToken"]
            this.nextPageToken = list["nextPageToken"]
            this.currentPage = this.currentPage
            console.log("Prev page token is now " + this.prevPageToken)
            console.log("Next page token is now " + this.nextPageToken)
          });
        }else if(this.nextPageToken){
          console.log("Fetching next " + this.maxResults + " Next page token is " + this.nextPageToken)
          this.apiService.getVideos(this.channelId, this.maxResults, 'date', '', this.nextPageToken)
            .subscribe(list => {
              for (let element of list["items"]) {
                this.videos.push(element)
              }
              this.prevPageToken = list["prevPageToken"]
              this.nextPageToken = list["nextPageToken"]
              this.currentPage = this.currentPage
              console.log("Prev page token is now " + this.prevPageToken)
              console.log("Next page token is now " + this.nextPageToken)
          });
        }else{
          //                       (channel, maxResults, orderby, nextpagetoken) {
          this.apiService.getVideos(this.channelId, this.maxResults, 'date', '', '')
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
