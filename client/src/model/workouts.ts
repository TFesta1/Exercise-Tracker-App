import allWorkouts from '../data/allWorkouts.json';

export interface Workout {
    username: string;
    workoutType: string;
    description: string;
    intensity: string;
}

export function getWorkouts(): Workout[] {
    return allWorkouts;
}

