import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

@Injectable()
export class AuthService {
    private authUrl = '/api/authenticate';

    constructor(private http: Http) { }

    login(username: string, password: string) {
        return this.http.post(this.authUrl, {username: username, password: password})  
            .map((response) => {
              let user = response.json();
              if (user && user.token) {
                localStorage.setItem('user', JSON.stringify(user));
              }
            });
    }

    logout(credentials) {
        localStorage.removeItem('user');
    }
}
