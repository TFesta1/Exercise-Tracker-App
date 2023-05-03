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

// Our collection for DB names
const COL_ALLWORKOUTS = 'allWorkouts';
const COL_FRIENDSACTIVITIES = 'friendsActivities';
const COL_WORKOUTS = 'workouts';
const COL_PRDATA = 'prData';


// Read the file
const allWorkoutsJSON = fs.readFileSync(path.join(__dirname, "../data/allWorkouts.json"), "utf-8");
const allWorkoutsDataScraped = JSON.parse(allWorkoutsJSON);

const friendsWorkoutsJSON = fs.readFileSync(path.join(__dirname, "../data/friendsActivities.json"), "utf-8");
const friendsWorkoutsDataScraped = JSON.parse(friendsWorkoutsJSON);

const workouts = fs.readFileSync(path.join(__dirname, "../data/workouts.json"), "utf-8");
const workoutsDataScraped = JSON.parse(workouts);

const prData = fs.readFileSync(path.join(__dirname, "../data/prData.json"), "utf-8");
const prDataScraped = JSON.parse(prData);
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
    // await insertWorkouts(COL_PRDATA, prDataScraped); // Insert some documents into the collection
    const col = await collection(COL_PRDATA);
    console.log(col);
    const count = await col.countDocuments();
    console.log(`Number of documents in collection: ${count}`);
    const items = await col.find().toArray();
    return items;
}

async function fillAllWorkouts() {
    const col = await collection(COL_ALLWORKOUTS);
    // await col.drop() // Empty the collection
    await insertWorkouts(COL_ALLWORKOUTS, allWorkoutsDataScraped); // Insert some documents into the collection
    const items = await col.find().toArray();
    console.log(allWorkoutsDataScraped)
    return items;
}

async function fillFriendsActivities() {
    await insertWorkouts(COL_FRIENDSACTIVITIES, friendsWorkoutsDataScraped); // Insert some documents into the collection
    const col = await collection(COL_FRIENDSACTIVITIES);
    const items = await col.find().toArray();
    return items;
}

async function fillWorkouts() {
    // await insertWorkouts(COL_WORKOUTS, workoutsDataScraped); // Insert some documents into the collection
    // const items = await col.find().toArray();
    
    const col = await collection(COL_WORKOUTS);
    await col.drop() // Empty the collection
    

    for (const workoutType in workoutsDataScraped) {
        // [workoutType] -> legs, back, or chest
        // dbScraped[workoutType] -> the array of workouts corresponding to workoutType.
        // This is only for the workouts.json file since it's in this format
        const result = await col.insertOne({ [workoutType]: workoutsDataScraped[workoutType] });
        console.log(`${result.insertedCount} document inserted`);
    }
    const items = await col.find().toArray();
    return items;
}
  
  


async function getAll(page=1, pageSize=30) {
    // console.log("in getTableById function in workouts.js in the model in server")
    const col = await collection(COL_WORKOUTS);
    // find() points to all documents
    // skip() skips the first (page-1) * pageSize documents
    // limit() limits the number of documents to pageSize
    // toArray() converts to array
    const items = await col.find().skip((page-1) * pageSize).limit(pageSize).toArray();
    const total = await col.countDocuments(); // Total documents, which is each box seperated with an ID
    return { items, total };
}


async function getAllWithUsername(username, page=1, pageSize=30) {
    // console.log("in getTableById function in workouts.js in the model in server")
    const col = await collection(COL_PRDATA);
    // find() points to all documents
    // skip() skips the first (page-1) * pageSize documents
    // limit() limits the number of documents to pageSize
    // toArray() converts to array
    const items = await col.find().skip((page-1) * pageSize).limit(pageSize).toArray();
    const total = await col.countDocuments(); // Total documents, which is each box seperated with an ID
    let filteredData = [];

    for(const item in items)
    {
        // console.log(item)
        const foundUsername = items[item].username;
        if(foundUsername == username)
        {
            // console.log(items[item])
            filteredData.push(items[item]);
            break
        }
    }
    // This works
    return { filteredData, total };
}



// function search(term) {
//     // Wait for data to not be undefined
//     // while(data === undefined) {
//     //     console.log("waiting for data")
//     // }

