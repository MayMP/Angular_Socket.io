import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  angForm: FormGroup;

  constructor(private fb: FormBuilder, private ps: PostService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      PostTitle: ['', Validators.required ],
      PostMessage: ['', Validators.required ]
    });
  }

  createPost(PostTitle, PostMessage){
    this.ps.createPost(PostTitle, PostMessage);
  }

  ngOnInit() {
  }
}
