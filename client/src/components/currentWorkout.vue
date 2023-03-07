<script setup lang="ts">

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
        <div class="modal-container" style="display:none">
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
                <button class="close-modal">Close</button>
            </div>
            <div class="modal-background"></div>
        </div>
        <h3 class="i-name">
            <button class="add-workout">
                <i></i>
                Add Workout
            </button>
        </h3>
        
        
    </div>
    <div class="values">
        Workout:
    </div>
    
    
</template>

<style>

</style>