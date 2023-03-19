import prData from '../data/prData.json';
import { ref } from 'vue'


/*
{
        "username": "tanner",
        "squatsData": [10, 15, 8, 6, 20, 21, 26, 33, 24, 38, 52, 45],
        "chestData": [5, 10, 20, 40, 100],
        "deadliftData": [5, 1, 20, 10, 30, 40, 50, 55, 50, 70]

    },


*/

export interface prDataNumbers {
    username: string;
    squatsData: number[];
    chestData: number[];
    deadliftData: number[];
}

export function getprData(username: string): prDataNumbers[] {
    return prData.filter(prData => prData.username === username);
}