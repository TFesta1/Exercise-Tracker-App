const express = require("express");
const model = require("../models/workouts");
const router = express.Router();


router
    .get("/", (req, res) => {
        const list = model.getWorkouts();
        const data = { data: list, total: list.length, isSuccess: true  }
        res.send(data);
        // res.send(list);
    })

    .get('/getUserWorkouts/:user', (req, res) => {
        const user = req.params.user;
        // console.log("hi")
        const list = model.getUserWorkouts(user);
        const data = { data: list, total: list.length, isSuccess: true  }
        res.send(data);
    })

    .get("/removeWorkoutFromTable/:i", (req, res) => {
        const i = req.params.i;
        const delItem = model.deleteWorkoutFromTable(i);
        const data = { data: delItem, total: delItem.length, isSuccess: true  }
        res.send(data);
    })

    .get('/search/:q', (req, res) => {
        const term = req.params.q;
        // console.log({ term });
        const list = model.searchWorkouts(term);
        const data = { data: list, total: list.length, isSuccess: true  }
        res.send(data);
    })

    .get("/getFriendsActivities", (req, res) => {
        const list = model.getFriendsActivities();
        const data = { data: list, total: list.length, isSuccess: true  }
        res.send(data);
    })

    .get("/getWorkoutById/:id", (req, res) => {
        const id = req.params.id;
        const list = model.getWorkoutById(id);
        const data = { data: list, total: list.length, isSuccess: true  }
        res.send(data);
    })

    .post('/addWorkout', (req, res) => {
        const info = req.body;
        // console.log( req.query.workoutTitle );
        // console.log( req.params );
        // console.log( req.headers );

        const dataAdded = model.addWorkout(info);
        const data = { data: dataAdded, total: dataAdded.length, isSuccess: true  }
        res.send(data);
    })

    .post("/addWorkoutWithId", (req, res) => {
        const info = req.body;
        console.log(info)
        const dataAdded = model.addWorkoutWithId(info);
        const data = { data: dataAdded, total: dataAdded.length, isSuccess: true  }
        res.send(data);
    })



    .post("/editWorkout/:id", (req, res) => {
        const id = req.params.id;
        const info = req.body;
        const dataAdded = model.editWorkout(id, info);
        const data = { data: dataAdded, total: dataAdded.length, isSuccess: true  }
        res.send(data);
    })

    .patch('/update', (req, res) => {
        const product = req.body;
        model.updateProduct(product);
        const data = { data: product, total: product.length, isSuccess: true  }
        res.send(data);
    })

    .get('/removeWorkout/:i', (req, res) => {
        const i = req.params.i;
        const delItem = model.deleteWorkout(i);
        const data = { data: delItem, total: delItem.length, isSuccess: true  }
        res.send(data);
        
    })


//     // List specifics to general
//     .get("/search/:q", (req, res) => {
//         const term = req.params.q;
//         const list = model.searchProducts(term);
//         res.send(list);
//     })

//     .get("/:id", (req, res) => { 
//         const id = +req.params.id; //+ converts to number, - flips sign
//         const product = model.getProductById(id);
//         res.send(product);
//     })
    
//     .post("/", (req, res) => { 
//         const product = req.body;

//         console.log({product})
//         console.log(req.query)
//         console.log(req.params)
//         console.log(req.headers)


//         model.addProduct(product);
//         res.send(product);
//     })
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