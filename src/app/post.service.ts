import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  uri = "";

  constructor(private http: HttpClient, private router: Router) {
    this.uri = environment.apiBase;
  }

  createPost(PostTitle, PostMessage) {
    const obj = {
      "title": PostTitle,
      "message": PostMessage
    };
    this.http.post(`${this.uri}/create`, obj)
        .subscribe( res => {
          console.log('Done');
          if( res["code"] == 200 )
            this.router.navigate(['/post/list']);
          else
            alert( "Error Message: " + res["message"] );
        });
  }

  getPosts() {
    return this
           .http
           .get(`${this.uri}/list`);
  }

  updatePost(PostTitle, PostMessage, id) {
    const obj = {
      "id": id,
      "title": PostTitle,
      "message": PostMessage
    };
    this
      .http
      .post(`${this.uri}/update`, obj)
      .subscribe(res => {
        console.log('Update Complete');
        if( res["code"] == 200 )
          this.router.navigate(['/post/list']);
        else
          alert( "Error Message: " + res["message"] );
      });
  }

  deletePost(id) {
    const obj = { "id": id }
    return this
              .http
              .post(`${this.uri}/delete`, obj);
  }
}
