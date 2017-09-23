import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import {RestApiService} from "../../rest-api/rest.api.service";
import {ConfigService} from "../../config/configs";
import {UserTask} from "../model/user.task";
import {DataMappingInterface} from "../../rest-api/data.mapping.interface";
import {UserTaskMapping} from "../mappings/user.task.mapping";
import {ResponseModel} from "../../rest-api/response";
import {TaskUpdateInput} from "../model/task.update.input";


@Injectable()
export class UserTaskService extends RestApiService {
    private readonly USER_TASK_RESOURCE_PATH: string = '/bpm/userTask'
    private userTaskResourceUrl: string

    constructor(
        private configService: ConfigService,
        private http: Http
    )
    {
        super()

        // configure resource urls
        this.userTaskResourceUrl = configService.apiUrl + this.USER_TASK_RESOURCE_PATH
    }

    getUserTask(userTaskId: string): Observable<UserTask> {
        let userTaskMapping: DataMappingInterface = new UserTaskMapping()
        return this.http.get(this.userTaskResourceUrl + '/' + userTaskId, this.configService.options)
            .map(userTaskMapping.mapResponse)
            .catch(this.handleResponseError)
    }

    getUserTaskContext(userTaskId: string): Observable<any> {
        return this.http.get(this.userTaskResourceUrl + '/' + userTaskId + '/context', this.configService.options)
            .map(this.mapping.mapResponse)
            .catch(this.handleResponseError)
    }

    assignUserTask(userTaskId: string, userId?: string): Observable<ResponseModel> {
        let body: TaskUpdateInput = new TaskUpdateInput()

        if (userId) {
            // assign to specified user
            body.assigned_id = userId
        } else {
            // assign to current logged user
            body.assigned_id = this.configService.session.user_id
        }

        let putUrl = this.userTaskResourceUrl + '/' + userTaskId
        return this.http.put(putUrl, body, this.configService.sendOptions)
            .map(this.mapSuccessResponse)
            .catch(this.handleResponseError)

    }

    executeUserTask(userTaskId: string, contractValues: any): Observable<ResponseModel> {
        let postUrl = this.userTaskResourceUrl + '/' + userTaskId + '/execution'
        return this.http.post(postUrl, contractValues, this.configService.sendOptions)
            .map(this.mapSuccessResponse)
            .catch(this.handleResponseError)
    }

}
