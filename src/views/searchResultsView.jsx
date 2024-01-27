import "/src/style.css"

function SearchResultsView(props){
    return (
        <div>
            {props.searchResults.map(displayDishCB)}
        </div>
    );

    function displayDishCB(dish) {
        function dishClickedCB(evt){ 
            props.onDishClicked(dish);
            window.location.hash="#/details";
        }
        
        return (
            <span key={dish.id} className="dishes" onClick={dishClickedCB}>
                <img src={dish.image} height="100"></img>
                <div>{dish.title}</div>
            </span>
        );
    }
}

export default SearchResultsView;