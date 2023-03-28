import allWorkouts from '../data/allWorkouts.json';
import { ref } from 'vue';
import { api } from './session';


export interface Workout {
    username: string;
    workoutType: string;
    description: string;
    intensity: string;
}

export function getWorkouts(): Workout[] {
    return allWorkouts;
}

export function getUserWorkouts(user: string) : Promise<Workout[]> {
    // return allWorkouts.filter(workout => workout.username === user);
    return api('workouts/getUserWorkouts/' + user)
}

const workouts = ref(getWorkouts())

export function addToWorkout(workout: Workout){
    workouts.value.push(workout);
}

export function removeWorkout(index: number) : Promise<Workout[]>{
    // workouts.value.splice(index, 1);
    console.log("removed workout " + index)
    return api('workouts/removeWorkout/' + index)
    // console.log("Workout removed " + workouts.value )
}

export default workouts;

// export function removeFromCart(index: number){
//     allWorkouts.value.splice(index, 1); // remove 1 item at index
// }
