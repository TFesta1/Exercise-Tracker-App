<script setup lang="ts">
    import { ref, inject, onMounted, watchEffect } from 'vue'
    import type UserStore from '@/stores/user';
    import listWorkouts from '@/components/listWorkouts.vue';
    

    const username = ref("")
    const props = defineProps({
        personName: {
            type: String,
            required: true,
        },
    });

    watchEffect(() => {
        username.value = props.personName;
    });


    
    console.log(username.value)
    console.log('hi')
</script>

<template>
    <!-- <div class="values">
        <div class="val-box"> -->
    <listWorkouts class="workouts" :username="username" :showTrash="false" />   
        <!-- </div>
    </div> -->
    <!-- <div class="adjust">
    </div> -->
    <!-- <listWorkouts :username="username" :showTrash="false" /> -->
    <!-- <AdminTable /> -->
    

    <!-- <div class="workoutValues" v-for="workout,i in changingWorkouts">
        <h2>{{ workout.workoutType }}</h2>
        <br>

        <p>{{ workout.description.replace(/,/g, ', ') }}</p>
        
        
        <div class="intensity">
            <br>
            Intensity: {{ workout.intensity }}
        </div> 

        
    </div> -->
</template>

<style scoped>
.adjust {
    margin-top: 100px !important;
    margin-left: 400px !important;
    /* right: 500px; */
    /* right: 1000px !important; */
}

.workouts {
  /* margin-top: 100px !important; adjust the margin to the desired value */
}

</style>