import {Activity} from "./activity";
import {Utils} from "../../util/utils";

export class ArchievedHumanTask extends Activity {

    sourceObjectId: string // "id (long) of the original humanTask before archiving",
    archivedDate: Date // "the date (('yyyy-MM-dd HH:mm:ss.SSS')) when this humanTask was archived, for example '2014-10-17 16:05:42.626'",

    constructor(humanTaskData: any)
    {
        super(humanTaskData)
        const utils = new Utils()
        this.archivedDate = utils.getDateValue(humanTaskData.archivedDate)
        this.sourceObjectId = humanTaskData.sourceObjectId
    }

}
