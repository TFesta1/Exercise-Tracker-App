<script setup lang="ts">
    import { RouterLink, RouterView } from 'vue-router'
    import { ref, inject } from 'vue'
    import type { Ref } from 'vue';
    import { useRoute } from 'vue-router'
    import { computed } from 'vue'
    import PfpSearch from './PfpSearch.vue'
    import type UserStore from '@/stores/user';
    const userStore = inject('userStore') as typeof UserStore;

    const menuRef = ref<HTMLElement | null>(null);
    const menuRefDefined = computed(() => Boolean(menuRef.value));
    
    


    

    const dynamicLabel = computed(() => {
        const route = useRoute()
        if (route.path === '/') {
            return 'Dashboard'
        } else if (route.path === '/statistics') {
            return 'Statistics'
        } else if (route.path === '/activity') {
            return 'Friends Activity'
        } else if (route.path === '/search') {
            return 'People Search'
        } else if (route.path === '/admin') {
            return 'Admin'
        }
    })

</script>

<template>
    <section id="menu" ref="menuRef" >
        <div class="logo">

            <!-- Adding the logo -->
            <img src="../assets/profile-pictures/logo.png" alt="logo">
            <h2 class="dynamic">{{ dynamicLabel }}</h2>

        </div>

        <div class="items">
            <ul>
                <!-- Add the "add-border" class when we're at the respective RouterLinks. Also, RouterLinks redirect the page when clicked -->
                <RouterLink to='/'><li :class="{ 'add-border': $route.path === '/' }"><i class="fas fa-pie-chart" aria-hidden="true"><a href="#">Dashboard</a></i></li></RouterLink>
                <RouterLink to='/statistics'><li :class="{ 'add-border': $route.path === '/statistics' }"><i class="fas fa-user" aria-hidden="true"><a href="#">Statistics</a></i></li></RouterLink>
                <RouterLink to='/activity'><li :class="{ 'add-border': $route.path === '/activity' }"><i class="fas fa-id-badge" aria-hidden="true"><a href="#">Friends Activity</a></i></li></RouterLink>
                <RouterLink to='/search'><li :class="{ 'add-border': $route.path === '/search' }"><i class="fas fa-filter" aria-hidden="true"><a href="#">People Search</a></i></li></RouterLink>
                <RouterLink to='/admin'><li :class="{ 'add-border': $route.path === '/admin' }"><i class="fas fa-lock" aria-hidden="true"><a href="#">Admin</a></i></li></RouterLink>
            </ul>
        </div>
        
    </section>
    <template v-if="menuRefDefined">
        <PfpSearch :menuRef="menuRef!" v-if="userStore.getters.isLoggedIn" @update-menu-ref="menuRef = $event"/>
    </template>
    
</template>

<style scoped>
    /* #menu-item1 {
        border-left: none;
    } */

</style>