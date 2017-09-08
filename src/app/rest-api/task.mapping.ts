import { Response } from '@angular/http'

import { DataMappingInterface } from './data.mapping.interface'
import { Task } from '../core/model/task'

export class TaskMapping implements DataMappingInterface {

    mapResponse(res: Response) {
        let taskData = new Task(res.json())
        return taskData
    }

    mapResponseArray(res: Response) {
        console.log("res", res.json());
        let taskDataArray: Task[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { taskDataArray.push(new Task(body)) }
        return taskDataArray
    }

}
