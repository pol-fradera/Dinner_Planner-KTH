import {BASE_URL, API_KEY} from "/src/apiConfig.js";

/* #################### FUNCTIONS #################### */

function gotResponseACB(response){ 
    if (!response.ok) {
        throw new Error('Bad parameters')
    }
    return response.json(); 
}

function getDetailsFromArrayACB(array_dish){ return array_dish[0]; }

function getArrayFromMetadataACB(metadata) { return metadata.results; }

/* #################### FUNCTIONS #################### */

export function getMenuDetails(array_of_dish_ids){ return fetch(BASE_URL+"recipes/informationBulk?ids="+array_of_dish_ids.join(), 
                                                                {headers: {"X-Mashape-Key" : API_KEY}} ).then(gotResponseACB); }

export function getDishDetails(id) {return getMenuDetails([id]).then(getDetailsFromArrayACB)}

export function searchDishes(searchParams){ 
    return fetch(BASE_URL+"recipes/complexSearch?"+ new URLSearchParams(searchParams), 
                {headers: {"X-Mashape-Key" : API_KEY}}).then(gotResponseACB).then(getArrayFromMetadataACB)} 