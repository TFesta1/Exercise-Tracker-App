const express = require("express");
const model = require("../models/workouts");
const router = express.Router();


router
    .get("/getWorkoutsTest", (req, res, next) => {
        model.getWorkoutsTest()
            .then(list => {
                const data = { data: list, total: list.length, isSuccess: true };
                res.send(data)
            }).catch(next);
    })
    .get("/", (req, res) => {
        const list = model.getAll();
        const data = { data: list, total: list.length, isSuccess: true  }
        res.send(data);
        // res.send(list);
    })

    .get('/getUserWorkouts/:user', (req, res) => {
        const user = req.params.user;
        // console.log("hi")
        const list = model.getUser(user);
        const data = { data: list, total: list.length, isSuccess: true  }
        res.send(data);
    })

    .get("/removeWorkoutFromTable/:i", (req, res) => {
        const i = req.params.i;
        const delItem = model.deleteFromTable(i);
        const data = { data: delItem, total: delItem.length, isSuccess: true  }
        res.send(data);
    })

    .get('/search/:q', (req, res) => {
        const term = req.params.q;
        // console.log({ term });
        const list = model.search(term);
        const data = { data: list, total: list.length, isSuccess: true  }
        res.send(data);
    })
    // This gets friends activities
    .get("/getFriendsActivities", (req, res) => {
        const list = model.getItems();
        const data = { data: list, total: list.length, isSuccess: true  }
        res.send(data);
    })

    .get("/getWorkoutById/:id", (req, res) => {
        const id = req.params.id;
        const list = model.getById(id);
        const data = { data: list, total: list.length, isSuccess: true  }
        res.send(data);
    })

    .post('/addWorkout', (req, res) => {
        const info = req.body;
        // console.log( req.query.workoutTitle );
        // console.log( req.params );
        // console.log( req.headers );

        const dataAdded = model.add(info);
        const data = { data: dataAdded, total: dataAdded.length, isSuccess: true  }
        res.send(data);
    })

    .post("/editWorkoutById", (req, res) => {
        const info = req.body;
        // console.log(info)
        const dataAdded = model.editById(info);
        const data = { data: dataAdded, total: dataAdded.length, isSuccess: true  }
        res.send(data);
    })

    .post("/addWorkoutWithId", (req, res) => {
        const info = req.body;
        console.log(info)
        const dataAdded = model.addWithId(info);
        const data = { data: dataAdded, total: dataAdded.length, isSuccess: true  }
        res.send(data);
    })



    .post("/editWorkout/:id", (req, res) => {
        const id = req.params.id;
        const info = req.body;
        const dataAdded = model.edit(id, info);
        const data = { data: dataAdded, total: dataAdded.length, isSuccess: true  }
        res.send(data);
    })

    // .patch('/update', (req, res) => {
    //     const product = req.body;
    //     model.updateProduct(product);
    //     const data = { data: product, total: product.length, isSuccess: true  }
    //     res.send(data);
    // })

    .get('/removeWorkout/:i', (req, res) => {
        const i = req.params.i;
        const delItem = model.deleteItem(i);
        const data = { data: delItem, total: delItem.length, isSuccess: true  }
        res.send(data);
        
    })


//     .patch("/:id", (req, res) => { 
//         const product = req.body;
//         model.updateProduct(product);
//         res.send(product);
//     })
//     .delete("/:id", (req, res) => { 
//         const id = +req.params.id;
//         model.deleteProduct(id);
//         res.send('' + id);
//     })


module.exports = router


/*
Ways to pass info to the server are
1. Query String
2. Route Parameters
3. Request Body
4. Request Headers
5. Cookies
*/