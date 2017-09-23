import { Response } from '@angular/http'
import {DataMappingInterface} from "../../rest-api/data.mapping.interface";
import {HumanTask} from "../model/human.task";

export class HumanTaskMapping implements DataMappingInterface {

    mapResponse(res: Response) {
        let humanTaskData = new HumanTask(res.json())
        return humanTaskData
    }

    mapResponseArray(res: Response) {
        let humanTaskDataArray: HumanTask[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { humanTaskDataArray.push(new HumanTask(body)) }
        return humanTaskDataArray
    }

}
