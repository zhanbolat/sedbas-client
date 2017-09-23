import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import {RestApiService} from "../../rest-api/rest.api.service";
import {ConfigService} from "../../config/configs";
import {SearchParams} from "../model/search.params";
import {HumanTask} from "../model/human.task";
import {DataMappingInterface} from "../../rest-api/data.mapping.interface";
import {HumanTaskMapping} from "../mappings/human.task.mapping";

@Injectable()
export class HumanTaskService extends RestApiService {
    private readonly HUMAN_TASK_RESOURCE_PATH: string = '/bpm/humanTask'
    private humanTaskResourceUrl: string

    constructor(
        private configService: ConfigService,
        private http: Http
    )
    {
        super()
        this.humanTaskResourceUrl = configService.apiUrl + this.HUMAN_TASK_RESOURCE_PATH
    }

    searchHumanTasks(searchParms: SearchParams): Observable<HumanTask[]> {
        let humanTaskMapping: DataMappingInterface = new HumanTaskMapping()
        return this.http.get(this.buildHumanTaskSearchRequest(searchParms), this.configService.options)
            .map(humanTaskMapping.mapResponseArray)
            .catch(this.handleResponseError)
    }

    private buildHumanTaskSearchRequest(searchParms: SearchParams): string {
        return this.humanTaskResourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

    getHumanTask(humanTaskId: string): Observable<HumanTask> {
        let humanTaskMapping: DataMappingInterface = new HumanTaskMapping()
        return this.http.get(this.humanTaskResourceUrl + '/' + humanTaskId, this.configService.options)
            .map(humanTaskMapping.mapResponse)
            .catch(this.handleResponseError)
    }

}
