import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VidloaderComponent } from './vidloader/vidloader.component';


const routes: Routes = [
  { path: '', component: VidloaderComponent },
  // Routes for pagination
  { path: 'page/:currentPage/:prevPageToken', component: VidloaderComponent },
  { path: 'page/:currentPage/:nextPageToken', component: VidloaderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
