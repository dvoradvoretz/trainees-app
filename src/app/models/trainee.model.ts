export interface Trainee {
    id: string;
    name: string;
    date: string;
    grade: number;
    subject: string;

}

export interface TraineeStateModel {
    trainees: Trainee[];
    filterText: string;
}