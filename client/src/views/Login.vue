<script setup lang="ts">
    import { useSession } from "@/model/session"
    import { defineComponent, reactive } from "vue";
    // import userStore from "@/stores/user";
    import { onMounted, provide, inject, ref  } from "vue";
    import type UserStore from '@/stores/user';
    import { loadScript, rest } from '@/model/myFetch';
    const userStore = inject('userStore') as typeof UserStore;
    
    // async function googleLogin()
    // {
    //     await loadScript('https://accounts.google.com/gsi/client', 'google-login');
    //     //await loadScript('https://apis.google.com/js/platform.js', 'gapi');
    //     const client = google.accounts.oauth2.initTokenClient({
    //         client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    //         scope: 'https://www.googleapis.com/auth/calendar.readonly \
    //                 https://www.googleapis.com/auth/contacts.readonly',
    //         callback: async (tokenResponse: string) => {
    //             console.log(tokenResponse);
    //             const me = await rest(
    //                 'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses',
    //                 null, undefined, {
    //                     "Authorization": "Bearer " + tokenResponse.access_token
    //                 }
                    
    //                 );
    //             console.log(me);
    //             const calendar = await rest('https://www.googleapis.com/calendar/v3/calendars/primary/events',
    //                 null, undefined, {
    //                     "Authorization": "Bearer " + tokenResponse.access_token
    //                 })
    //             console.log(calendar);
    //         },
    //         });
    //         client.requestAccessToken();
    // }

    // Bad code since it's using "as any" but it's because it's not a defined type. It's just explicitly exported variables
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
    <!-- <p class="googleButtonWrapper">
        <button class="button is-primary googleButton" @click="googleLogin">
            Login With Google
        </button>
    </p> -->

    <div class="display-pass-user-list">
        <h2>FOR TESTING ONLY</h2>
        <p>user: tanner<br>pass: tanner<br><br>user: admin<br>pass: admin<br><br>user: plotkin<br>pass: plotkin<br><br>user: humza<br>pass: humza</p>
    </div>
    
</template>

<style scoped>
    @import "@/assets/auth.css";
    .googleButtonWrapper {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    .googleButton {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 12px 24px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        background-color: #67941a;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .googleButton:hover {
        background-color: #7f9c3a;
    }

    .googleButton:active {
        background-color: #9cc12d;
    }

    .googleButton:focus {
        outline: none;
        box-shadow: 0px 0px 0px 4px rgba(66, 133, 244, 0.4);
    }

</style>