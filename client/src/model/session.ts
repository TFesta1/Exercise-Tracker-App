/*  B"H
*/

import { reactive } from "vue";
import { useRouter } from "vue-router";
import * as myFetch from "./myFetch";
import token from "@/stores/loginToken"


const session = reactive({
    user: null as User | null,
    isLoading: false,
    messages: [] as {
        msg: string,
        type: "success" | "danger" | "warning" | "info",
    }[],
    redirectUrl: null as string | null,
})

interface User {
    id?: number;
    name: string;
    email?: string;
    photo?: string;
    token?: string;
}

export function useSession() {
    return session;
}

export function api(url: string, data?: any, method?: string, headers?: any) {
    session.isLoading = true;
    
    // const tempBearer = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ3MWIwYzYzNDFjNWIzMjQ4MGJlOGEiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5AZG9lLmNvbSIsInBob3RvIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvaGljdmVsZGljdGEucG5nP3NpemU9NTB4NTAmc2V0PXNldDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODI2ODUwMzksImV4cCI6MTY4Mjc3MTQzOX0.LLdJxQ__ogTW_F6mGNjLqs-TuW6H9o4-jRmh0Ghiz_Y"
    // 
    
    // session.user?.token
    if(token.getters.getToken){
        headers = {
            "Authorization": `Bearer ${token.getters.getToken}`,
            ...headers,
        }
    }
    else 
    {
        // console.log("No authorization token")
        // console.log(session.user)
    }

    return myFetch.api(url, data, method, headers)
        .catch(err => {
            console.error({err});
            session.messages.push({
                msg: err.message  ?? JSON.stringify(err),
                type: "danger",
            })
        })
        .finally(() => {
            session.isLoading = false;
        })
}

export function useLogin() {
    const router = useRouter();
    

    return async function() {
        console.log("is this function being called?")
        const response = await api("users/login", {
            "email": "john@doe.com",
            "password": "123456"
        }).catch(err => {
            console.log("Error calling the API")
            console.log(err);
        });

        session.user = response.data.user;
        if(!session.user) {
            addMessage("User not found", "danger");
            console.log("No user being found")
            return;
        }
        else{
            console.log("User found")
        }
        session.user.token = response.data.token;

        router.push(session.redirectUrl ?? "/");
        session.redirectUrl = null;
    }
}

export function useLogout() {
    const router = useRouter();
    
    return function(){
        console.log({router});
        session.user = null;

        router.push("/login");
    }
}

export function addMessage(msg: string, type: "success" | "danger" | "warning" | "info") {
    console.log({msg, type});
    session.messages.push({
        msg,
        type,
    })
}

export function deleteMessage(index: number) {
    session.messages.splice(index, 1);
}