import SidebarView from "../views/sidebarView.jsx";
import { observer } from "mobx-react-lite";

export default
observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function Sidebar(props){
        return <SidebarView number={props.model.numberOfGuests} onNumberChange={changeNumberACB} 
                dishes={props.model.dishes} onDishClicked={setCurrentDishACB} deleteDish={deleteDishACB}/>;
        
        function changeNumberACB(num){
            props.model.setNumberOfGuests(num)
        }
    
        function setCurrentDishACB(dish){
            props.model.setCurrentDish(dish.id)
        }
    
        function deleteDishACB(dish){
            props.model.removeFromMenu(dish)
        }
    }
);
