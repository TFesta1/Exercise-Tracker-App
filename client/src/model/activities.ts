

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

import activities from '../data/friendsActivities.json';


export interface Activitiy {
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


export function getActivities(): Activitiy[] {
    return activities;
}



