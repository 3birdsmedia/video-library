import { Component, OnInit } from '@angular/core';
import { ApiService } from "./ApiService";

@Component({
  selector: 'app-vidloader',
  templateUrl: './vidloader.component.html',
  styleUrls: ['./vidloader.component.scss']
})
export class VidloaderComponent implements OnInit {

  title = 'video-library';
  videos: any[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.videos = [];
    this.apiService
      //         (channel, maxResults, order) {
      .getVideos('UCbn1OgGei-DV7aSRo_HaAiw', 10, 'date')
      .subscribe(lista => {
        for (let element of lista["items"]) {
          this.videos.push(element)
        }

      });
  }

}
