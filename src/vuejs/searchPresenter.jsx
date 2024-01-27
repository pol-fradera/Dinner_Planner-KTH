import SearchFormView from "../views/searchFormView.jsx";
import SearchResultsView from "../views/SearchResultsView.jsx";
import { reactive, onMounted } from 'vue';

export default {
    props: ['model'],
    setup(props) {
        const compState = reactive({
            query : undefined,
            type : undefined,
        });
        
        function renderACB() {
            return (<div>
                        <SearchFormView 
                            dishTypeOptions={["starter","main course","dessert"]}
                            text={compState.query}
                            type={compState.type}
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

            function setSearchTextACB(t) {compState.query = t;}
            function setSearchDishTypeACB(ty) {compState.type = ty;}
        }
        function searchNowACB() {
            if (compState.query) props.model.doSearch(compState);
            else props.model.doSearch({});
        }

        // component lifecycle
        onMounted(searchNowACB);

        return renderACB;
    }
}