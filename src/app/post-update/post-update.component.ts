import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import Post from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css']
})
export class PostUpdateComponent implements OnInit {

  posts: Post[];
  angForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private ps: PostService) {
    this.posts = this.router.getCurrentNavigation().extras.state[0];
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      PostTitle: ['', Validators.required ],
      PostMessage: ['', Validators.required ]
    });
  }

  // Update
  updatePost(PostTitle, PostMessage){
    this.ps.updatePost(PostTitle, PostMessage, this.posts['id']);
  }

  ngOnInit() {
  }

}
