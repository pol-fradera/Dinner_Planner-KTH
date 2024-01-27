import "/src/style.css"

function DetailsView(props){
    const ddata = props.dishData;
    return (
        <div>
            <h4>{ddata.title}</h4>
            <table>
                <tbody>
                    <tr>
                        <td><img className="dishes" src={ddata.image}></img></td>
                        <td className="debug"> Price: {ddata.pricePerServing} <br/>
                            for {props.guests} guests: {ddata.pricePerServing*props.guests}
                        </td>
                    </tr>
                </tbody>
            </table>

            <table>
                <tbody>
                    <tr>
                        <td>
                            <span>
                                {ddata.extendedIngredients.map(ingredientsInfoCB)}
                            </span>
                        </td>
                        <td>
                            <button onClick={addToMenuCB} disabled={props.isDishInMenu}>Add to menu!</button>
                            <button onClick={backToSearchACB}>Cancel</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <span><pre className="debug" style={{ width: '500px', overflow: 'auto' }}>{ddata.instructions}</pre></span>
            <span>
                <a href={ddata.sourceUrl}>More information</a>
            </span>
        </div>
    );
    function backToSearchACB(evt){
        window.location.hash="#/search";
    }

    function ingredientsInfoCB(ingr){
        return <p key={ingr.id}>{ingr.name}: {ingr.amount}{ingr.unit}</p>
    }

    function addToMenuCB(evt){
        props.onAddToMenu();
        window.location.hash="#/search";
    }
}

export default DetailsView;