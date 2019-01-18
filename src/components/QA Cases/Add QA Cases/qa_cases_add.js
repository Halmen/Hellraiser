
import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import {removeElement} from "./../../../utils/Validator";
import {getCompositeLayers, getComposite} from '../../../utils/JsonParser';
import {CommandBatch} from '../../../utils/Objects/CommandBatch'
import {InitializeCommand} from '../../../utils/Objects/InitializeCommand'
import {RunCommand} from '../../../utils/Objects/RunCommand'
import Toolbar from './../toolbar.js'
import Configurations from './../qa_cases_edit'
import update from 'immutability-helper';
import $ from "jquery";
import ApiService from '../../../utils/ApiService';




class Qa_cases_add extends Component {


constructor(props) {
super(props);
        this.state = {
                composite:"none",
                composites:null,
                layer:"none",
                composite_command:"none",
                layer_command:"none",
                selected: null,
                active: null,
                id: null,
                json0: null,
                json1: null



        };
        this.composites = null;
        this.commands = null;
        this.layers = null;
        this.layer = null;
        this.layer_commands = null;
        this.composite_command = null;
        this.layer_command = null;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleCommandBatch = this.handleCommandBatch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.batch_id = 0;
        this.init_id = - 1;
        this.run_id = - 1;
        this.init_command = null;
        this.run_command = null;
        this.batches = [];
        this.batch = null;
        this.key = 0;
        this.current = {
        type:null,
                id:null
        };
        this.invalid = [];
}



handleInputChange(event) {

const target = event.target;
        const value = target.value;
        const name = target.name;
        const id = target.id;
        this.key++;
        this.setState({

        [name]: value

        });
        
        if (name === "composite"){
            let composite = getComposite(this.composites, value);
            
        this.setState({
        selected : composite,
                active : null,
                layer : "none"
        });
}

if (name === "layer"){

        this.layer = this.state.selected.getLayer(value);
        this.layer_commands = this.layer.commands;
        
if (this.current.type === "Innit"){
    this.batch.initialize_commands[this.current.id].layer = value;
} else if (this.current.type === "Run"){
    this.batch.run_commands[this.current.id].layer = value;
}

if (value === "none"){
this.layer_command = null;
}
}


if (name == "layer_command"){

if (this.current.type === "Innit"){
this.batch.initialize_commands[this.current.id].command = value;
} else if (this.current.type === "Run"){
this.batch.run_commands[this.current.id].command = value;
}

if (value === "configure"){
this.layer_command = this.layer.configure;
} else if (value === "none"){

this.layer_command = null;
} else {
let command = this.layer.getCommand(value);
        command?this.composite_command = command.attributes:null;
}

}


if (name == "composite_command"){


if (value === "none"){

this.composite_command = null;
} else {

if (this.current.type === "Innit"){
this.batch.initialize_commands[this.current.id].command = value;
} else if (this.current.type === "Run"){
this.batch.run_commands[this.current.id].command = value;
}

let command = this.state.selected.getCommand(value);

        command?this.composite_command = command.attributes:null;
}
}

}



handleCommandBatch(event){



const target = event.target;
        const id = target.id;
        const name = target.name;
        this.key++;
        if (id === "command"){

this.commands = this.state.selected.commands;
        this.layer_command = null;
        this.setState({

        active: "command",
                layer:"none"


        });
        if (name === "run"){

let nr = "RC" + this.batch_id + this.run_id;
        this.setState({ id: nr});
        if (this.run_id === - 1){

this.run_id = 0;
        nr = "RC" + this.batch_id + this.run_id;
        this.setState({ id: nr, [nr]:{}});
        this.run_command = new RunCommand(this.run_id, nr, null, "Command", this.state.composite_command, null);
        this.batch.addRunCommand(this.run_command);
        this.current = { type:"Run", id:this.run_id};
} else{
this.setState({ [nr]:{}});
        this.batch.run_commands[this.run_id].composite_command_id = nr;
        this.batch.run_commands[this.run_id].type = "Command";
        this.current = { type:"Run", id:this.run_id};
}

} else if (name === "init"){

let nr = "IC" + this.batch_id + this.init_id;
        this.setState({ id: nr});
        if (this.init_id === - 1){
this.init_id = 0;
        nr = "IC" + this.batch_id + this.init_id;
        this.setState({ id: nr, [nr]:{}});
        this.init_command = new InitializeCommand(this.init_id, nr, null, "Command", this.state.composite_command, null);
        this.batch.addInitializeCommand(this.init_command);
        this.current = { type:"Innit", id:this.init_id};
} else{
this.setState({ [nr]:{}});
        this.batch.initialize_commands[this.init_id].composite_command_id = nr;
        this.batch.initialize_commands[this.init_id].type = "Command";
        this.current = { type:"Innit", id:this.init_id};
}
}

}

if (id === "layer"){


this.layers = this.state.selected.layers;
        this.composite_command = null;
        this.setState({

        active: "layer"

        });
        if (name === "run"){

let nr = "RL" + this.batch_id + this.run_id;
        this.setState({ id: nr});
        if (this.run_id === - 1){

this.run_id = 0;
        nr = "RL" + this.batch_id + this.run_id;
        this.setState({ id: nr, [nr]:{}});
        this.run_command = new RunCommand(this.run_id, null, nr, "Layer", this.state.layer_command, this.state.layer);
        this.batch.addRunCommand(this.run_command);
        this.current = { type:"Run", id:this.run_id};
} else{
this.setState({ [nr]:{}});
        this.batch.run_commands[this.run_id].layer_command_id = nr;
        this.batch.run_commands[this.run_id].type = "Layer";
        this.current = { type:"Run", id:this.run_id};
}

} else if (name === "init"){

let nr = "IL" + this.batch_id + this.init_id;
        this.setState({ id: nr});
        if (this.init_id === - 1){

this.init_id = 0;
        nr = "IL" + this.batch_id + this.init_id;
        this.setState({ id: nr, [nr]:{}});
        this.init_command = new InitializeCommand(this.init_id, null, nr, "Layer", this.state.layer_command, this.state.layer);
        this.batch.addInitializeCommand(this.init_command);
        this.current = { type:"Innit", id:this.init_id};
} else{
this.setState({ [nr]:{}});
        this.batch.initialize_commands[this.init_id].layer_command_id = nr;
        this.batch.initialize_commands[this.init_id].type = "Layer";
        this.current = { type:"Innit", id:this.init_id};
}
}






}

if (name === "batch_plus"){


this.batch_id++;
        this.batches.push(this.batch);
        this.batch = new CommandBatch(this.batch_id, null, null);
        this.layer_command = null;
        this.composite_command = null;
        this.init_id = - 1;
        this.run_id = - 1;
        this.setState({
        active : null,
                layer : "none"
        });
}
if (name === "batch_minus"){


if (this.batch_id !== 0){
this.batch_id--;
        let result = removeElement(this.batches, this.batch);
        this.layer_command = null;
        this.composite_command = null;
        if (result){
this.batches = result;
}
this.setState({
active : null,
        layer : "none"
});
}

}
if (name === "batch_bcw"){


if (this.batch_id > 0){

this.batch_id--;
        this.batch = this.batches[this.batch_id];
        this.layer_command = null;
        this.composite_command = null;
        this.setState({
        active : null,
                layer : "none"
        });
}
}
if (name === "batch_frw"){

if (this.batch_id !== this.batches.length - 1){
this.batch_id++;
        this.batch = this.batches[this.batch_id];
        this.layer_command = null;
        this.composite_command = null;
        this.setState({
        active : null,
                layer : "none"
        });
}
}
if (name === "init_plus"){

this.init_id++;
        this.layer_command = null;
        this.composite_command = null;
        this.init_command = new InitializeCommand(this.init_id, null, null);
        this.batch.addInitializeCommand(this.init_command);
        this.setState({
        active : null,
                layer : "none"
        });
}

if (name === "init_minus"){

if (this.init_id !== - 1){
let result = removeElement(this.batch.initialize_commands, this.batch.initialize_commands[this.init_id]);
        this.init_id--;
        this.layer_command = null;
        this.composite_command = null;
        if (result){
this.batch.initialize_commands = result;
}

this.setState({
active : null,
        layer : "none"
});
}

}
if (name === "init_bcw"){
if (this.init_id > 0){
this.init_id--;
        this.layer_command = null;
        this.composite_command = null;
        this.setState({
        active : null,
                layer : "none"
        });
}
}
if (name === "init_frw"){

if (this.init_id !== this.batch.initialize_commands.length - 1){
this.init_id++;
        this.layer_command = null;
        this.composite_command = null;
        this.setState({
        active : null,
                layer : "none"
        });
}
}
if (name === "run_plus"){
this.run_id++;
        this.run_command = new RunCommand(this.run_id, null, null);
        this.batch.addRunCommand(this.run_command);
        this.layer_command = null;
        this.composite_command = null;
        this.setState({
        active : null,
                layer : "none"
        });
}
if (name === "run_minus"){

if (this.run_id !== - 1){

let result = removeElement(this.batch.run_commands, this.batch.run_commands[this.run_id]);
        this.run_id--;
        this.layer_command = null;
        this.composite_command = null;
        if (result){
this.batch.run_commands = result;
}
this.setState({
active : null,
        layer : "none"
});
}

}

if (name === "run_bcw"){
if (this.run_id > 0){
this.run_id--;
        this.layer_command = null;
        this.composite_command = null;
        this.setState({
        active : null,
                layer : "none"
        });
}
}

if (name === "run_frw"){
if (this.run_id !== this.batch.run_commands.length - 1){
this.run_id++;
        this.layer_command = null;
        this.composite_command = null;
        this.setState({
        active : null,
                layer : "none"
        });
}
}


}


handleEditChange(obj, event){

const target = event.target;
        const value = target.value;
        const name = target.name;
        const type = target.id;
        const instance = obj.state;
        let next = null;
        if (type === "int") {

let conv = Number(value);
        next = update(this.state[this.state.id], {
        [name]:{$set: conv}

        });
} else if (type === "real") {

let conv = Number(value);
        next = update(this.state[this.state.id], {
        [name]:{$set: conv}

        });
} else {

next = update(this.state[this.state.id], {
[name]:{$set: value}
});
}

this.setState({
[this.state.id]:next
});
        instance.setState({
        [this.state.id]:next
        });
        if (typeof (Storage) !== "undefined") {
sessionStorage.setItem(name, value);
} else {
alert("Sorry, your browser does not support Web Storage...");
}




}


handleSubmit(){
var empty = require ('is-empty');
        let case_name = this.state.name;
        let case_description = this.state.description;
        let add = this.batch;
        let struct = this.batches;
        let case_json = [];
        let layer = null;
        let data = null;
        if (!struct.includes(add)){
struct.push(add);
}


//     console.log(struct);
//    
//     console.log(this.state);
if (!case_name){
alert("Don't be anonymus.... :P , please enter a name !!1 ");
} else{
if (!empty(this.invalid))  {
for (let i in this.invalid) {


let error = this.invalid[i].replace(layer + "");
        this.invalid[i] = error;
}

alert("The following fields are invalid: " + this.invalid + " please, correct them!");
} else{



for (let i of struct){

let initialize = [];
        let run = [];
        if (!empty(i.initialize_commands)){

for (let j of i.initialize_commands){


let current = {};
        let config = {};
        let current_id = null;
        j.composite_command_id? current_id = j.composite_command_id : current_id = j.layer_command_id;
        if (j.layer){

current = {QACommandType:"Layer",
        QALayerName:j.layer,
}

} else{

current = {QACommandType:"Composite"}
}


for (let k in this.state){

if (k === current_id){

for (let s in this.state[k]){

let key = s.replace(current_id, "");
        config[key] = this.state[k][s];
}
}
}



current.QACommands = [
{
[j.command] : config
}
]



        initialize.push(current);
}
}
if (!empty(i.run_commands)){

for (let j of i.run_commands){


let current = {};
        let config = {};
        let current_id = null;
        j.composite_command_id? current_id = j.composite_command_id : current_id = j.layer_command_id;
        if (j.layer){

current = {QACommandType:"Layer",
        QALayerName:j.layer,
}

} else{

current = {QACommandType:"Composite"}
}


for (let k in this.state){

if (k === current_id){

for (let s in this.state[k]){

let key = s.replace(current_id, "");
        config[key] = this.state[k][s];
}
}
}



current.QACommands = [
{
[j.command] : config
}
]



        run.push(current);
}
//                console.log(initialize);
//                console.log(run);
}



case_json.push({initialize, run});
        console.log(case_json);
}

// event.preventDefault();

data = {
"case_name" : case_name,
        "case_description": case_description,
        "case_json":case_json,
        "composite_name":this.state.composite

}


let json = JSON.stringify(data, undefined, 2);
        data = JSON.parse(json);
        data["case_json"] = JSON.stringify(data["case_json"]);
        console.log(data);
        $.ajax({
        url: "http://10.200.24.2:2000/add_qa_case",
                header: {'Content-Type': 'application/json'},
                dataType: 'json',
                type: 'POST',
                data: data,
                success: function(data) {
                console.log(data.message);
                }.bind(this),
                error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
                }.bind(this)
        });
        //console.log(this.invalid);
}
}
}

