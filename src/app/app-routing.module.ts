import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostHomeComponent } from './post-home/post-home.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostUpdateComponent } from './post-update/post-update.component';

const routes: Routes = [
  {
    path: 'post/home',
    component: PostHomeComponent
  },
  {
    path: 'post/list',
    component: PostListComponent
  },
  {
    path: 'post/create',
    component: PostCreateComponent
  },
  {
    path: 'post/update',
    component: PostUpdateComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
