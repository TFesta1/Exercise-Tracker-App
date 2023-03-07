

/*
{
        "name": "Tanner",
        "profilePicture": "",
        "intensity": "Normal",
        "workout": "Legs",
        "streak": 0  
    },
*/

import activities from '../data/friendsActivities.json';


export interface Activitiy {
    username: string,
    name: string;
    profilePicture: string;
    intensity: string;
    workout: string;
    streak: number;
}


export function getActivities(): Activitiy[] {
    return activities;
}

// export interface Product {
//     id: number;
//     title: string;
//     description: string;
//     price: number;
//     discountPercentage: number;
//     rating: number;
//     stock: number;
//     brand: string;
//     category: string;
//     thumbnail: string;
//     images: string[];
// }

// export function getProducts(): Product[] {
//     return data.products;
// }

