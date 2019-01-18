import Inferno, { linkEvent } from 'inferno';
import '../../sidetab.css';
import { Link } from 'inferno-router';
import ApiService from '../../utils/ApiService';

let API1 = "http://10.200.24.2:2000/get_qa_oses";
let API2 = "http://10.200.24.2:2000/get_qa_result_states";
let API3 = "http://10.200.24.2:2000/get_qa_env_variables";
let APIs = [API1, API2, API3];
let instance ={};

for(let api in APIs)
{
    ApiService.getJson(APIs[api]).then(
        res =>      { instance['json' + api] = res;     },
        error =>    { instance['error' + api] = error;  }
    );
}

export const Miscellaneous = ({children}) => (
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-2">
                <nav class="nav-sidebar">
                    <ul class="nav tabs">
                        <li><Link Link to="/qa_miscelleaneous/qa_os">OPERATING SYSTEM</Link></li>
                        <li><Link to="/qa_miscelleaneous/qa_rs">QA RESULT STATES</Link></li>
                        <li><Link to="/qa_miscelleaneous/qa_ev">ENVIROMENT VARIABLES</Link></li>
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