//     const filteredData = {};
//     for (const muscle in data) {
//         if (muscle == term) {
//             filteredData[muscle] = data[muscle];
//         }
//         // filteredData[muscle] = data[muscle].filter((exercise) => exercise.sets > 3);
//     }
//     return filteredData;
// }

async function getUser(user, page=1, pageSize=30) {
    const col = await collection(COL_ALLWORKOUTS);
    const items = await col.find().skip((page-1) * pageSize).limit(pageSize).toArray();
    const total = await col.countDocuments(); // Total documents, which is each box seperated with an ID
    let filteredData = [];

    for(const item in items)
    {
        const foundUsername = items[item].username;
        if(foundUsername == user)
        {
            filteredData.push(items[item]);
        }
    }
    // This works
    return { items: filteredData, total };


    // This works for synchronous code, not from mongodb
    // for (const data in allWorkoutsData) {
    //     if(allWorkoutsData[data].username == user)
    //     {
    //         // Append allWorkoutsData[data] to fiilteredWorkouts without putting it as an index, just concatenate
    //         filteredData = filteredData.concat(allWorkoutsData[data])
    //     }
    // }
    // return filteredData;
}


async function editById(body, page=1, pageSize=30) {
    // return []
    // Wait for data to not be undefined
    // while(data === undefined) {
    //     console.log("waiting for data")
    // }

    // console.log(body)

    // for (const workout in data) {
    //     const subList = data[workout];
    //     // console.log(subList);
    //     for (const exercise in subList) {
    //         const subExercise = subList[exercise];
    //         if (subExercise.id == body.id) {
    //             console.log(subExercise)
    //             // This actually still deletes the workout in the data list because it is a reference
    //             subList[exercise] = body;
    //             return subExercise;
    //         }

    //         // console.log(subExercise)
    //     }
    //     // console.log(workout)
    // }
    const col = await collection(COL_WORKOUTS);
    // find() points to all documents
    // skip() skips the first (page-1) * pageSize documents
    // limit() limits the number of documents to pageSize
    // toArray() converts to array
    const items = await col.find().skip((page-1) * pageSize).limit(pageSize).toArray();
    const total = await col.countDocuments(); // Total documents, which is each box seperated with an ID
    let foundId = null;
    let workoutType = null
    let foundItem = null
    for(const item in items)
    {
        if (foundId != null)
        {
            break;
        }
        const itemsList = items[item]
        for(const i in itemsList['legs'])
        {
            foundItem = itemsList['legs'][i]
            if(foundItem.id == body.id)
            {
                foundId = body.id
                workoutType = 'legs'
                break
            }
        }

        for(const i in itemsList['back'])
        {
            foundItem = itemsList['back'][i]
            if(foundItem.id == body.id)
            {
                foundId = body.id
                workoutType = 'back'
                break
            }
        }

        for(const i in itemsList['chest'])
        {
            foundItem = itemsList['chest'][i]
            if(foundItem.id == body.id)
            {
                foundId = body.id
                workoutType = 'chest'
                break
            }
        }
    }

    if(foundId != null && workoutType != null)
    {
        console.log(`Updating workout FROM`);
        console.log(foundItem)
        console.log(`TO`);
        console.log(body)
        // set is for updating a field
        await col.updateMany({ [`${workoutType}.id`]: foundId }, { $set: { [`${workoutType}.$.description`]: body.description, [`${workoutType}.$.intensity`]: body.intensity } });
        return body;
    }
    else
    {
        console.log(`Could not find workout with id to save changes ${passedId}`);
    }
    
    return [];
}


async function add(body)
{
    /*
    let body : Workout = {
        username: string;
        workoutType: string;
        description: string;
        intensity: string;
    }


    */

    const col = await collection(COL_ALLWORKOUTS);
    // const filter = { username, description, intensity };
    col.insertOne(body)



    // console.log("adding workout")
    // allWorkoutsData = allWorkoutsData.concat(body)
    // console.log(allWorkoutsData)
    return body;
}

