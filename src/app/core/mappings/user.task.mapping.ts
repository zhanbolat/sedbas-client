import { Response } from '@angular/http'
import {DataMappingInterface} from "../../rest-api/data.mapping.interface";
import {UserTask} from "../model/user.task";

export class UserTaskMapping implements DataMappingInterface {

    mapResponse(res: Response) {
        let userTaskData = new UserTask(res.json())
        return userTaskData
    }

    mapResponseArray(res: Response) {
        let userTaskDataArray: UserTask[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { userTaskDataArray.push(new UserTask(body)) }
        return userTaskDataArray
    }

}
