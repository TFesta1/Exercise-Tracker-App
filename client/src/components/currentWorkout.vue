<script setup lang="ts">
    import { ref, reactive, inject, computed, onMounted } from 'vue'
    import { getWorkouts, removeWorkout, addToWorkout, getUserWorkouts } from '@/model/workouts';
    import type UserStore from '@/stores/user';
    import { getActivities } from '@/model/activities';


    const activities = getActivities();
    const streak = ref(0);
    const rest = ref(0);
    


    const clickedAddWorkout = ref(false)
    // Switch the value whenever we either click AddWorkout, or "Close" so that we can open the modal and hide the add-workout button accordingly
    function addWorkout() {
        clickedAddWorkout.value = !clickedAddWorkout.value;
    }
    // const workouts = getWorkouts();
    
    const state = reactive({
        newWorkout: {
            username: '',
            workoutType: '',
            description: '',
            intensity: ''
        }
    });

    const changingWorkouts = ref();

    const router = inject('router') as any;
    const userStore = inject('userStore') as typeof UserStore;
    const username = ref("")
    async function getUsername() {
        const result = await userStore.getUserName();
        username.value = result;
        // changingWorkouts.value = getUserWorkouts(result);
        getUserWorkouts(result).then((data) => {
            changingWorkouts.value = data;
        });
        activities.forEach((activity) => {
            if (activity.username == result)
            {
                streak.value = activity.streak;
                rest.value = activity.rest;
            }
        });
    }

    // onMounted()
    
    // getUsername()
    

    async function userWorkouts() {
        const user = await userStore.getUserName();
        // changingWorkouts.value = getUserWorkouts(user);
        getUserWorkouts(user).then((data) => {
            changingWorkouts.value = data;
        });

        removeWorkout

        return changingWorkouts;
    };

    onMounted(async () => {
        await getUsername()
    });

    const form = reactive({
        name: '',
        description: '',
        intensity: ''
    })

    async function onSubmit() 
    {
        console.log(form.name)
        console.log(form.description)
        console.log(form.intensity)
        if(form.name == '' || form.description == '' || form.intensity == '') {
            alert('Please fill out all fields')
            return
        }
        const workout = {
            username: await userStore.getUserName(),
            workoutType: form.name,
            description: form.description,
            intensity: form.intensity
        }

        addToWorkout(workout)
        userWorkouts()
    }

    async function asyncRemove(i: number){
        // Remove a workout and update the list of users
        await removeWorkout(i).then((data) => {
            changingWorkouts.value = data;
        });
        userWorkouts()
    }
    getUsername()
    

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
                <h3>In {{ rest }} Days</h3>
                <span>Rest Day</span>
            </div>
        </div>
        <div class="val-box">
            <i class="fas fa-thermometer-three-quarters"></i>
            <div>
                <h3>For {{ streak }} Days</h3>
                <span>Streak</span>
            </div>
        </div>
        <!-- display:flex to show it, use Vue3 to show/hide it -->
        <div class="modal-container" :style="{ display: clickedAddWorkout ? 'flex' : 'none' }">
            <div class="modal">
                <h2>Add Workout</h2>
                <form @submit.prevent="onSubmit">
                    <label>
                        Name:
                        <input v-model="form.name" type="text" name="name" autocomplete="off" />
                    </label>
                    <label>
                        Description:
                        <textarea v-model="form.description" name="description" class="description-box"></textarea>
                    </label>
                    <label>
                        Intensity:
                        <select class="intensity-dropdown" v-model="form.intensity">
                            <option>High</option>
                            <option>Normal</option>
                            <option>Easy</option>
                        </select>
                    </label>
                    <button type="submit" class="submit-modal" @click="addWorkout">Submit</button>
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
    
    <div class="workoutValues" v-for="workout,i in changingWorkouts">
        <h2>{{ workout.workoutType }}</h2>
        <br>

        <p>{{ workout.description.replace(/,/g, ', ') }}</p>
        
        
        <div class="intensity">
            <br>
            Intensity: {{ workout.intensity }}
        </div> 

        <button class="trash-button" @click="asyncRemove(i)">
            <span class="icon">
                <i class="fas fa-trash"></i>
            </span>
        </button>
    </div>
    
    
</template>

<style scoped>
.intensity-dropdown
{
    width: 100%;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 10px;
}

.description-box 
{
    width: 100%;
    height: 90px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 3px;
}

.trash-button {
    background-color: #f44336;
    border: none;
    color: white;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
    position: relative;
    width: 150px;
    position: relative;
    right: -2%;
    top: 10px;


}

.close-modal {
    background-color: #f44336;
    border: none;
    color: white;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
    position: relative;
    top: -20px;
    left: 220px;
}

.submit-modal {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
    position: relative;
    top: -10px;
    left: 10px;
}

</style>