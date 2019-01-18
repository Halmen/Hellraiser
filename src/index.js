import Inferno, {render} from 'inferno';
import {Router, Route, doAllAsyncBefore } from 'inferno-router';
import createHistory from 'history/createBrowserHistory';
import ApiService from './utils/ApiService';
import {App, NoMatch} from './App';
import {Add_settings, List_settings, Qa_settings} from './components/QA Settings/qa_settings';
import {Qa_results} from './components/QA Results/qa_results';
import General from './components/QA Results/General Filter/qa_general_filter_api';
import Diff from './components/QA Results/General Filter/diff_api';
import History from './components/QA Results/Filter by History/qa_results_filter_history';
import Delete from './components/QA Results/Delete Results/qa_results_delete';
import {Qa_runs} from './components/QA Runs/qa_runs';
import Add_run from './components/QA Runs/Add QA Run/qa_runs_add';
import List_runs from './components/QA Runs/List QA Runs/qa_runs_list'
import {Qa_composites, Comp_add, Comp_list} from './components/QA Composites/qa_composites';
import {Qa_cases} from './components/QA Cases/qa_cases';
import Qa_cases_add from './components/QA Cases/Add QA Cases/qa_cases_add';
import Qa_cases_list from  './components/QA Cases/List QA Cases/qa_cases_list';
import {Qa_layers} from './components/QA Layers/qa_layers'
import Add_layers from './components/QA Layers/Add QA Layer/qa_layers_add'
import List_layers from './components/QA Layers/List QA Layers/qa_layers_list'
import {Qa_devices} from './components/QA Devices/qa_devices'
import Qa_devices_list from './components/QA Devices/List QA Devices/qa_devices_list';
import Qa_devices_add from './components/QA Devices/Add QA Device/qa_devices_add';
import {Miscellaneous} from './components/Miscellaneous/miscellaneous'
import Environment from './components/Miscellaneous/Environment Variables/miscellaneous_env_vars';
import OS from './components/Miscellaneous/Operating Systems/miscellaneous_oses'
import RS from './components/Miscellaneous/QA Result States/miscellaneous_result_states'

import 'bootstrap/dist/css/bootstrap.css';

 
  

 


const history = createHistory();


let routes = (
        <Router history={ history }>
            <Route path="/" component={ App }>
                <Route path="/qa_results" component={ Qa_results }>
                    <Route path="/qa_results/filter_by_history" component={ History}/>
                    <Route path="/qa_results/general_filter" component={ General }>
                        <Route path="/:ids" component={ Diff } />
                    </Route>
                    <Route path="/qa_results/delete_results" component={ Delete }/>
                </Route>
                <Route path="/qa_runs" component={ Qa_runs }>
                    <Route path="/qa_runs/list_qaruns" component={ List_runs}/>
                    <Route path="/qa_runs/add_qaruns" component={ Add_run }/>
                </Route>
                <Route path="/qa_settings" component={ Qa_settings } >
                    <Route path="/qa_settings/list_qasettings"  component={ List_settings}/>
                    <Route path="/qa_settings/add_qasettings" component={ Add_settings }/>
                </Route>
                <Route path="/qa_composites" component={ Qa_composites }>
                    <Route path="/qa_composites/list_composites" component={ Comp_list}/>
                    <Route path="/qa_composites/add_composites" component={ Comp_add }/>
                </Route>
                <Route path="/qa_layers" component={ Qa_layers }>
                    <Route path="/qa_layers/list_layer" component={ List_layers }/>
                    <Route path="/qa_layers/add_layer" component={ Add_layers }/>
                </Route>
                <Route path="/qa_cases" component={ Qa_cases }>
                    <Route path="/qa_cases/qa_cases_add" component={Qa_cases_add} />
                    <Route path="/qa_cases/qa_cases_list" component={Qa_cases_list}/>
                </Route>
                <Route path="/qa_devices" component={ Qa_devices }>
                    <Route path="/qa_devices/list_qadevices" component={Qa_devices_list} />
                    <Route path="/qa_devices/add_qadevices" component={Qa_devices_add}/>
                </Route>
                <Route path="/qa_miscelleaneous" component={Miscellaneous}>
                    <Route path="/qa_miscelleaneous/qa_os" component={OS}/>
                    <Route path="/qa_miscelleaneous/qa_rs" component={RS}/>
                    <Route path="/qa_miscelleaneous/qa_ev" component={Environment}/>
                </Route>
                <Route path="*" component={ NoMatch } />
            </Route>
        </Router>
        );


render(routes, document.getElementById('app'));