async function deleteItem(composeParam, page=1, pageSize=30) 
{
    // console.log(composeParam)
    const username = composeParam.username;
    const description = composeParam.description;
    const intensity = composeParam.intensity;
    const col = await collection(COL_ALLWORKOUTS);
    const filter = { username, description, intensity }; // Filter for matching documents
    const workoutToDelete = await col.findOne(filter);

    if (workoutToDelete) {
        await col.deleteOne(filter);
        console.log(workoutToDelete);
        return workoutToDelete;
    }

    return {};


    // const deletedWorkout = allWorkoutsData[i];
    // allWorkoutsData.splice(i, 1);
    // return deletedWorkout;
}

// MAKE ASYNC --> This just gets the TABLE on the friends page
async function getItems(page=1, pageSize=30) 
{
    // while(data === undefined) {
    //     console.log("waiting for data")
    // }

    const col = await collection(COL_FRIENDSACTIVITIES);
    // find() points to all documents
    // skip() skips the first (page-1) * pageSize documents
    // limit() limits the number of documents to pageSize
    // toArray() converts to array
    const items = await col.find().skip((page-1) * pageSize).limit(pageSize).toArray();
    const total = await col.countDocuments(); // Total documents, which is each box seperated with an ID
    return items
}


async function deleteFromTable(passedId, page=1, pageSize=30)
{
    // while(data === undefined) {
    //     console.log("waiting for data")
    // }
    // for (const workout in data) {
    //     const subList = data[workout];
    //     // console.log(subList);
    //     for (const exercise in subList) {
    //         const subExercise = subList[exercise];
    //         if (subExercise.id == i) {
    //             console.log(subExercise)
    //             deletedWorkout = subExercise;
    //             // This actually still deletes the workout in the data list because it is a reference
    //             subList.splice(exercise, 1);
    //             return subExercise;
    //         }

    //         // console.log(subExercise)
    //     }
    //     // console.log(workout)
    // }

    const col = await collection(COL_WORKOUTS);
    // find() points to all documents
    // skip() skips the first (page-1) * pageSize documents
    // limit() limits the number of documents to pageSize
    // toArray() converts to array
    const items = await col.find().skip((page-1) * pageSize).limit(pageSize).toArray();
    const total = await col.countDocuments(); // Total documents, which is each box seperated with an ID
    let foundId = null;
    let workoutType = null
    for(const item in items)
    {
        if (foundId != null)
        {
            break;
        }
        const itemsList = items[item]
        // console.log(itemsList['legs'])
        for(const i in itemsList['legs'])
        {
            const foundItem = itemsList['legs'][i]
            if(foundItem.id == passedId)
            {
                console.log(foundItem)
                // c(foundItem)
                foundId = foundItem.id
                workoutType = 'legs'
                break;
            }
            // return foundItem
        }

        for(const i in itemsList['back'])
        {
            const foundItem = itemsList['back'][i]
            if(foundItem.id == passedId)
            {
                console.log(foundItem)
                foundId = foundItem.id
                workoutType = 'back'
                break;
            }
            // return foundItem             
        }

        for(const i in itemsList['chest'])
        {
            const foundItem = itemsList['chest'][i]
            if(foundItem.id == passedId)
            {
                console.log(foundItem)
                foundId = foundItem.id
                workoutType = 'chest'
                break;
            }
            // return foundItem
        }
        // for(const i in itemsList)
        // {
            // console.log(itemsList[i][0])
            // if(itemsList[i].id == i)
            // {
            //     col.deleteOne(itemsList[i])
            // }
        // }
        // if(item.id == i)
        // {
        //     col.deleteOne(item)
        // }
    }

    if(foundId != null && workoutType != null)
    {
        console.log(`Deleted workout with id ${foundId} from ${workoutType}`);
        // pull is specifically for deleting
        await col.updateMany({}, { $pull: { [workoutType]: { id: foundId } } }); //goes through all of the documents to find an id
    }
    else
    {
        console.log(`Could not find workout with id ${passedId}`);
    }

    // const total = await col.countDocuments(); // Total documents, which is each box seperated with an ID
    return [];
}

