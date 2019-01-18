import Inferno from 'inferno';
import Add from './Add QA Settings/qa_settings_add';
import List from './List QA Settings/qa_settings_list'
import { Link } from 'inferno-router';
import ApiService from '../../utils/ApiService';

import './../../sidetab.css';
function getData(){
        let API1 = "http://10.200.24.2:2000/get_qa_oses";
        let API2 = "http://10.200.24.2:2000/get_qa_result_states"; 
        let API3 = "http://10.200.24.2:2000/get_qa_env_variables"; 
        let APIs=[API1,API2,API3];
        let instance ={};
        
        for(let i in APIs){
   
    
        ApiService.getJson(APIs[i])
                .then(
                        res => {
                            // Set state with fetched json1 list
                            instance['json'+i]= res;
                            
                        },
                        error => {
                            // An error occurred, set state with error
                            
                                instance['error'+i]=error;
                           
                        }
                );
        
        

      
                }
                let szopjalmeg=instance;
                console.log(szopjalmeg);
                
}

export let List_settings = ()=>( < List dos={getData}/> );
export const Add_settings = ()=>( < Add/> );


export const Qa_settings = ({children})=>(
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-2">
                <nav class="nav-sidebar">
                    <ul class="nav tabs">
                        <li><Link to="/qa_settings/list_qasettings">LIST QA SETTINGS</Link></li>
                        <li><Link to="/qa_settings/add_qasettings">ADD QA SETTINGS</Link></li>
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
