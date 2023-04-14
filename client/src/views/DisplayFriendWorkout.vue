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

    

</script>

<template>
    <div class="adjust">
        <listWorkouts class="workouts" :username="username" :showTrash="false" />
    </div>
</template>

<style scoped>
.adjust {
  margin-top: 100px !important; /* adjust the margin to the desired value */
}

.workouts {
  margin-top: 100px !important; /* adjust the margin to the desired value */
}

</style>