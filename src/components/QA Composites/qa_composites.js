import Inferno, { linkEvent }
from 'inferno';
import Component from 'inferno-component';
import { Link } from 'inferno-router';
import Add from "./Add QA Composites/qa_composites_add";
import List from './List QA Composites/qa_composites_list'
import './../../sidetab.css';


export const Comp_add = () => (
   <Add/>
);


export let  Comp_list = () => (       
    <List/>        
 );



export const Qa_composites = ({children}
) => (
<div class="container-fluid">
    <div class="row">
        <div class="col-sm-2">
            <nav class="nav-sidebar">
                <ul class="nav tabs">
                    <li><Link to="/qa_composites/list_composites">LIST QA COMPOSITES</Link></li>
                    <li ><Link to="/qa_composites/add_composites">ADD QA COMPOSITES</Link></li>                
                </ul>
            </nav>
            <div><h2 class="add">Place for your add!</h2></div>
        </div>


        <div className="col-lg-10">
            { children }
        </div>   

    </div>
</div>
);



   