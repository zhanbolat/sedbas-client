import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {User} from '../../core/model/user';
import {API_URL} from '../../app.component';
import {Session} from "../model/session";
import {DataMappingInterface} from "../../rest-api/data.mapping.interface";
import {SessionMapping} from "../session.mapping";
import {RestApiService} from "../../rest-api/rest.api.service";
import {ConfigService} from "../../config/configs";

@Injectable()
export class AuthService extends RestApiService {
    private readonly LOGIN_SERVICE_PATH: string = '/loginservice'
    private readonly CURRENT_SESSION_RESOURCE_PATH = '/system/session/unusedid'
    isLoggedIn = false;

    constructor(private configService: ConfigService,
                private http: Http) {
        super()

        // initialize authentication using current session
        this.getCurrentSession()
            .subscribe(
                currentSession => configService.session = currentSession
            )
    }

    private static handleError(error: any) {
        const errorMessage = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : `Server error`;
        console.log(errorMessage);
        return Observable.throw(errorMessage);
    }

    login(user: User): Observable<boolean> {
        console.log("Login function called. ");
        return this.http.post(API_URL + '/login', user)
            .map(response => response.json())
            .map((currentUser: User) => {
                console.log("Return isLoggedIn true. currentUser: " + currentUser.email);
                if (!User.isNull(currentUser)) {
                    this.isLoggedIn = true;
                    return true;
                } else {
                    this.isLoggedIn = false;
                    return false;
                }
            })
            .catch(AuthService.handleError);
    }

    getCurrentSession(): Observable<Session> {
        let sessionMapping: DataMappingInterface = new SessionMapping()
        return this.http.get(this.configService.apiUrl + this.CURRENT_SESSION_RESOURCE_PATH, this.configService.options)
            .map(sessionMapping.mapResponse)
            .catch(this.handleResponseError)
    }

    logOut(): Observable<boolean> {
        this.isLoggedIn = !this.isLoggedIn;
        return Observable.of(false);
    }

}
