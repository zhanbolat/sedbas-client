import { Response } from '@angular/http'
import {DataMappingInterface} from "../../rest-api/data.mapping.interface";
import {ArchievedHumanTask} from "../model/archieved.human.task";

export class ArchievedHumanTaskMapping implements DataMappingInterface {

    mapResponse(res: Response) {
        let humanTaskData = new ArchievedHumanTask(res.json())
        return humanTaskData
    }

    mapResponseArray(res: Response) {
        let humanTaskDataArray: ArchievedHumanTask[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { humanTaskDataArray.push(new ArchievedHumanTask(body)) }
        return humanTaskDataArray
    }

}
