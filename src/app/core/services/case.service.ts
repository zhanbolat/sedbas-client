import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import {RestApiService} from "../../rest-api/rest.api.service";
import {ConfigService} from "../../config/configs";
import {SearchParams} from "../model/search.params";
import {Case} from "../model/case";
import {CaseMapping} from "../mappings/case.mapping";

@Injectable()
export class CaseService extends RestApiService {
    private resourcePath: string = '/bpm/case'
    private resourceUrl: string

    constructor(
        private configService: ConfigService,
        private http: Http
    )
    {
        super()

        // configure resource urls
        this.resourceUrl = configService.apiUrl + this.resourcePath
    }

    searchCases(searchParms: SearchParams): Observable<Case[]> {
        let caseMapping: CaseMapping = new CaseMapping()
        return this.http.get(this.buildSearchRequest(searchParms), this.configService.options)
            .map(caseMapping.mapResponseArray)
            .catch(this.handleResponseError)
    }

    private buildSearchRequest(searchParms: SearchParams): string {
        return this.resourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

    getCase(caseId: string): Observable<Case> {
        let caseMapping: CaseMapping = new CaseMapping()
        return this.http.get(this.resourceUrl + '/' + caseId, this.configService.options)
            .map(caseMapping.mapResponse)
            .catch(this.handleResponseError)
    }

    getCaseContext(caseId: string): Observable<any> {
        return this.http.get(this.resourceUrl + '/' + caseId + '/context', this.configService.options)
            .map(this.mapping.mapResponse)
            .catch(this.handleResponseError)
    }

}
