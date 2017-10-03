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
import {ResponseModel} from "../../rest-api/response";
import {TaskUpdateInput} from "../model/task.update.input";

@Injectable()
export class HumanTaskService extends RestApiService {
    private readonly HUMAN_TASK_RESOURCE_PATH: string = '/bpm/humanTask'
    private humanTaskResourceUrl: string
    // private readonly TASK_FORM_PATH: string = '/bonita/portal/homepage?ui=form&locale=en'
    private readonly TASK_FORM_PATH: string = '/bonita/portal/resource/taskInstance/'
    private taskFormUrl: string

    constructor(
        private configService: ConfigService,
        private http: Http
    )
    {
        super()
        this.humanTaskResourceUrl = configService.apiUrl + this.HUMAN_TASK_RESOURCE_PATH
        this.taskFormUrl = configService.hostUrl + this.TASK_FORM_PATH
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

    assignHumanTask(humanTaskId: string, userId?: string): Observable<ResponseModel> {
        let body: TaskUpdateInput = new TaskUpdateInput()

        if (userId) {
            // assign to specified user
            body.assigned_id = userId
        } else {
            // assign to current logged user
            body.assigned_id = this.configService.session.user_id
        }

        let putUrl = this.humanTaskResourceUrl + '/' + humanTaskId
        return this.http.put(putUrl, body, this.configService.sendOptions)
            .map(this.mapSuccessResponse)
            .catch(this.handleResponseError)
    }

    getTaskURI(processDefinitionName: string,
               processDefinitionVersion: string, activityInstanceName: string,
               activityInstanceId: string): string {

        return this.taskFormUrl + processDefinitionName + '/' + processDefinitionVersion
            + '/' +  activityInstanceName + '/content/?id=' + activityInstanceId;
    }
}
