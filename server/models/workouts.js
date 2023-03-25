const data = require("../data/workouts.json");

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

function deleteWorkout(title) 
{
    while(data === undefined) {
        console.log("waiting for data")
    }
    const deletedWorkout = data[title];
    delete data[title];
    return deletedWorkout;
}




module.exports = {
    getWorkouts,
    searchWorkouts,
    addWorkout,
    deleteWorkout   
}