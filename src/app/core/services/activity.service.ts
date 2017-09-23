import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import {RestApiService} from "../../rest-api/rest.api.service";
import {ConfigService} from "../../config/configs";
import {SearchParams} from "../model/search.params";
import {Activity} from "../model/activity";
import {DataMappingInterface} from "../../rest-api/data.mapping.interface";
import {ActivityMapping} from "../mappings/activity.mapping";

@Injectable()
export class ActivityService extends RestApiService {
    private readonly ACTIVITY_RESOURCE_PATH: string = '/bpm/activity'
    private activityResourceUrl: string

    constructor(
        private configService: ConfigService,
        private http: Http
    )
    {
        super()
        this.activityResourceUrl = configService.apiUrl + this.ACTIVITY_RESOURCE_PATH
    }

    searchActivities(searchParms: SearchParams): Observable<Activity[]> {
        let activityMapping: DataMappingInterface = new ActivityMapping()
        return this.http.get(this.buildActivitySearchRequest(searchParms), this.configService.options)
            .map(activityMapping.mapResponseArray)
            .catch(this.handleResponseError)
    }

    private buildActivitySearchRequest(searchParms: SearchParams): string {
        return this.activityResourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

    getActivity(activityId: string): Observable<Activity> {
        let activityMapping: DataMappingInterface = new ActivityMapping()
        return this.http.get(this.activityResourceUrl + '/' + activityId, this.configService.options)
            .map(activityMapping.mapResponse)
            .catch(this.handleResponseError)
    }

}
