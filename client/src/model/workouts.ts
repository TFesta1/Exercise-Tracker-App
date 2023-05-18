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
    sq: string;
    back: string;
    chest: string;
}

export interface prDataWorkouts {
    squatsData: number[];
    deadliftData: number[];
    chestData: number[];
}

export interface KindsOfWorkoutsMongo {
    [key: string]: {
        legs: {
            // This is just a raw array of workouts
        }[];
        back: {
    
        }[];
        chest: {
            
        }[];
    };
}



export interface EditWorkout {
    description: string;
    intensity: string;
}

export interface WorkoutWithId {
    description: string;
    intensity: string;
    id: number
}




export function getAllWorkouts() : Promise<DataEnvelope<KindsOfWorkoutsMongo>>{
    // return allWorkouts;
    console.log("getting all workouts")
    return api('workouts')
}

export function getUserWorkouts(user: string) : Promise<DataListEnvelope<Workout>> {
    // return allWorkouts.filter(workout => workout.username === user);
    return api('workouts/getUserWorkouts/' + user)
}

export function getUsers() : Promise<DataListEnvelope<String>> {
    // return allWorkouts.filter(workout => workout.username === user);
    return api('workouts/getAllUsers/')
}

export function getPrData(user: string) : Promise<DataEnvelope<prDataWorkouts>>{
    console.log("getting pr data")
    return api('workouts/getWorkoutsPrData/' + user)
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

export function removeWorkout(user: string, desc: string, intensity: string) : Promise<DataListEnvelope<Workout[]>>{
    // workouts.value.splice(index, 1);
    console.log("removing workout " + user + " " + desc + " " + intensity)
    const composeParameter = {
        username: user,
        description: desc,
        intensity: intensity
    }
    return api('workouts/removeWorkout', composeParameter)
    // console.log("Workout removed " + workouts.value )
}

export function removeWorkoutFromTable(index: number) : Promise<DataEnvelope<KindsOfWorkouts>>{
    // workouts.value.splice(index, 1);
    console.log("removing workout on table " + index)
    return api('workouts/removeWorkoutFromTable/' + index)
    // console.log("Workout removed " + workouts.value )
}

export function editWorkoutWithId(workout: WorkoutWithId) : Promise<DataEnvelope<WorkoutWithId>>{
    console.log("editing workout " + workout)
    return api('workouts/editWorkoutById', workout)
}

export function addWorkoutToWorkouts(workoutTitle: string, username: string, id: number) : Promise<DataEnvelope<KindsOfWorkouts>>{
    console.log("adding workout to table " + id)

    const composeParameter = {
        workoutTitle: workoutTitle,
        username: username,
        id: id
    }

    // console.log(composeParameter)


    return api('workouts/addWorkoutWithId', composeParameter)
}

// export default workouts;

// export function removeFromCart(index: number){
//     allWorkouts.value.splice(index, 1); // remove 1 item at index
// }
