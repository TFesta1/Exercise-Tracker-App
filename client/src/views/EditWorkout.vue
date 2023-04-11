<script setup lang="ts">
    import { ref, inject, onMounted, defineProps, reactive } from 'vue'
    import type UserStore from '@/stores/user';
    import { type EditWorkout, getWorkoutById } from '@/model/workouts';
    

    const username = ref("")
    const userStore = inject('userStore') as typeof UserStore;
    const router = inject('router') as any;

    const props = defineProps({
        id: {
            type: Number,
            required: true,
        },
    });

    

    // const workouts = ref({} as EditWorkout);
    const description = ref("")
    const intensity = ref("")

    // console.log(props.id)

    // Fetch the workout data using the API when the component is mounted
    onMounted(async () => {
        console.log(props.id)

        getWorkoutById(props.id).then((data) => {
            // console.log(data.data)
            // workouts.value = data.data;
            // console.log(workouts.value)
            // description.value = data.data.description
            // intensity.value = data.data.intensity
            

            form.description = data.data.description
            form.intensity = data.data.intensity //.toLowerCase()
            // form.intensity = "Easy"

            // const selectElement = document.querySelector('.intensity-dropdown');
            // if (selectElement != null)
            //     selectElement.value = data.data.intensity;
                // return;
            

            console.log(form.intensity)
            // return data.data;
        });
    });

    async function onSubmit() 
    {
        if(form.description == '' || form.intensity == '') {
            alert('Please fill out all fields')
            return
        }

        // Edit the data with the thing at that ID
        



        router.push('/workoutList')



    }


    const form = reactive({
        description: '',
        intensity: ''
    })





    

</script>

<template>

<div class="modal-container">
    <div class="modal">
        <h2>Edit Workout</h2>
        <form @submit.prevent="onSubmit">
            <label>
                Description:
                <textarea v-model="form.description" name="description" class="description-box"></textarea>
            </label>
            <label>
                Intensity:
                <select class="intensity-dropdown" v-model="form.intensity">
                    <option value="High" :selected="form.intensity == 'High'">High</option>
                    <option value="Normal" :selected="form.intensity == 'Normal'">Normal</option>
                    <option value="Easy" :selected="form.intensity == 'Easy'">Easy</option>
                </select>

            </label>
            <button type="submit" class="submit-modal">Save Changes</button>
        </form>
    </div>
    <div class="modal-background"></div>
</div>
    

    
</template>

<style scoped>

.submit-modal
{
    top: 50px;
}
.modal {
    padding: 100px;
    /* flex-direction: column;
    align-items: center;
    justify-content: center; */
}

</style>