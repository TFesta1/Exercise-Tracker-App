<script setup lang="ts">
    import { ref } from 'vue'
    import { getWorkouts } from '@/model/workouts';

    const clickedAddWorkout = ref(false)
    // Switch the value whenever we either click AddWorkout, or "Close" so that we can open the modal and hide the add-workout button accordingly
    function addWorkout() {
        clickedAddWorkout.value = !clickedAddWorkout.value;
    }

    const workouts = getWorkouts();



</script>

<template>
    <div class="values">
        <div class="val-box">
            <i class="fas fa-users"></i>
            <div>
                <h3>Legs</h3>
                <span>Workout Today</span>
            </div>
        </div>
        <div class="val-box">
            <i class="fas fa-level-up"></i>
            <div>
                <h3>Normal</h3>
                <span>Intensity</span>
            </div>
        </div>
        <div class="val-box">
            <i class="fas fa-globe"></i>
            <div>
                <h3>In X Days</h3>
                <span>Rest Day</span>
            </div>
        </div>
        <div class="val-box">
            <i class="fas fa-thermometer-three-quarters"></i>
            <div>
                <h3>For X Days</h3>
                <span>Streak</span>
            </div>
        </div>
        <!-- display:flex to show it, use Vue3 to show/hide it -->
        <div class="modal-container" :style="{ display: clickedAddWorkout ? 'flex' : 'none' }">
            <div class="modal">
                <h2>Add Workout</h2>
                <form>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <label>
                    Description:
                    <textarea name="description"></textarea>
                </label>
                <label>
                    Date:
                    <input type="date" name="date" />
                </label>
                <button type="submit">Submit</button>
                </form>
                <button class="close-modal" @click="addWorkout">Close</button>
            </div>
            <div class="modal-background"></div>
        </div>
        <h3 class="i-name">
            <button class="add-workout" @click="addWorkout" :style="{ display: clickedAddWorkout ? 'none' : 'flex' }">
                <i></i>
                Add Workout
            </button>
        </h3>
        
        
    </div>
    <div class="workoutValues" v-for="workout in workouts">
        <p>{{ workout.description.replace(/,/g, ', ') }}</p>
        <p>{{ workout.workoutType }}</p>
        <p>{{ workout.intensity }}</p>
    </div>
    
    
</template>

<style>

</style>