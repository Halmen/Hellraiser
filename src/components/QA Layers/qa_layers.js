import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import ApiService from '../../utils/ApiService';
import Add from './Add QA Layer/qa_layers_add';
import List from './List QA Layers/qa_layers_list'
import { Link } from 'inferno-router';
import './../../sidetab.css';


        let API = "http://10.200.24.2:2000/get_latest_documentation";
        let instance=null;
        
        ApiService.getJson(API)
                .then(
                        res => {
                            
                          instance=res;
                          
                        },
                        error => {
                            
                            instance=error;
                        }
                );
        
        
       
    
    
    



        export const Qa_layers = ({children})=>(
                <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-2">
                        <nav class="nav-sidebar">
                            <ul class="nav tabs">
                                <li><Link to="/qa_layers/list_layer">LIST QA LAYERS</Link></li>
                                <li ><Link to="/qa_layers/add_layer">ADD QA LAYERS</Link></li>                
                            </ul>
                        </nav>
                        <div><h2 class="add">Place for your add!</h2></div>
                    </div>
                
                
                    <div className="col-lg-9">
                        {children}
                    </div>   
                
                </div>
                </div>


                                );
                