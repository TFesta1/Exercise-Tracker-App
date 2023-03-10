import allWorkouts from '../data/allWorkouts.json';
import { ref } from 'vue';

export interface Workout {
    username: string;
    workoutType: string;
    description: string;
    intensity: string;
}

export function getWorkouts(): Workout[] {
    return allWorkouts;
}

const workouts = ref(getWorkouts())

export function addToWorkout(workout: Workout){
    workouts.value.push(workout);
}

export function removeWorkout(index: number){
    workouts.value.splice(index, 1);
}

export default workouts;

// export function removeFromCart(index: number){
//     allWorkouts.value.splice(index, 1); // remove 1 item at index
// }
