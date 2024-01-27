// un-comment when needed:
import {sortIngredients} from "/src/utilities.js";
import "/src/style.css"

/* Functional JSX component. Name must start with capital letter */
function SummaryView(props){
    return (
            <div className="debug">
              Summary for <span title="nr guests">{props.people}</span> persons:
              
              <table>
                  {  //  <---- in JSX/HTML, with this curly brace, we go back to JavaScript, and make a comment
                      

                <thead>
                  <tr>
                    <th>Ingredients</th>
                    <th>Aisle</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                  </tr>
                </thead>

                  }
                
                <tbody>
                  {  //  <---- in JSX/HTML, with this curly brace, we go back to JavaScript expressions
                      // TODO: un-comment and pass the CB below for array rendering!
                      
                      sortIngredients(props.ingredients).map(ingredientTableRowCB)

                      // TODO once the table rendering works, sort ingredients before mapping. Import the needed function from utilities.js  
                  }
                </tbody>
              </table>
              <button onClick={backToSearchACB}>Back to Search</button>
            </div>
    );
    function backToSearchACB(evt){
        window.location.hash="#/search";
    }

    /* for TW1.5 
      Note also that the callback can be defined after it is used! 
      This JS feature is called "function hoisting".
    */
    function ingredientTableRowCB(ingr){
        return <tr key={ /* TODO what's a key? */ingr.id } >
                 <td>{ingr.name}</td>
                 <td>{ingr.aisle}</td>
                 <td className="right">{(ingr.amount*props.people).toFixed(2)}</td>
                 <td>{ingr.unit}</td>
               </tr>;
    }
}

export default SummaryView;
