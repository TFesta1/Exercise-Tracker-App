<script setup lang="ts">
    import { ref } from 'vue'
    import { getAllWorkouts, type Workout } from '@/model/workouts';

    const workouts = ref()
    const allWorkouts = ref({} as Workout[])
    
    getAllWorkouts().then((data) => {
        workouts.value = data.data;
        console.log(workouts.value)

        // for(let i = 0; i < workouts.value.length; i++)
        // {
        //     const workout : Workout[] = workouts.value[i]
        //     for(let j = 0; j < workout.length; j++)
        //     {
        //         const workout2 : Workout = workout[j]
        //         allWorkouts.value.push(workout2)
        //         console.log(workout2)
        //     }

        //     // console.log(workout)
        // }
        // console.log(allWorkouts.value)


    });


    // Chest, Squat, Deadlift
</script>

<template>
    <div class="board">
        <table width="100%" class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth tableCenter">
            <thead>
                <tr>
                    <th scope="col">Workout</th>
                    <th scope="col">Description</th>
                    <th scope="col">Intensity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="workout in allWorkouts">
                    <td>hi</td>
                    <td>{{ workout.description }}</td>
                    <td>{{ workout.intensity }}</td>

                    <!-- <tr v-for="w in workout">
                        <td>{{ w.description }}</td>
                        <td>{{ w.intensity }}</td> -->
                </tr>
                    <!-- <td>{{ workout.name }}</td> -->
                    
                    <!-- <td> 
                        <img :src="product.thumbnail" alt="" class="admin-product-img">
                    </td>
                    <td>{{ product.title }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.category }} / {{  product.brand }}</td>
                    <td>{{ product.stock }}</td>
                    <td>

                            <router-link :to="'/admin/products/edit/' + product.id" class="button" >
                                <div class="icon">
                                    <i class="fas fa-edit"></i>
                                </div>
                            </router-link>
                            <router-link :to="'/admin/products/delete/' + product.id" class="button" >
                                <div class="icon">
                                    <i class="fas fa-trash"></i>
                                </div>
                            </router-link>
                    </td> -->
                <!-- </tr> -->
            </tbody>
        </table>

    </div>
    
</template>

<style scoped>


</style>