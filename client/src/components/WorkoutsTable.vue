<script setup lang="ts">
    import { ref, inject, onMounted} from 'vue'
    import type UserStore from '@/stores/user';
    import { getAllWorkouts, removeWorkoutFromTable, addWorkoutToWorkouts, type KindsOfWorkouts } from '@/model/workouts';

    const username = ref("")
    const userStore = inject('userStore') as typeof UserStore;
    const isAdmin = ref(false)

    async function logUserName() {
        const result = await userStore.getUserName();
        username.value = result
        
        console.log(username.value)
        if (username.value == "admin") {
            isAdmin.value = true
        }
        else {
            console.log(`NOT Admin ${username.value} | admin  --> NOT admin`)
        }
    }
    logUserName();

    // onMounted(async () => {
    // :class="{ 'no-display': isAdmin }"
    // });

    const legs = ref([] as any)
    const chest = ref([] as any)
    const back = ref([] as any)
    async function callGetWorkouts()
    {
        getAllWorkouts().then((data) => {
            const workoutsConst : KindsOfWorkouts = data.data;
            legs.value = workoutsConst.legs
            chest.value = workoutsConst.chest
            back.value = workoutsConst.back
        });
        
    }

    async function asyncAdd(workoutTitle: string, username: string, id: number)
    {
        await addWorkoutToWorkouts(workoutTitle, username, id);
        // await callGetWorkouts()
    }

    
    

    async function asyncRemove(i: number){
        await removeWorkoutFromTable(i);
        await callGetWorkouts()
    }

    onMounted(async () => {
        callGetWorkouts();
    });
    // Chest, Squat, Deadlift
</script>

<template>
    <div class="board">
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth tableCenter">
            <thead>
                <tr>
                    <th scope="col">Workout</th>
                    <th scope="col">Description</th>
                    <th scope="col">Intensity</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="l in legs">
                    <td>Legs</td>
                    <td>{{ l.description }}</td>
                    <td>{{ l.intensity }}

                        <div class="adminModify">

                            <button class="icon plusButton" @click="asyncAdd('Legs', username, l.id)">
                                <i class="fas fa-plus"></i>
                            </button>
                            
                            <router-link :to="'/workouts/edit/' + l.id" class="button" >
                                <div class="icon">
                                    <i class="fas fa-edit"></i>
                                </div>
                            </router-link>
                            <!-- @click="asyncRemove(i)" @change="userWorkouts()" -->
                            <button class="icon trash-button" @click="asyncRemove(l.id)">
                                <i class="fas fa-trash"></i>
                            </button>

                        </div>
                    
                    
                    
                    </td>
                </tr>
                <tr v-for="c in chest">
                    <td>Chest</td>
                    <td>{{ c.description }}</td>
                    <td>{{ c.intensity }}

                        <div class="adminModify">

                            <button class="icon plusButton" @click="asyncAdd('Chest', username, c.id)">
                                <i class="fas fa-plus"></i>
                            </button>

                            <router-link :to="'/workouts/edit/' + c.id" class="button">
                                <div class="icon">
                                    <i class="fas fa-edit"></i>
                                </div>
                            </router-link>
                            <!-- <router-link :to="'/admin/products/delete/' + c.id" class="button" >
                                <div class="icon">
                                    <i class="fas fa-trash"></i>
                                </div>
                            </router-link> -->
                            <button class="icon trash-button" @click="asyncRemove(c.id)">
                                <i class="fas fa-trash"></i>
                            </button>

                            

                        </div>
                    
                    
                    </td>
                </tr>
                <tr v-for="b in back">
                    <td>Back</td>
                    <td>{{ b.description }}</td>
                    <td>{{ b.intensity }}
                        <div class="adminModify">

                            <button class="icon plusButton" @click="asyncAdd('Back', username, b.id)">
                                <i class="fas fa-plus"></i>
                            </button>
                            <router-link :to="'/workouts/edit/' + b.id" class="button" >
                                <div class="icon">
                                    <i class="fas fa-edit"></i>
                                </div>
                            </router-link>
                            <!-- <router-link :to="'/admin/products/delete/' + b.id" class="button" >
                                <div class="icon">
                                    <i class="fas fa-trash"></i>
                                </div>
                            </router-link> -->
                            <button class="icon trash-button" @click="asyncRemove(b.id)">
                                <i class="fas fa-trash"></i>
                            </button>

                        </div>
                        
                    
                    </td>
                </tr>

            </tbody>
        </table>

    </div>
    
</template>

<style scoped>

    .plusButton {
        position: relative;
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: green;
        color: black;
        border: none;
        outline: none;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }

    .plusButton:active {
        transform: scale(0.2);
    }

    

    .trash-button {
        background-color: transparent;
        color: blue;
        border: none;
        outline: none;  
    }

    .trash-button:hover {
        /* color: red; */
        cursor: pointer;
    }

    .no-display {
        display: none !important;
    }
    .adminModify {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        outline: none;
    }

    .board {
        position: absolute;
        top: 10%;
        left: 10%;
        transform: translate(-20%, 30%);
    }

    table {
        width: 100%;
        border-collapse: collapse;
        /* top: -100px; */
    }
    th, td {
        text-align: center;
        /* padding: 3px; */
        font-family: Arial, sans-serif;
        font-size: 16px;
    }
    th {
        background-color: #7c6e6e;
        color: black;
    }
    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
</style>