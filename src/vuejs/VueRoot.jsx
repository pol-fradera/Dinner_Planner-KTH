import Sidebar from "./sidebarPresenter.jsx";
import Search from "./searchPresenter.jsx";
import Details from "./detailsPresenter.jsx";
import Summary from "./summaryPresenter.jsx";
import { createRouter, createWebHashHistory, RouterView} from "vue-router";


// export default
// function VueRoot(props){
//     return (<div className="vertical">
//                 <div className="flexParent">
//                     <div className="sidebar"><Sidebar model={props.model} /></div>
//                     <div className="mainContent">
//                          <Summary model={props.model} />
//                          <Search model={props.model} />
//                          <Details model={props.model} />
//                     </div>
//                 </div>
//             </div>
//            );
// }

export function makeRouter(props){
    return createRouter({
        history: createWebHashHistory(),
        routes:[
            {
                path: "/",
                component:<Search model={props} />
            },
            {
                path: "/search",
                component:<Search model={props} />
            },
            {
                path: "/summary",
                component:<Summary model={props} />

            },
            {
                path: "/details",
                component:<Details model={props} />
            }
        ]
    });      
}

export default
function VueRoot(props){
    if (!props.model.ready) {
        return <div>
            <img src="https://brfenergi.se/iprog/loading.gif"></img>
        </div>
    }
    return (<div className="vertical">
                <div className="flexParent">
                    <div className="sidebar"><Sidebar model={props.model} /></div>
                    <div className="mainContent"><RouterView/></div>
                </div>
            </div>);
}

