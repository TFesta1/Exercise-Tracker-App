const data = require("../data/workouts.json");
let allWorkoutsData = require("../data/allWorkouts.json");
const friendsActivities = require("../data/friendsActivities.json");


function getWorkouts() {
    while(data === undefined) {
        console.log("waiting for data")
    }
    return data;
}




function searchWorkouts(term) {
    // Wait for data to not be undefined
    // while(data === undefined) {
    //     console.log("waiting for data")
    // }

    const filteredData = {};
    for (const muscle in data) {
        if (muscle == term) {
            filteredData[muscle] = data[muscle];
        }
        // filteredData[muscle] = data[muscle].filter((exercise) => exercise.sets > 3);
    }
    return filteredData;
}

function getUserWorkouts(user) {
    // Wait for data to not be undefined
    // while(data === undefined) {
    //     console.log("waiting for data")
    // }
    // throw new Error('Something went wrong');

    let filteredData = [];

    for (const data in allWorkoutsData) {
        if(allWorkoutsData[data].username == user)
        {
            // Append allWorkoutsData[data] to fiilteredWorkouts without putting it as an index, just concatenate
            filteredData = filteredData.concat(allWorkoutsData[data])
        }
    }
    return filteredData;
}


function addWorkout(body)
{
    // while(data === undefined) {
    //     console.log("waiting for data")
    // }
    console.log("adding workout")
    allWorkoutsData = allWorkoutsData.concat(body)
    return allWorkoutsData
}

function deleteWorkout(i) 
{
    while(allWorkoutsData[i] === undefined) {
        console.log("waiting for data")
    }
    const deletedWorkout = allWorkoutsData[i];
    allWorkoutsData.splice(i, 1);
    return deletedWorkout;
}

function getFriendsActivities()
{
    // while(data === undefined) {
    //     console.log("waiting for data")
    // }


    return friendsActivities;
}


function deleteWorkoutFromTable(i)
{
    while(data === undefined) {
        console.log("waiting for data")
    }
    for (const workout in data) {
        const subList = data[workout];
        // console.log(subList);
        for (const exercise in subList) {
            const subExercise = subList[exercise];
            if (subExercise.id == i) {
                console.log(subExercise)
                deletedWorkout = subExercise;
                // This actually still deletes the workout in the data list because it is a reference
                subList.splice(exercise, 1);
                return subExercise;
            }

            // console.log(subExercise)
        }
        // console.log(workout)
    }
    // const deletedWorkout = allWorkoutsData[i];
    // allWorkoutsData.splice(i, 1);
    // return deletedWorkout;
    return [];
}


function getWorkoutById(id) {
    // Wait for data to not be undefined
    while(data === undefined) {
        console.log("waiting for data")
    }

    for (const workout in data) {
        const subList = data[workout];
        // console.log(subList);
        for (const exercise in subList) {
            const subExercise = subList[exercise];
            if (subExercise.id == id) {
                console.log(subExercise)
                return subExercise;
            }

            // console.log(subExercise)
        }
        // console.log(workout)
    }
    return [];
}

function editWorkout(id, info) {
    // Wait for data to not be undefined
    while(data === undefined) {
        console.log("waiting for data")
    }

    for (const workout in data) {
        const subList = data[workout];
        // console.log(subList);
        for (const exercise in subList) {
            const subExercise = subList[exercise];
            if (subExercise.id == id) {
                console.log(subExercise)
                subExercise.name = info.name;
                subExercise.sets = info.sets;
                subExercise.reps = info.reps;
                subExercise.weight = info.weight;
                subExercise.date = info.date;
                subExercise.username = info.username;
                return subExercise;
            }

            // console.log(subExercise)
        }
        // console.log(workout)
    }
    return [];

}




module.exports = {
    getWorkouts,
    searchWorkouts,
    addWorkout,
    deleteWorkout,
    getUserWorkouts,
    getFriendsActivities,
    deleteWorkoutFromTable,
    getWorkoutById
}