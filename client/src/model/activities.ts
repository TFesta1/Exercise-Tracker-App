

/*
{
        "username": "plotkin",
        "name": "Plotkin",
        "email": "plotkinm@newpaltz.edu",
        "isAdmin": false,
        "profilePicture": "https://i.postimg.cc/zBXBjwCW/img1.jpg",
        "intensity": "Normal",
        "workout": "Back",
        "streak": 3     
    },
*/

import { api, postApi } from './session';


export interface Activity {
    username: string,
    name: string;
    email: string;
    isAdmin: boolean;
    profilePicture: string;
    intensity: string;
    workout: string;
    streak: number;
    rest: number;
}


export function getActivities(): Promise<Activity[]> {
    // return activities;
    return api('workouts/getFriendsActivities')
}



