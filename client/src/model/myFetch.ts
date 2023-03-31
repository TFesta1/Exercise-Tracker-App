

// This only works when it's not live, since this isn't the clients url
const API_URL = 'http://localhost:3000/api/v1/';

export function rest(url: string) {
    // return fetch(url).then(res => res.json());
    return fetch(url)
      .then(res => res.ok ? res.json() : res.json().then(x=> { throw({ ...x, message: x.error }) } ) );
}


// For GET requests
export function api(url: string){
    return rest(API_URL + url);
}

// POST requests
export function post(url: string, data: any) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    return fetch(API_URL + url, requestOptions)
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
  }

// post('users', { name: 'John Doe', email: 'john@example.com' }) 