// // Section 1
// import  {State, Action, StateContext, Selector} from '@ngxs/store';
// import {AddTrainee, GetAllTrainees, RemoveTrainee} from '../actions/trainees.actions'
// import {Trainee} from "../models/trainee.model";
//
// // Section 2
// export class TraineeStateModel {
//     trainees: Trainee[];
// }
//
// // Section 3
// @State<TraineeStateModel>({
//     name: 'trainee',
//     defaults: {
//         trainees: []
//     }
// })
// export class TraineeState {
//     trainees = [
//         { id: '206', name: 'Yael', subject: 'EN', grade: 80, date: '02.01.2020' },
//         { id: '206', name: 'Yael', subject: 'EN', grade: 89, date: '02.02.2020' },
//         { id: '206', name: 'Yael', subject: 'EN', grade: 80, date: '02.03.2020' },
//         { id: '206', name: 'Yael', subject: 'EN', grade: 100, date: '02.04.2020' },
//         { id: '206', name: 'Yael', subject: 'History', grade: 80, date: '02.02.2020' }
//         ];
//
//     // Section 4
//     @Selector()
//     static getAllTrainees(state: TraineeStateModel) {
//         return state.trainees
//     }
//
//     @Action(GetAllTrainees)
//     getAllTrainees({patchState}: StateContext<TraineeStateModel>,
//                    {}: GetAllTrainees) {
//         patchState({
//             trainees: this.trainees
//         });
//     }
//
//     // Section 5
//     @Action(AddTrainee)
//     add({getState, patchState}: StateContext<TraineeStateModel>, {payload}: AddTrainee) {
//         const state = getState();
//         patchState({
//             trainees: [...state.trainees, payload]
//         })
//     }
//
//     @Action(RemoveTrainee)
//     remove({getState, patchState}: StateContext<TraineeStateModel>, {payload}: RemoveTrainee) {
//         patchState({
//             trainees: getState().trainees.filter(a => a.id != payload)
//         })
//     }
//
// }