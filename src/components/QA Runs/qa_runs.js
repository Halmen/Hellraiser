import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import Add from './Add QA Run/qa_runs_add';
import List from './List QA Runs/qa_runs_list'
import ApiService from '../../utils/ApiService';
import { Link } from 'inferno-router';
import '../../sidetab.css';

export const Qa_runs = ({children})=> (
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-2">
                <nav class="nav-sidebar">
                    <ul class="nav tabs">
                        <li><Link to="/qa_runs/list_qaruns">LIST QA RUNS</Link></li>
                        <li><Link to="/qa_runs/add_qaruns">ADD QA RUN</Link></li>
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
