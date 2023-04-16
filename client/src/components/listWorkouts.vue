<script setup lang="ts">
    import { ref, computed, watch, onMounted, onUnmounted, defineComponent, watchEffect  } from 'vue'
    // import type { Workout } from '@/model/workouts';

    import { type Workout, removeWorkout, addToWorkout, getUserWorkouts } from '@/model/workouts';



    // const props = defineComponent({
    //     props: {
    //         changingWorkouts: {
    //             type: Array as PropType<Workout[]>,
    //             required: true
    //         },
    //         username: {
    //             type: String,
    //             required: true
    //         }
    //     }
    // })

    const props = defineProps<{
        username: string;
        showTrash?: boolean;
        changeWorkoutsUpdate?: Workout[];
    }>();

    const showTrash = ref(false)

    // console.log(props.workouts)
    // console.log(props.username)

    

    

    const changingWorkouts = ref({} as Workout[]);

    // Continuously update the changingWorkouts variable
    watchEffect(async () => {
        if (props.username == "")
        {
            // Blocks bad request attempt
            return;
        }
        await getUserWorkouts(props.username).then((data) => {
            
            changingWorkouts.value = data.data;
            // console.log(changingWorkouts.value)
            
        });

        showTrash.value = props.showTrash;

    });

    watch(() => props.changeWorkoutsUpdate, (newVal) => {
        if (newVal != undefined) {
            changingWorkouts.value = newVal;
        }
    });

    

    // console.log(props.changeWorkoutsUpdate)

    

    async function asyncRemove(i: number){
        await removeWorkout(i)
        getUserWorkouts(props.username).then((data) => {
            changingWorkouts.value = data.data;
        });
        await getUsername() //Updates the table
        // getUsername()
    }

    async function getUsername() {
        getUserWorkouts(props.username).then((data) => {
            changingWorkouts.value = data.data;
        });
    }

    async function userWorkouts() {
        
        const user = props.username;
        // changingWorkouts.value = getUserWorkouts(user);
        getUserWorkouts(user).then((data) => {
            changingWorkouts.value = data.data;
        });

        // removeWorkout

        return changingWorkouts;
    };



</script>

<template>
    <div class="workoutValues" v-for="workout,i in changingWorkouts">
        <h2>{{ workout.workoutType }}</h2>
        <br>

        <p>{{ workout.description.replace(/,/g, ', ') }}</p>
        
        
        <div class="intensity">
            <br>
            Intensity: {{ workout.intensity }}
        </div> 

        <button v-if="showTrash" class="trash-button" @click="asyncRemove(i)" @change="userWorkouts()">
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

</style>