async function getById(passedId, page=1, pageSize=30) {
    const col = await collection(COL_WORKOUTS);
    // find() points to all documents
    // skip() skips the first (page-1) * pageSize documents
    // limit() limits the number of documents to pageSize
    // toArray() converts to array
    const items = await col.find().skip((page-1) * pageSize).limit(pageSize).toArray();
    const total = await col.countDocuments(); // Total documents, which is each box seperated with an ID
    let foundId = null;
    let workoutType = null
    for(const item in items)
    {
        if (foundId != null)
        {
            break;
        }
        const itemsList = items[item]
        for(const i in itemsList['legs'])
        {
            const foundItem = itemsList['legs'][i]
            if(foundItem.id == passedId)
            {
                return foundItem
            }
        }

        for(const i in itemsList['back'])
        {
            const foundItem = itemsList['back'][i]
            if(foundItem.id == passedId)
            {
                return foundItem
            }
        }

        for(const i in itemsList['chest'])
        {
            const foundItem = itemsList['chest'][i]
            if(foundItem.id == passedId)
            {
                return foundItem
            }
        }
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

// This is the function that when you hit the plus button on the workout, it adds to workouts list
async function addWithId(body, page=1, pageSize=30) {

    /*
    body = {
        workoutTitle: workoutTitle,
        username: username,
        id: id
    }
    */

    let username = body.username;
    let workoutTitle = body.workoutTitle;
    let description = ""
    let intensity = ""
    const passedID = body.id

    // for (const workout in data) {
    //     const subList = data[workout];
    //     // console.log(subList);
    //     for (const exercise in subList) {
    //         const subExercise = subList[exercise];
    //         if (subExercise.id == body.id) {
    //             console.log(subExercise)
    //             description = subExercise.description;
    //             intensity = subExercise.intensity;
    //         }

    //     }
    // }


    
    // allWorkoutsData = allWorkoutsData.concat(workout)
    // return allWorkoutsData



    const col = await collection(COL_WORKOUTS);
    // find() points to all documents
    // skip() skips the first (page-1) * pageSize documents
    // limit() limits the number of documents to pageSize
    // toArray() converts to array
    const items = await col.find().skip((page-1) * pageSize).limit(pageSize).toArray();
    const total = await col.countDocuments(); // Total documents, which is each box seperated with an ID
    let foundId = null;
    let workoutType = null
    for(const item in items)
    {
        if (foundId != null)
        {
            break;
        }
        const itemsList = items[item]
        for(const i in itemsList['legs'])
        {
            const foundItem = itemsList['legs'][i]
            if(foundItem.id == passedID)
            {
                description = foundItem.description;
                intensity = foundItem.intensity;
                break
            }
        }

        for(const i in itemsList['back'])
        {
            const foundItem = itemsList['back'][i]
            if(foundItem.id == passedID)
            {
                description = foundItem.description;
                intensity = foundItem.intensity;
                break
            }
        }

        for(const i in itemsList['chest'])
        {
            const foundItem = itemsList['chest'][i]
            if(foundItem.id == passedID)
            {
                description = foundItem.description;
                intensity = foundItem.intensity;
                break
            }
        }
    }

    if(description == "" || intensity == "")
    {
        console.log("Could not find description or intensity")
        return;
    }

    let workout = {
        username: username,
        workoutType: workoutTitle,
        description: description,
        intensity: intensity,
    }

    /*
    [
        {
            "username": "humza",
            "workoutType": "Chest",
            "description": "Dips 3x10",
            "intensity": "Hard"
        },
        {
            "username": "plotkin",
            "workoutType": "Chest",
            "description": "Dips 3x10",
            "intensity": "Hard"
        }
    ]
    */
    const colOurWorkouts = await collection(COL_ALLWORKOUTS);
    // Add the workout to the database
    colOurWorkouts.insertOne(workout); // This is the one that adds to the database

    // REMOVE LATER
    allWorkoutsData = allWorkoutsData.concat(workout) //Remove this when you get the workouts from the actual DB
    return allWorkoutsData
}




module.exports = {
    getAll,
    add,
    deleteItem,
    getUser,
    getItems,
    deleteFromTable,
    getById,
    edit,
    addWithId,
    editById,
    getWorkoutsTest,
    fillAllWorkouts,
    fillFriendsActivities,
    fillWorkouts,
    getAllWithUsername
}