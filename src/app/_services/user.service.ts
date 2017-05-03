import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { User } from '../_models/user';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  private userUrl = '/api/users';

  getAll() {
    return this.http.get(this.userUrl, this.jwt())
      .map((response) => response.json());
  }

  getById( _id: string) {
    return this.http.get(this.userUrl + '/' + _id, this.jwt())
      .map((response) => response.json());
  }

  create(user: User) {
    return this.http.post(this.userUrl + '/register', user, this.jwt());
  }

  update(user: User) {
    return this.http.put(this.userUrl + '/' + user._id, this.jwt());
  }

  delete(_id: string) {
    return this.http.delete(this.userUrl + '/' + _id, this.jwt());
  }

  jwt() {
    //grab jwt token and construct an auth header
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      let headers = new Headers ({'Authorization': 'Bearer ' + user.token });

      return new RequestOptions ({headers: headers});
    }
  }
}
