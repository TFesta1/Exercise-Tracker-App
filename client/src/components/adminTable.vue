<script setup lang="ts">
    import { getActivities } from '@/model/activities';


    const activities = getActivities();
    

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
                    <td>Email</td>
                    <td>Is Admin</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="activity in activities">
                    <td class="people">
                        <!-- Their pfp image -->
                        <!-- <img src="../assets/profile-pictures/1.png" alt="pfp">
                         -->
                        <img :src="activity.profilePicture" border='0' :alt='activity.name'/>
                        
                        <!-- <img src = "{{  }}" alt="pfp"> -->
                        <div class="people-de">
                            <!-- Their name -->
                            <h5>{{ activity.name }}</h5>
                            <!-- Their email -->
                        </div>
                    </td>

                    <td class="people-des">
                        <!-- Their intensity -->
                        <h5>{{ activity.email }}</h5>
                        <!-- <p>Go at a normal pace</p> -->
                    </td>

                    <td class="role">
                        <p :class="activity.isAdmin == true ? 'boolean-true' : 'boolean-false'">{{activity.isAdmin}}</p>
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

<style scoped>
    /* @import "assets/exercise.css"; */

.boolean-true {
  color: green !important;
}

.boolean-false {
  color: red !important;;
}

</style>