import Sidebar from "./sidebarPresenter.jsx";
import Search from "./searchPresenter.jsx";
import Details from "./detailsPresenter.jsx";
import Summary from "./summaryPresenter.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { observer } from 'mobx-react-lite';

// export default
// // observer(     will be added in week 3
// function ReactRoot(props){
//     return (<div className="vertical">
//                 <div className="flexParent">
//                     <div className="sidebar"><Sidebar model={props.model} /></div>
//                     <div className="mainContent">
//                         <Summary model={props.model} />
//                         <Search model={props.model} />
//                         <Details model={props.model} />
//                     </div>
//                 </div>
//             </div>
//    );
// }
// )

function makeRouter(props){
    return createHashRouter([
        {
            path: "/",
            element:<Search model={props.model} />
        },
        {
            path: "/search",
            element:<Search model={props.model} />
        },
        {
            path: "/summary",
            element:<Summary model={props.model} />
        },
        {
            path: "/details",
            element:<Details model={props.model} /> 
        }
    ])
}

export default
observer(
    function ReactRoot(props){
        if (!props.model.ready) {
            return <div>
                <img src="https://brfenergi.se/iprog/loading.gif"></img>
            </div>
        }
        return (<div className="vertical">
                    <div className="flexParent">
                        <div className="sidebar"><Sidebar model={props.model} /></div>
                        <div className="mainContent"><RouterProvider router={makeRouter(props)}/></div>
                    </div>
                </div>);
    }
)

