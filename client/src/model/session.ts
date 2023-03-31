import { reactive } from "vue";
import * as myFetch from "./myFetch";



// the user is null at first, but then it will be a User object
// the user is null at first, but then it will be a User object
const session = reactive({
    user: null as User | null,
    isLoading: false,
    messages: [] as {
        msg: string,
        type: "success" | "error" | "warning" | "info" | "danger"
    }[] 
});

// ? makes things optional in typescript
interface User {
    id?: number;
    name: string;
    email?: string;
    photo?: string;
    token?: string;
}

export function api(url: string) {
    session.isLoading = true;
    return myFetch.api(url)
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

export function postApi(url: string, data: any){
    session.isLoading = true;
    return myFetch.post(url, data)
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

export function useSession() {
    return session;
}

export function login() {
    session.user = {
        name: "John Doe",
    };
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