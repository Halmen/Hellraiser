import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import General from './General Filter/qa_results_filter_general';
import History from './Filter by History/qa_results_filter_history';
import Delete from './Delete Results/qa_results_delete';
import ApiService from '../../utils/ApiService';
import { Link } from 'inferno-router';
import './../../sidetab.css';







    

//
//      
//        let API1 = "http://10.200.24.2:2000/get_qa_results";
//        let API2 = "http://10.200.24.2:2000/get_qa_result_states"; 
//        let APIs=[API1,API2];
//        let instance ={};
//        
//        for(let i in APIs){
//   
//    
//        ApiService.getJson(APIs[i])
//                .then(
//                        res => {
//                            // Set state with fetched json1 list
//                            instance['json'+i]= res;
//                            
//                        },
//                        error => {
//                            // An error occurred, set state with error
//                            
//                                instance['error'+i]=error;
//                           
//                        }
//                );
//
//
//      
//                }

               
  
    

      export const Qa_results = ({children})=>(
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-2">
                            <nav class="nav-sidebar">
                                <ul class="nav tabs">
                                    <li  ><Link to="/qa_results/filter_by_history">FILTER BY HISTORY</Link></li>
                                    <li  ><Link to="/qa_results/general_filter">GENERAL FILTER</Link></li>
                                    <li  ><Link to="/qa_results/delete_results">DELETE RESULTS</Link></li>                      
                                </ul>
                            </nav>
                            <div><h2 class="add">Place for your add!</h2></div>
                        </div>
                
                
                        <div className="col-sm-9">
                            {children}
                        </div>   
                    </div> 
                </div>


                                    );
                   