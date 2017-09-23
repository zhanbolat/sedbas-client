import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {Task} from '../model/task';
import { ConfigService } from '../../config/configs'
import { RestApiService } from '../../rest-api/rest.api.service'
import { SearchParams } from "../model/search.params";
import {DataMappingInterface} from "../../rest-api/data.mapping.interface";
import {TaskMapping} from "../mappings/task.mapping";

@Injectable()
export class TaskService extends RestApiService {
    private readonly TASK_RESOURCE_PATH: string = '/bpm/task'
    private taskResourceUrl: string

    constructor(
        private configService: ConfigService,
        private http: Http
    )
    {
        super()
        this.taskResourceUrl = configService.apiUrl + this.TASK_RESOURCE_PATH
    }

    searchTasks(searchParms: SearchParams): Observable<Task[]> {
        console.log("Url: ", this.buildTaskSearchRequest(searchParms));
        let taskMapping: DataMappingInterface = new TaskMapping()
        return this.http.get(this.buildTaskSearchRequest(searchParms), this.configService.options)
            .map(taskMapping.mapResponseArray)
            .catch(this.handleResponseError)
    }

    private buildTaskSearchRequest(searchParms: SearchParams): string {
        return this.taskResourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

    getTask(taskId: string): Observable<Task> {
        let taskMapping: DataMappingInterface = new TaskMapping()
        return this.http.get(this.taskResourceUrl + '/' + taskId, this.configService.options)
            .map(taskMapping.mapResponse)
            .catch(this.handleResponseError)
    }
}
