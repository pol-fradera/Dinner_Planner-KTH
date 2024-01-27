import SidebarView from "../views/sidebarView.jsx";

export default
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
