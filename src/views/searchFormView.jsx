import "/src/style.css"
function SearchFromView(props){
    return (
        <div>
            <input value={props.text || ""} onChange={textChangedACB}></input>
            <select value={props.type || ""} onChange={selectionChangedACB}>
                <option value="">Choose:</option>
                {props.dishTypeOptions.map(typesOptionsCB)}
            </select>
            <button onClick={searchClickedACB}>Search!</button>
            <button onClick={goToSummaryACB}>Summary</button>
        </div>        
    );

    function typesOptionsCB(opt) {
        return <option key={opt} value={opt}>{opt}</option>
    }

    function textChangedACB(evt){
        props.onTextChanged(evt.target.value)
    }
    
    function selectionChangedACB(evt) {
        props.onSelectionChanged(evt.target.value)
    }
    
    function searchClickedACB(evt) {
        props.onSearchClicked()
    }

    function goToSummaryACB(evt){
        window.location.hash="#/summary";
    }
}

export default SearchFromView;