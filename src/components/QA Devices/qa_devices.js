import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import { Link } from 'inferno-router';
import ApiService from '../../utils/ApiService';
import Add from './Add QA Device/qa_devices_add';
import List from './List QA Devices/qa_devices_list'
import '../../sidetab.css';

export const Qa_devices = ({children}) => (
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-2">
                <nav class="nav-sidebar">
                    <ul class="nav tabs">
                        <li ><Link to="/qa_devices/list_qadevices">LIST QA DEVICES</Link></li>
                        <li ><Link to="/qa_devices/add_qadevices">ADD QA DEVICES</Link></li>
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
