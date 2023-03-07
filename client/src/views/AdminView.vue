<script setup lang="ts">
    import { ref, inject, onMounted } from 'vue'
    import FriendsTable from '@/components/FriendsTable.vue';
    const userStore = inject('userStore') as any;

    // onMounted(userStore.getUser)
    const username = ref(null)
    const isAdmin = ref(false)

    async function logUserName() {
        const result = await userStore.getUserName();
        username.value = result
        console.log(username.value)
    }
    logUserName();


    if (username.value == "admin") {
        isAdmin.value = true
    }

    console.log(isAdmin.value)

    
</script>

<template>

    <div v-if="isAdmin" class="">
        <FriendsTable />
        
    </div>
    

</template>

<style>
    @import "@/assets/exercise.css";
</style>