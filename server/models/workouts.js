const data = require("../data/workouts.json");
const allWorkoutsData = require("../data/allWorkouts.json");
function getWorkouts() {
    return data;
}




function searchWorkouts(term) {
    // Wait for data to not be undefined
    while(data === undefined) {
        console.log("waiting for data")
    }

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
    while(data === undefined) {
        console.log("waiting for data")
    }

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


function addWorkout(title, body)
{
    while(data === undefined) {
        console.log("waiting for data")
    }
    // console.log(title)
    // console.log(body)
    data[title] = body;
    return data[title]
}

function deleteWorkout(i) 
{
    while(data === undefined) {
        console.log("waiting for data")
    }
    const deletedWorkout = allWorkoutsData[i];
    allWorkoutsData.splice(i, 1);
    return deletedWorkout;
}







module.exports = {
    getWorkouts,
    searchWorkouts,
    addWorkout,
    deleteWorkout,
    getUserWorkouts,
}