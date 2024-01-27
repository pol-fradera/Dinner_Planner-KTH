import SearchFormView from "../views/searchFormView.jsx";
import SearchResultsView from "../views/SearchResultsView.jsx";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";

export default
observer(
    function Search(props) {
        const [query, setSearchTextACB]= useState();
        const [type, setSearchDishTypeACB]= useState();

        useEffect(searchNowACB, [] );
        function searchNowACB(){
            if (query == undefined) props.model.doSearch({});
            else props.model.doSearch({ query: query, type: type });
        }

        return (<div>
                    <SearchFormView 
                        dishTypeOptions={["starter","main course","dessert"]}
                        text={query}
                        type={type}
                        onTextChanged={setSearchTextACB}
                        onSelectionChanged={setSearchDishTypeACB}
                        onSearchClicked={searchNowACB} 
                    />
                    {rendered(props.model.searchResultsPromiseState)}
                </div>);

        function rendered(state) {

            function showDishDetailsACB(dish) {
                props.model.setCurrentDish(dish.id);
            }

            if (!state.promise) return "no data";
            if (!state.data && !state.error) return <img src="https://brfenergi.se/iprog/loading.gif"></img>;
            if (state.error) return state.error;
            return <SearchResultsView searchResults={state.data} onDishClicked={showDishDetailsACB}/>; 
        }
    }
)