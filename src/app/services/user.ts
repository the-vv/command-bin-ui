import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageKey } from '../models/storage';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  private _user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  public get token(): string | null {
    return localStorage.getItem(LocalStorageKey.TOKEN)
  }
  public set token(value: string | null) {
    if (value) {
      localStorage.setItem(LocalStorageKey.TOKEN, value);
    } else {
      localStorage.removeItem(LocalStorageKey.TOKEN);
    }
  }

  public isAuthenticated(): boolean {
    return !!this.token && !!this._user.value;
  }

  public setAuthState(user: User | null, token?: string) {
    this._user.next(user);
    this.token = token || null;
  }

  public logout() {
    this.setAuthState(null);
    this.token = null;
  }

  public loginAsync(user: Omit<User, 'id' | 'name'> & { password: string }) {
    return this.http.post<{ user: User; access_token: string }>(`${environment.apiBaseUrl}/auth/signin`, user)
  }

  public registerAsync(user: Omit<User, 'id'> & { password: string }) {
    return this.http.post<{ user: User; access_token: string }>(`${environment.apiBaseUrl}/auth/signup`, user)
  }

}
