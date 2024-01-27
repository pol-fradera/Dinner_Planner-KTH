import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, onValue} from "/src/teacherFirebase.js";
import { getMenuDetails } from "/src/dishSource.js";

// Add relevant imports here 
import firebaseConfig from "/src/firebaseConfig.js"

// Initialise firebase app, database, ref
const app= initializeApp(firebaseConfig)
const db= getDatabase(app)

//  PATH is the “root” Firebase path. NN is your TW2_TW3 group number
const PATH="dinnerModel67";

//set(ref(db, PATH+"/test"), "dummy");
//set(ref(db, PATH+"/test"), modelToPersistence({numberOfGuests:5, currentDish:13, dishes:[{id:13}, {id:42}]}));

function modelToPersistence(model){
    if (model.currentDish == null) {
        return {
            guests: model.numberOfGuests,
            dishesIDs: model.dishes.map(transformerCB).sort((a,b) => a - b)
        }
    }
    return {
        guests: model.numberOfGuests,
        currentDishID: model.currentDish,
        dishesIDs: model.dishes.map(transformerCB).sort((a,b) => a - b)
    }
    function transformerCB(dish){
        return dish.id;
    }
}

function persistenceToModel(data, model){
    model.numberOfGuests = data?.guests || 2;
    model.setCurrentDish(data?.currentDishID || null);
    return getMenuDetails(data?.dishesIDs || []).then(transformerACB);
    
    function transformerACB(dishes){
        model.dishes = dishes;
    }
}

function saveToFirebase(model){
    if (model.ready) {
        set(ref(db, PATH+"/model"), modelToPersistence(model));
    }
}

function readFromFirebase(model){
    model.ready = false;

    function convertPersistenceToModelACB(snapshot) {
        return persistenceToModel(snapshot.val(), model);
    }
    onValue(ref(db, PATH+"/model"), convertPersistenceToModelACB);
    
    return get(ref(db, PATH+"/model"))
            .then(convertPersistenceToModelACB)
            .then(function setModelReadyACB() {
                    model.ready = true;
            })
}

function connectToFirebase(model, watchFunction){
    readFromFirebase(model);
    watchFunction(checkACB, sideEffectACB);
    function checkACB() { 
        return [model.numberOfGuests, model.dishes, model.currentDish]; 
    }
    function sideEffectACB(){
        saveToFirebase(model);
    }
}

export {modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase}

export default connectToFirebase;
