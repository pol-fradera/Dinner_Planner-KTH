import DetailsView from "../views/detailsView.jsx";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { getDishDetails } from "/src/dishSource.js";

export default
observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function Details(props){
        const [promise, setPromise] = useState();
        const [data, setData] = useState();
        const [error, setError] = useState();

        useEffect(setPromiseACB, [props.model.currentDish]);
        useEffect(resolvePromiseACB, [promise]);

        function setPromiseACB() {
            if (props.model.currentDish != null) setPromise(getDishDetails(props.model.currentDish));
        }

        function resolvePromiseACB() {
            if (props.model.currentDish != null) {
                setData(null);
                setError(null);
                let cancelled = false;  // closure!
                promise.then(setDataACB).catch(setErrorACB);
                function setDataACB(d) {
                if (!cancelled) setData(d);
                }
                function setErrorACB(e) {
                    if (!cancelled) setError(e);
                }

                return function cancelACB() {
                    cancelled = true;
                };
            }
        }

        if (!promise) return "no data";
        if (!data && !error) return <img alt = "logo" src="https://brfenergi.se/iprog/loading.gif"/>;
        if (error) return error;
        return <DetailsView dishData={data} 
                guests={props.model.numberOfGuests} isDishInMenu={props.model.dishes.find(isDishInMenuCB)} 
                onAddToMenu={addDishToMenuACB}/>;

        function isDishInMenuCB(dish){
            console.log(dish);
            return (props.model.currentDish === dish.id);
        }

        function addDishToMenuACB() {
            props.model.addToMenu(data);
        }
    }
);
