import {Trainee} from "../../models/trainee.model";

export class GetAllTrainees {
    static readonly type = '[Main List] GetAllTrainees';
}

export class EditTrainee {
    static readonly type = '[Trainee] EditTrainee';

    constructor(public payload: Trainee) {
    }
}

export class AddTrainee {
    static readonly type = '[Trainee] Add';

    constructor(public payload: Trainee) {
    }
}

export class RemoveTrainee {
    static readonly type = '[Trainee] Remove';

    constructor(public payload: string) {
    }
}

export class FilterTraineesByTxt {
    static readonly type = '[Trainee] Filter By Txt';

    constructor(public payload: any) {
    }
}

export class FilterTraineesByRange {
    static readonly type = '[Trainee] Filter By Range';

    constructor(public payload: any) {
    }
}

export class GetPassedAndFailedTrainees {
    static readonly type = '[Monitor] GetPassedAndFailedTrainees';
    constructor(public payload: any) {
    }

}

export class GetGradeAveragePerSubject {
    static readonly type = '[Analysis Averages] GetAverages By Ids and Subjects';

    constructor(public payload: any) {
    }

}