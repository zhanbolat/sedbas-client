import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import { Router } from '@angular/router'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import {RestApiService} from "../../rest-api/rest.api.service";
import {ResponseModel} from "../../rest-api/response";
import {ErrorResponse} from "../../rest-api/error.response";
import {ConfigService} from "../../config/configs";
import {Credentials} from "../model/credentials";
import {Session} from "../model/session";
import {DataMappingInterface} from "../../rest-api/data.mapping.interface";
import {SessionMapping} from "../session.mapping";

@Injectable()
export class AuthenticationService extends RestApiService {
    private readonly LOGIN_SERVICE_PATH: string = '/loginservice'
    private readonly CURRENT_SESSION_RESOURCE_PATH = '/system/session/unusedid'

    successResponse: ResponseModel
    errorResponse: ErrorResponse

    constructor(
        private configService: ConfigService,
        private http: Http,
        private router: Router)
    {
        super()

        // initialize authentication using current session
        this.getCurrentSession()
            .subscribe(
                currentSession => configService.session = currentSession
            )
    }

    private executeLogin(creds: Credentials): Observable<ResponseModel> {
        let credsUrlEncoded: string = 'username=' + creds.username + '&password=' + creds.password + '&redirect=false'
        let headers: Headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        let options: RequestOptions = new RequestOptions({ headers: headers })
        let postUrl: string = this.configService.baseUrl + this.LOGIN_SERVICE_PATH

        return this.http.post(postUrl, credsUrlEncoded, options)
            .map(this.mapSuccessResponse)
            .catch(this.handleResponseError)
    }

    getCurrentSession(): Observable<Session> {
        let sessionMapping: DataMappingInterface = new SessionMapping()
        return this.http.get(this.configService.apiUrl + this.CURRENT_SESSION_RESOURCE_PATH, this.configService.options)
            .map(sessionMapping.mapResponse)
            .catch(this.handleResponseError)

    }

    login(creds: Credentials) {
        this.executeLogin(creds)
            .subscribe(
                successResponse => {
                    this.successResponse = successResponse
                    this.getCurrentSession()
                        .subscribe(
                            session => {
                                if (creds.username == session.user_name) {
                                    this.configService.session = session
                                    if (creds.navigateTo) { this.router.navigate([creds.navigateTo]) }
                                }
                            },
                            errorResponse => this.errorResponse = errorResponse
                        )
                },
                errorResponse => this.errorResponse = errorResponse
            )
    }

}
