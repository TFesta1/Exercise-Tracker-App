<script setup lang="ts">
    import { ref, inject, onMounted} from 'vue'
    import type UserStore from '@/stores/user';
    import { getAllWorkouts, type KindsOfWorkouts } from '@/model/workouts';

    const username = ref("")
    const userStore = inject('userStore') as typeof UserStore;
    async function isAdmin() {
        const result = await userStore.getUserName();
        username.value = result;
        if (username.value == "admin")
        {
            return true;
        }
        return false;
    }

    // onMounted(async () => {
    // :class="{ 'no-display': isAdmin }"
    isAdmin();
    // });

    const legs = ref([] as any)
    const chest = ref([] as any)
    const back = ref([] as any)
    getAllWorkouts().then((data) => {
        const workoutsConst : KindsOfWorkouts = data.data;
        legs.value = workoutsConst.legs
        chest.value = workoutsConst.chest
        back.value = workoutsConst.back
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
                            <router-link :to="'/admin/products/edit/' + l.id" class="button" >
                                <div class="icon">
                                    <i class="fas fa-edit"></i>
                                </div>
                            </router-link>
                            <router-link :to="'/admin/products/delete/' + l.id" class="button" >
                                <div class="icon">
                                    <i class="fas fa-trash"></i>
                                </div>
                            </router-link>

                        </div>
                    
                    
                    
                    </td>
                </tr>
                <tr v-for="c in chest">
                    <td>Chest</td>
                    <td>{{ c.description }}</td>
                    <td>{{ c.intensity }}

                        <div class="adminModify">
                            <router-link :to="'/admin/products/edit/' + c.id" class="button" >
                                <div class="icon">
                                    <i class="fas fa-edit"></i>
                                </div>
                            </router-link>
                            <router-link :to="'/admin/products/delete/' + c.id" class="button" >
                                <div class="icon">
                                    <i class="fas fa-trash"></i>
                                </div>
                            </router-link>

                        </div>
                    
                    
                    </td>
                </tr>
                <tr v-for="b in back">
                    <td>Back</td>
                    <td>{{ b.description }}</td>
                    <td>{{ b.intensity }}
                        <div class="adminModify">
                            <router-link :to="'/admin/products/edit/' + b.id" class="button" >
                                <div class="icon">
                                    <i class="fas fa-edit"></i>
                                </div>
                            </router-link>
                            <router-link :to="'/admin/products/delete/' + b.id" class="button" >
                                <div class="icon">
                                    <i class="fas fa-trash"></i>
                                </div>
                            </router-link>

                        </div>
                        
                    
                    </td>
                </tr>

            </tbody>
        </table>

    </div>
    
</template>

<style scoped>
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
        margin-bottom: 800px;
        /* bottom: 100px; */
        top: -150px;
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