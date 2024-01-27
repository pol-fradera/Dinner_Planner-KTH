import {dishType, sortDishes, menuPrice} from "/src/utilities.js";
import "/src/style.css"

/* Functional JSX component. Name must start with capital letter */
function SidebarView(props){
    return (
            <div>
              <button disabled={props.number === 1} onClick={minusACB}>-</button> 
              <span> {props.number} </span> 
              <button onClick={plusACB}>+</button>
              
              <table>                
                <tbody>
                  { 
                      sortDishes(props.dishes).map(mealTableRowCB)
                  } 
                  <tr>
                    <td></td>
                    <td>Total:</td>
                    <td></td>
                    <td className="right">{(menuPrice(props.dishes)*props.number).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
    );
    
    function minusACB(evt){
      props.onNumberChange(props.number-1)
    }

    function plusACB(evt){
      props.onNumberChange(props.number+1)
    }

    function mealTableRowCB(dish){
      return <tr key={dish.id} >
               <td><button onClick={xClickedACB}>x</button></td>
               <td><a href="#/details" onClick={dishClickedACB}>{dish.title}</a></td>
               <td>{dishType(dish)}</td>
               <td className="right">{(dish.pricePerServing*props.number).toFixed(2)}</td>
             </tr>;

      function dishClickedACB(evt){
        props.onDishClicked(dish)
      }

      function xClickedACB(evt){
        props.deleteDish(dish)
      }
  }
}

export default SidebarView;
