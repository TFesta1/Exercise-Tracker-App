

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

// import { postAPI } from './session';

import { api } from './session';
import type { DataListEnvelope } from './myFetch';



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

export function getActivities(): Promise<DataListEnvelope<Activity>>
{
    // return activities;
    return api('workouts/getFriendsActivities')
}



