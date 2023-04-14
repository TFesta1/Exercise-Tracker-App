<script setup lang="ts">
    import { ref, inject, onMounted } from 'vue'
    import { getActivities, type Activity } from '@/model/activities';
    import type UserStore from '@/stores/user';

    const username = ref("")
    const userStore = inject('userStore') as typeof UserStore;

    async function logUserName() {
        const result = await userStore.getUserName();
        username.value = result
    }

    const activities = ref({} as Activity[]);
    getActivities().then((data) => {
        activities.value = data.data;
    });

    onMounted(async () => {
        logUserName();
    });
</script>

<template>
    <!-- Creating the table -->
    <div class="board">
        <table width="100%">
            <thead>
                <!-- Add a row -->
                <tr> 
                    <!-- Add a column -->
                    <td>Name</td>
                    <td>Intensity</td>
                    <td>Workout</td>
                    <td>Streak</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="activity in activities">
                    <td class="people" v-if="activity.username != username">
                        <!-- Their pfp image -->
                        <!-- <img src="../assets/profile-pictures/1.png" alt="pfp">
                         -->
                        <img :src="activity.profilePicture" border='0' :alt='activity.name'/>
                        
                        <!-- <img src = "{{  }}" alt="pfp"> -->
                        <div class="people-de">
                            <!-- Their name -->
                            <router-link :to="'/viewFriend/' + activity.username" >
                                <h5>{{ activity.name }}</h5>
                            </router-link>
                            <!-- Their email -->
                        </div>
                    </td>

                    <td class="people-des" v-if="activity.username != username">
                        <!-- Their intensity -->
                        <h5>{{ activity.intensity }}</h5>
                        <!-- <p>Go at a normal pace</p> -->
                    </td>

                    <td class="active" v-if="activity.username != username"><p>{{ activity.workout }}</p></td>
                    <td class="role" v-if="activity.username != username">
                        <p>{{activity.streak}}</p>
                    </td>

                    
                </tr>
                
                <!-- <tr>
                    <td class="people">
                        <img src="../assets/profile-pictures/3.png" alt="pfp">
                        <div class="people-de">
                            <h5>John Doe</h5>
                        </div>
                    </td>

                    <td class="people-des">
                        <h5>Normal</h5>
                        <p>Go at a normal pace</p>
                    </td>

                    <td class="active"><p>Active</p></td>
                    <td class="role">
                        <p>Owner</p>
                    </td>

                    
                </tr> -->
                
                
            </tbody>
        </table>
    </div>
</template>

<style>
    /* @import "assets/exercise.css"; */

</style>