componentDidMount() {

this.batch = new CommandBatch(this.batch_id, null, null);
        let API1 = "http://10.200.24.2:2000/get_latest_documentation";
        let API2 = "http://10.200.24.2:2000/get_qa_composites_and_layers";
        let APIs = [API1, API2];
       
        for (let i in APIs){

ApiService.getJson(APIs[i])
        .then(
                res => {

                this.setState({
                ['json' + i]: res
                });
                },
                error => {
                // An error occurred, set state with error
                this.setState({
                ['error' + i]: error
                });
                }
        );
}



}


render(props, state) {
if (this.state.json0 && this.state.json1){
this.composites = getCompositeLayers(this.state.json0, this.state.json1);
}
        return(
<div class="container-full">  
    <div class="row">
        <div class="col-md-5">
            <div class="col-sm-3">
                <div class="form-group">
                    <label>Case Name</label>
                    <div class="cols-sm-10">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                            <input type="text" name="name" class="form-control" placeholder="string" value={this.state.name} id="string" onInput={this.handleInputChange} required/>
                        </div>
                    </div>
                </div>

                {this.state.active === "command"?(
                <div>
                    <label>Select Composite command</label>

                    <select name="composite_command" value={this.state.composite_command}  onChange={this.handleInputChange}>  

                        <option value="none"> none </option>
                        {this.commands?

                        this.commands.map((val) => (
                        <option value={val.name}>{val.name}</option>
                                )):<option value="">No data,sorry</option>
                        }                  
                    </select>    
                </div>

                        ):this.state.active === "layer"?(
                <div>
                    <label>Select Layer</label>

                    <select name="layer" value={this.state.layer} onChange={this.handleInputChange}>  

                        <option value="none"> none </option>
                        {this.layers?
                this.layers.map((val) => (
                        <option value={val.name}>{val.name}</option>
                        )):<option value="">No data,sorry</option>
                        }
                    </select>    
                </div>


                ):null}     

            </div>




            <div class="col-sm-5">
                <div class="form-group">
                    <label>Description</label>
                    <div class="cols-sm-10">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                            <input type="text" name="description" class="form-control" placeholder="string" value={this.state.description} id="string" onInput={this.handleInputChange} />
                        </div>
                    </div>
                </div>

                {this.state.layer !== "none"?(
                <div>
                    <label>Select  Layer  Command</label>

                    <select name="layer_command" value={this.state.layer_command} onChange={this.handleInputChange}>  

                        <option value="none"> none </option>
                        <option value="configure"> configure </option>
                        {this.layer_commands?
                         this.layer_commands.map((val) => (
                        <option value={val.name}>{val.name}</option>
                        )):<option value="">No data,sorry</option>
                        }
                    </select>    
                </div>


                ):null} 






            </div>


            <div class="input-group col-sm-3">
                <div class="form-group">
                    <label>Composites</label>

                    <select name="composite"  value={this.state.composite} onChange={this.handleInputChange}>  

                        <option value="none"> none </option>
                        {
                this.composites?
                this.composites.map((val) => (
                        <option value={val.name}>{val.name}</option>
                        )): <option value="">No data,sorry</option>

                        }

                    </select>
                </div>

            </div>
            <form data-toggle="validator" role="form"> 
                <br>
                </br>
                {

                this.layer_command?<Configurations attr={this.layer_command} id={this.state.id} key={this.key} invalid={this.invalid} instance={this}  handleInputChange={this.handleEditChange}/>:this.composite_command?<Configurations attr={this.composite_command} id={this.state.id} key={this.state.key} invalid={this.invalid} instance={this} handleInputChange={this.handleEditChange} />:null

                }
                <button type="submit" class="btn btn-primary btn-lg btn-block login-button" onClick={this.handleSubmit}>Register</button>
            </form>    

        </div>




        <div class="col-md-5">   
            {this.state.selected?<Toolbar  handleCommandBatch={this.handleCommandBatch} name={this.state.selected.name} batch_id={this.batch_id} init_id={this.init_id} run_id={this.run_id} />:null}


        </div>



    </div>


</div>

                );
}
}


export default Qa_cases_add;