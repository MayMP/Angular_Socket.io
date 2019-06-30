import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import Post from '../post';
import { PostService } from '../post.service';
import { PostDetailComponent } from '../post-detail/post-detail.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  private BASE_URL = environment.socketUrl;
  private socket;
  posts: Post[];
  constructor(private ps: PostService, private modalService: NgbModal, private router: Router) {
	this.socket = io(this.BASE_URL);
  }

  ngOnInit() {
    this.getPost();
    this.socket.on('newTask', () => {
      this.getPost();
    });
  }

  // Get All Data
  getPost(){
    this.ps.getPosts().subscribe( (data: Post[]) => {
      this.posts = data["data"];
    });
  }
  
  // View Detail
  detailPost(id) {
    let detailData: { title: string, message: string }[];
    this.posts.map( (item, index) => {
      if( item['_id'] == id ){
        detailData = [
          { "title": item['title'], "message": item['message'] }
        ];
      }
    });

    const modalRef =  this.modalService.open(PostDetailComponent);
    modalRef.componentInstance.data = detailData;
  }

  // Update
  updatePost(id){
    let updateData: { id: string, PostTitle: string, PostMessage: string }[];
    this.posts.map( (item, index) => {
      if( item['_id'] == id ){
        updateData = [
          { "id": item['_id'], "PostTitle": item['title'], "PostMessage": item['message'] }
        ];
      }
    });
    this.router.navigate(['/post/update'], { state: updateData });
  }

  // Delete
  deletePost(id) {
    if(window.confirm('Are sure you want to delete this post ?')){
      this.ps.deletePost(id).subscribe(res => {
        let deleteIndex: number;
        this.posts.map( (item, index) => {
          if( item['_id'] == id ) 
            deleteIndex = index;
        });
        this.posts.splice(deleteIndex, 1);
      });
    }
  }
}
