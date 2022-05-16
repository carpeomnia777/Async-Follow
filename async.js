const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json'); //calling the api then storing to the variable "fetchPromise"

console.log(fetchPromise); //logs the content of the fetch which should have the output of 'Promise {<state: "pending">}' which alerts us that there is a Promise object and it has a state of "pending" meaning the fetch is ongoing

fetchPromise.then( response => {console.log(`received response: ${response.status}`)}); //passing a handler function that uses the .then() method which when the fetch operation succeeds will give a response object that contains the server's response 

console.log("Started request..."); //logs a message that the request has started



//---------------------------------------------------------------------------------------------------------------- chaining promises

const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json')

fetchPromise.then( response => {
    const jsonPromise = response.json();
    jsonPromise.then( json => {
        console.log(json[0].name);
    });
 });

 //--------------------------------------------------------chaining redux

 const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

 fetchPromise
 .then( response => {
     return response.json();
 })
 .then (json => {
     console.log(json[0].name);
 });

 //--------------------------------------------------------chaining with error checking

 const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

 fetchPromise
 .then( response => {
     if (!response.ok){
         throw new Error(`HTTP error: ${response.status}`);
     }
     return response.json();
 })
 .then (json => {
     console.log(json[0].name);
 });

 //--------------------catching errors (.then is called if the fetch succeeds with .catch is called if it fails)

const fetchPromise = fetch('bad-scheme://mdn.github.io/learning-area/javascript/ apis/fetching-data/can-store/products.json');

fetchPromise
 .then (response => {
     if (!response.ok){
         throw new Error(`HTTP error: ${response.status}`);
     }
     return response.json();
 })
 .then( json => {
     console.log(json[0].name);
 })
 .catch( error => {
     console.error(`Could not get products: ${error}`);
 });

 //------------------ Promise.all() arrays fulfilled if all promises are fulfilled, reject if any aren't
 const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json')
 const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found')
 const fetchPromise3= fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/superheroes.json')

 Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
    .then(response => {
        for (const response of response) {
            console.log(`${response.url}: ${response.status}`);
        }
    })
    .catch (error => {
        console.error(`failed to fetch: ${error}`)
    }); // output 200 or success for 1 and 3 and 404 not found for 2

    //--------------------same but bad url--------------------

    const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json')
    const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found')
    const fetchPromise3 = fetch('bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/superheroes.json')

    Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
        .then (responses => {
            for(const repsonse of responses){
                console.log(`${response.url}: $response.status`);
            }
        })
        .catch(error => {console.error(`failed to fetch: ${error}`)});

//--------------------------------Promise.any------------------------
const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json')
 const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found')
 const fetchPromise3= fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/superheroes.json')

 Promise.any([fetchPromise1, fetchPromise2, fetchPromise3])
    .then(response => {
        for (const response of response) {
            console.log(`${response.url}: ${response.status}`);
        }
    })
    .catch (error => {
        console.error(`failed to fetch: ${error}`)
    });

    //--------------------async

    async function myFunction(){ //denotes an async function

    }

//----------------------async function in practice---------------

async function fetchProducts(){
    try{
        const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
        if(!response.ok){
            throw new Error(`HTTP error: ${response.status}`);
        }
        const json = await repsonse.json();
        console.log(json[0].name);
    }
    catch(error){
        console.error(`could not get products: ${error}`);
    }
}
// await fetch() while it is an async function we get back a response instead of a PRomise as if it was a synchronous function.

//---------------------async function redux----------------------------------------------------

async function fetchProducts(){
    try{
        const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
        if (!response.ok){
            throw new Error(`HTTP error: ${response.status}`)
        }
        const json = await response.json();
        return json;
    }
    catch(error){
        console.error(`could not get products: ${error}`);
    }
}

const jsonPromise = fetchProducts();
jsonPromise.then((json) => console.log(json[0].name));