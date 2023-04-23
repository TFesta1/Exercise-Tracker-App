const data = require("../data/workouts.json");
const fs = require("fs");
const path = require("path");
let allWorkoutsData = require("../data/allWorkouts.json");
const friendsActivities = require("../data/friendsActivities.json");
const { connect, ObjectId } = require('./mongo');

// const COLLECTION_NAME = 'workoutsInfo';

async function collection(COLLECTION_NAME) {
    const db = await connect();
    // console.log(db.collection(COLLECTION_NAME))
    return db.collection(COLLECTION_NAME);
}

// Read the file
const allWorkoutsJSON = fs.readFileSync(path.join(__dirname, "../data/allWorkouts.json"), "utf-8");
// console.log(allWorkoutsJSON)

// Parse the JSON
const allWorkoutsDataScraped = JSON.parse(allWorkoutsJSON);

// const friendsWorkoutsJSON = fs.readFileSync(path.join(__dirname, "../data/friendsActivities.json"), "utf-8");
// const friendsWorkoutsDataScraped = JSON.parse(friendsWorkoutsJSON);

// const workouts = fs.readFileSync(path.join(__dirname, "../data/workouts.json"), "utf-8");
// const workoutsDataScraped = JSON.parse(workouts);
// console.log(workoutsDataScraped)


// const workouts = [
//     { type: 'running', distance: 5, duration: 30 },
//     { type: 'cycling', distance: 10, duration: 45 },
//     { type: 'swimming', distance: 0.5, duration: 20 }
// ];
  
async function insertWorkouts(colName, dbScraped) {
    const col = await collection(colName);
    const result = await col.insertMany(dbScraped);
    // console.log(`${result.insertedCount} documents inserted`);
    // for (const workoutType in dbScraped) {
    //     for (const workout of dbScraped[workoutType]) {
    //       const result = await col.insertOne(workout);
    //       console.log(`${result.insertedCount} document inserted`);
    //     }
    // }
    // for (const workoutType in dbScraped) {
    //     // [workoutType] -> legs, back, or chest
    //     // dbScraped[workoutType] -> the array of workouts corresponding to workoutType.
    //     // This is only for the workouts.json file since it's in this format
    //     const result = await col.insertOne({ [workoutType]: dbScraped[workoutType] });
    //     console.log(`${result.insertedCount} document inserted`);
    // }
}


async function getWorkoutsTest() {
    // await insertWorkouts("allWorkouts", allWorkoutsDataScraped); // Insert some documents into the collection
    const col = await collection('allWorkouts');
    console.log(col);
    const count = await col.countDocuments();
    console.log(`Number of documents in collection: ${count}`);
    const items = await col.find().toArray();
    return items;
}
  
  


function getAll() {
    while(data === undefined) {
        console.log("waiting for data")
    }
    return data;
}




function search(term) {
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

function getUser(user) {
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


function editById(body) {
    // Wait for data to not be undefined
    while(data === undefined) {
        console.log("waiting for data")
    }

    console.log(body)

    for (const workout in data) {
        const subList = data[workout];
        // console.log(subList);
        for (const exercise in subList) {
            const subExercise = subList[exercise];
            if (subExercise.id == body.id) {
                console.log(subExercise)
                // This actually still deletes the workout in the data list because it is a reference
                subList[exercise] = body;
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


function add(body)
{
    /*
    let body : Workout = {
        username: string;
        workoutType: string;
        description: string;
        intensity: string;
    }


    */



    console.log("adding workout")
    allWorkoutsData = allWorkoutsData.concat(body)
    return allWorkoutsData
}

function deleteItem(i) 
{
    while(allWorkoutsData[i] === undefined) {
        console.log("waiting for data")
    }
    const deletedWorkout = allWorkoutsData[i];
    allWorkoutsData.splice(i, 1);
    return deletedWorkout;
}

function getItems()
{
    // while(data === undefined) {
    //     console.log("waiting for data")
    // }


    return friendsActivities;
}


function deleteFromTable(i)
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


function getById(id) {
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

function edit(id, info) {
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

function addWithId(body) {

    /*
    body = {
        workoutTitle: workoutTitle,
        username: username,
        id: id
    }
    */

    // Wait for data to not be undefined
    while(data === undefined) {
        console.log("waiting for data")
    }

    let username = body.username;
    let workoutTitle = body.workoutTitle;
    let description = ""
    let intensity = ""

    for (const workout in data) {
        const subList = data[workout];
        // console.log(subList);
        for (const exercise in subList) {
            const subExercise = subList[exercise];
            if (subExercise.id == body.id) {
                console.log(subExercise)
                description = subExercise.description;
                intensity = subExercise.intensity;
            }

            // console.log(subExercise)
        }
        // console.log(workout)
    }

    let workout = {
        username: username,
        workoutType: workoutTitle,
        description: description,
        intensity: intensity,
    }
    
    allWorkoutsData = allWorkoutsData.concat(workout)
    return allWorkoutsData

}




module.exports = {
    getAll,
    search,
    add,
    deleteItem,
    getUser,
    getItems,
    deleteFromTable,
    getById,
    edit,
    addWithId,
    editById,
    getWorkoutsTest
}