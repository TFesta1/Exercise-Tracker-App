<script setup lang="ts">
    import { ref, inject, onMounted } from 'vue'
    import AdminTable from '@/components/AdminTable.vue'
    import type UserStore from '@/stores/user';
    const userStore = inject('userStore') as typeof UserStore;

    // onMounted(userStore.getUser)
    const username = ref("")
    const isAdmin = ref(false)

    async function logUserName() {
        const result = await userStore.getUserName();
        username.value = result
        
        console.log(username.value)
        if (username.value == "admin") {
            isAdmin.value = true
        }
        else {
            console.log(`NOT Admin ${username.value} | admin  --> NOT admin`)
        }
    }
    logUserName();



    

    
</script>

<template>

    <div v-if="isAdmin" class="">
        <AdminTable />
    </div>
    

</template>

<style>
    @import "@/assets/exercise.css";
</style>