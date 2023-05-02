
const ENV_URL = import.meta.env.VITE_API_URL;
const API_URL = ENV_URL ? ENV_URL : "/api/v1/";
// This only works when it's not live, since this isn't the clients url
// const API_URL = "http://localhost:3000/api/v1/";
console.log(API_URL)

export function rest(url: string, data?: any, method?: string, headers?: any){
  return fetch(url, {
      method: method ?? (data ? 'POST' : 'GET'),
      headers: {
          'Content-Type': 'application/json',
          ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    })
      .then(res => res.ok 
          ? res.json() 
          : res.json().then(x=> { throw({ ...x, message: x.error }) } )
      );
}


// For GET requests
export function api(url: string, data?: any, method?: string, headers?: any){
  return rest(API_URL + url, data, method, headers);
}

// // POST requests
// export function post(url: string, data: any) {
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     };
//     return fetch(API_URL + url, requestOptions)
//       .then(response => response.json())
//       .catch(error => console.error('Error:', error));
// }

export type DataEnvelope<T> = {
  data: T,
  isSuccess: boolean,
  error?: string,
}

export type DataListEnvelope<T> = DataEnvelope<T[]> & {
  total: number,
}


export function loadScript(url: string, id: string){
  return new Promise((resolve, reject) => {
      if(document.getElementById(id)) return resolve(true);
      // Create a new script within the document that should specify the script, which will load it.
      const script = document.createElement('script');
      script.src = url;
      script.id = id;
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
  });
}

// post('users', { name: 'John Doe', email: 'john@example.com' }) 