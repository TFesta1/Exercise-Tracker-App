import { ref } from 'vue';
import { api } from './session';
import type { DataListEnvelope, DataEnvelope } from './myFetch';


export interface Workout {
    username: string;
    workoutType: string;
    description: string;
    intensity: string;
}

export interface KindsOfWorkouts {
    legs: string;
    back: string;
    chest: string;
}


export interface EditWorkout {
    description: string;
    intensity: string;
}




export function getAllWorkouts() : Promise<DataEnvelope<KindsOfWorkouts>>{
    // return allWorkouts;
    return api('workouts')
}

export function getUserWorkouts(user: string) : Promise<DataListEnvelope<Workout>> {
    // return allWorkouts.filter(workout => workout.username === user);
    return api('workouts/getUserWorkouts/' + user)
}

export function getWorkoutById(id: number) : Promise<DataEnvelope<EditWorkout>>{
    console.log("getting workout by id " + id)
    return api('workouts/getWorkoutById/' + id)
}

// const workouts = ref(getWorkouts())

export function addToWorkout(workout: Workout){
    // workouts.value.push(workout);
    /*
    {
        "username": "fillIn",
        "workoutType": "test",
        "description": "test",
        "intensity": "Normal"
    }
    */
    return api('workouts/addWorkout', workout)
}

export function removeWorkout(index: number) : Promise<DataListEnvelope<Workout[]>>{
    // workouts.value.splice(index, 1);
    console.log("removed workout " + index)
    return api('workouts/removeWorkout/' + index)
    // console.log("Workout removed " + workouts.value )
}

export function removeWorkoutFromTable(index: number) : Promise<DataEnvelope<KindsOfWorkouts>>{
    // workouts.value.splice(index, 1);
    console.log("removing workout on table " + index)
    return api('workouts/removeWorkoutFromTable/' + index)
    // console.log("Workout removed " + workouts.value )
}

export function editWorkout(id: number, workout: EditWorkout) : Promise<DataEnvelope<EditWorkout>>{
    console.log("editing workout " + id)
    return api('workouts/editWorkout/' + id, workout)
}

// export default workouts;

// export function removeFromCart(index: number){
//     allWorkouts.value.splice(index, 1); // remove 1 item at index
// }
