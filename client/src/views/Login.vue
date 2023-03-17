<script setup lang="ts">
    import { useSession, login } from "@/model/session"
    import { defineComponent, reactive } from "vue";
    // import userStore from "@/stores/user";
    import { onMounted, provide, inject, ref  } from "vue";
    // @ goes to the src file
    // import router from '@/router/index'


    // import users from "@/../public/data/users.json"

    // import { UserStore } from '@/stores/user';

    // onMounted(userStore.getUser)
    // provide("userStore", userStore)

    // Bad code since it's using "as any" but it's because it's not a defined type. It's just explicitly exported variables
    const userStore = inject('userStore') as any;
    const router = inject('router') as any;

    if (userStore.getters.isLoggedIn){
        router.push('/')
    }
    
    
    const form = reactive({
        username: "",
        password: ""
    })

    const onSubmit = () => {
        userStore.login(form.username, form.password)
        form.username = ""
        form.password = ""
        return { form, onSubmit }
    }
    

</script>

<template>
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="auth.css">
        <title>Login</title>
    </head>

    <body>

    </body>
    <!-- Originally: /login  method is post 
    action="/login" method="post"-->
    <!--   -->
    <form action="/login" method="post" @submit.prevent="onSubmit">
        <div>
            <!-- {{#if error}}
            <p class="err-msg">Username or password is incorrect</p>
            {{/if}} -->
            <h1>Login</h1>
        </div>
        <div class="form-group">
            <label>Username: </label>
            <input 
                v-model="form.username"
                type="text" 
                name="username" 
                id="username" 
                placeholder="Enter your username" 
                required/>
        </div>
        <div class="form-group">
            <label>Password:</label>
            <input 
                v-model="form.password"
                type="password" 
                name="password" 
                id="password" 
                placeholder="Enter your password" 
                required/>
        </div>
        <div>
            <!--  -->
            <h2>{{ userStore.state.error }}</h2>
            <input type="submit" value="Login" />
        </div>

    </form>

    <div class="display-pass-user-list">
        <h2>FOR TESTING ONLY</h2>
        <p>user: tanner<br>pass: tanner<br><br>user: admin<br>pass: admin<br><br>user: plotkin<br>pass: plotkin<br><br>user: humza<br>pass: humza</p>
    </div>
    
</template>

<style scoped>
    @import "@/assets/auth.css";

</style>