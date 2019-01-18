import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import ApiService from '../../utils/ApiService';
import Add from './Add QA Cases/qa_cases_add';
import List from './List QA Cases/qa_cases_list'
import { Link } from 'inferno-router';
import './../../sidetab.css';






        let API1 = "http://10.200.24.2:2000/get_latest_documentation";
        let API2 = "http://10.200.24.2:2000/get_qa_composites_and_layers";


       
    

    export const Qa_cases = ({children})=>(
            
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-2">
                            <nav class="nav-sidebar">
                                <ul class="nav tabs">
                                    <li><Link to="/qa_cases/qa_cases_add">ADD QA CASES</Link></li> 
                                    <li><Link to="/qa_cases/qa_cases_list">LIST QA CASES</Link></li>                      
                                </ul>
                            </nav>
                            <div><h2 class="add">Place for your add!</h2></div>
                        </div>
                
                
                        <div className="col-lg-10"> 
                            {children}                        
                        </div>   
                
                    </div>
                </div>


                                );
            