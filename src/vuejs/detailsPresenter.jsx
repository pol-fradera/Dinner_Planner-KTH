import DetailsView from "../views/detailsView.jsx";
import { getDishDetails } from "/src/dishSource.js";
import { reactive, watch } from 'vue';

export default {
    props: ['model'],
    setup(props) {
        const compState = reactive({
            promise : undefined,
            data : undefined,
            error : undefined,
        });
        // render of component state, returned below!!
        function renderACB() {
            if (!compState.promise) return "no data";
            if (!compState.data && !compState.error) return <img src="https://brfenergi.se/iprog/loading.gif"></img>;
            if (compState.error) return compState.error;
            return (<DetailsView dishData={compState.data} 
                    guests={props.model.numberOfGuests} isDishInMenu={props.model.dishes.find(isDishInMenuCB)} 
                    onAddToMenu={addDishToMenuACB}/>);
            function isDishInMenuCB(dish){
                console.log(dish);
                return (props.model.currentDish === dish.id);
            }
        
            function addDishToMenuACB() {
                props.model.addToMenu(compState.data);
            }
        }

        function resolvePromiseACB() {
            compState.data = null;
            compState.error = null;
            let cancelled = false;  // closure!
            compState.promise = getDishDetails(props.model.currentDish);
            compState.promise.then(setDataACB).catch(setErrorACB);
            function setDataACB(d) {
             if (!cancelled) compState.data = d;
            }
            function setErrorACB(e) {
              if (!cancelled) compState.error = e;
            }
        
            return function cancelACB() {
              cancelled = true;
            };
        }

        // side effect in component state 
        watch(function checkACB() {
            return [props.model.currentDish];
        }, resolvePromiseACB);

        return renderACB;
    }
}



// function Details(props){
//     if (!props.model.currentDishPromiseState.promise) return "no data";
//     if (!props.model.currentDishPromiseState.data && !props.model.currentDishPromiseState.error) return <img src="https://brfenergi.se/iprog/loading.gif"></img>;
//     if (props.model.currentDishPromiseState.error) return props.model.currentDishPromiseState.error;
//     return <DetailsView dishData={props.model.currentDishPromiseState.data} 
//             guests={props.model.numberOfGuests} isDishInMenu={props.model.dishes.find(isDishInMenuCB)} 
//             onAddToMenu={addDishToMenuACB}/>;

//     function isDishInMenuCB(dish){
//         console.log(dish);
//         return (props.model.currentDish === dish.id);
//     }

//     function addDishToMenuACB() {
//         props.model.addToMenu(props.model.currentDishPromiseState.data);
//     }
// }
