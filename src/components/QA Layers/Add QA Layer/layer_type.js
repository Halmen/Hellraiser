
import Inferno from 'inferno';
import Component from 'inferno-component';
import {removeElement,isJSONObject,isArrayOfBools,isArrayOfReals,isArrayOfIntegers,isArrayOfStrings,isArrayOfJSONObjects,isArrayOfJSONArrays} from "./../../../utils/Validator";
import $ from "jquery";







class LayerType extends Component {

    constructor(props) {
        super(props);
       
       
     
       
        let priority=props.layer+"_prio";
        let visible=props.layer+"_visib";
        let id=props.layer+"_id";
        let layername=props.layer+"_layerName";
        let description=props.layer+"_description";
        
        
        this.state = {
           
            [layername]: sessionStorage.getItem(layername),
            [description]: sessionStorage.getItem(description),
            [priority] : sessionStorage.getItem(priority),
            [visible]  : sessionStorage.getItem(visible)===null?'none':sessionStorage.getItem(visible),
            [id] : sessionStorage.getItem(id),
            dialog: false
           
      

        };

        this.Configuration = this.Configuration.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this,props.layer,props.alias);
        this.Validator=this.Validator.bind(this);
        this.closePop=this.closePop.bind(this);
        this.invalid=[];
        this.json=null;
      


    }

    closePop(){
        
    
         this.setState({
                
                         dialog: false
                });
        
    }
        
     handleClear() {
        
        for(let i in this.state){
            
                  this.setState({
                         [i]: null
        });
        
        sessionStorage.removeItem(i);

        }
       }
       

    Configuration(props) {

        let json = props.json;
        let input = null;
        let inputs = [];
        let nr_states=null;

        
         for(let i in this.state){
                    nr_states++;
                 }
      
      for (let i in json){
        
         let data=json[i];
      
        for (let i in data) {
               
          if(i==="contents"){
              
         let  contents=data[i];
        
        
          for (let i in contents) {
              
              
             let name=props.layer+"_"+contents[i].name;
             let type=contents[i].type; 
             let required=contents[i].mandatory;
             let deprecated=contents[i].deprecated;
             let basic=contents[i].default;
             let text=type; 
             let hidden=contents[i].hidden;
             
             
             if(required)text+="-required";
             if(deprecated)text+="-deprecated";
             if(basic!=null && basic!="false")text+="   default:"+basic;
             if(hidden)text+="-hidden";
             
            
        
             
             if(nr_states<=6){
             if (type==="bool" && !required){
                 
                 this.setState({
                 [name]:sessionStorage.getItem(name)===null?'none':sessionStorage.getItem(name)       
             });
                
          
                
            } else if(type==="bool" && required){
                 
                 this.setState({
                 [name]:sessionStorage.getItem(name)===null?'':sessionStorage.getItem(name)
                 });
                 
                   
             }else{
             
              this.setState({
                     [name]:sessionStorage.getItem(name)   
                });
               
                //console.log("Dom - "+nr_states);
             }
                
               } 
             
             if(type==="integer" && required){
                 input=<input type="number" class="form-control" step="1" placeholder={text} name={name} value={this.state[name]}  id={type} onInput={this.handleInputChange} required/>;
                 
             }
             else if (type==="integer" && !required){
                 
                 input=<input type="number" class="form-control" step="1" placeholder={text} name={name} value={this.state[name]}  id={type} onInput={this.handleInputChange} />;
                 
             }else if (type==="bool" && required){
                 
                input=<select name={name}  value={this.state[name]} id={type}  onChange={this.handleInputChange} required>
                <option value="">Please select</option>
                <option value="true">true</option>
                <option value="false">false</option>    
                </select>;
                 
             }else if (type==="bool" && !required){
                 
                  input=<select name={name} value={this.state[name]} id={type}  onChange={this.handleInputChange}>
                <option value="none"> none </option>
                <option value="true">true</option>
                <option value="false">false</option>
                
                </select>;
                 
             }else if (type==="real" && required){
                 
                  input=<input type="number" class="form-control" step="any" placeholder={text} name={name} value={this.state[name]}  id={type} onInput={this.handleInputChange} required/>;
                 
             }else if (type==="real" && !required){
                  input=<input type="number" class="form-control" step="any" placeholder={text} name={name} value={this.state[name]}  id={type} onInput={this.handleInputChange} />;
                 
             }else if (type==="string" && required){
                 
                   input=<input type="text" class="form-control" value={this.state.id} placeholder={text} name={name} value={this.state[name]} id={type} onInput={this.handleInputChange} required/>;
                 
             }else if (type==="string" && !required){
                    
                     input=<input type="text" class="form-control"  placeholder={text} name={name} value={this.state[name]} id={type} onInput={this.handleInputChange} />;
                 
             }else if (type==="JSON object" && required){
                 
                  input=<input type="text" class="form-control"  placeholder={text} name={name} value={this.state[name]} id={type} onblur={this.Validator} onInput={this.handleInputChange} required/>;
                  
             }else if (type==="JSON object" && !required){
                  
               input=<input type="text" class="form-control"  placeholder={text} name={name} value={this.state[name]} id={type} onblur={this.Validator} onInput={this.handleInputChange} />;
               
              }else if (type==="array of bools" && required){  
                  
                   input=<input type="text" class="form-control"  placeholder={text} name={name} value={this.state[name]} id={type} onblur={this.Validator} onInput={this.handleInputChange} required/>;
                  
             }else if (type==="array of bools" && !required){       
                 
                  input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[name]} id={type} onblur={this.Validator} onInput={this.handleInputChange} />;
                  
             }else if (type==="array of reals" && required){  
                  
                   input=<input type="text" class="form-control" placeholder={text} name={name}  value={this.state[name]} id={type} onblur={this.Validator} onInput={this.handleInputChange} required/>;
                  
             }else if (type==="array of reals" && !required){       
                 
                  input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[name]} id={type} onblur={this.Validator} onInput={this.handleInputChange} />;
                  
             }else if (type==="array of integers" && required){  
                  
                   input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[name]} id={type} onblur={this.Validator} onInput={this.handleInputChange} required/>;
                  
             }else if (type==="array of integers" && !required){       
                 
                  input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[name]} id={type} onblur={this.Validator} onInput={this.handleInputChange} />;
                  
             }else if (type==="array of strings" && required){  
                  
                   input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[name]} id={type} onblur={this.Validator} onInput={this.handleInputChange} required/>;
                  
             }else if (type==="array of strings" && !required){       
                 
                  input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[name]} id={type} onblur={this.Validator} onInput={this.handleInputChange} />;
                  
             }else if (type==="array of JSON objects" && required){  
                  
                   input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[name]} id={type} onblur={this.Validator} onInput={this.handleInputChange} required/>;
                  
             }else if (type==="array of JSON objects" && !required){       
                 
                  input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[name]} id={type} onblur={this.Validator} onInput={this.handleInputChange} />;
                  
             }else if (type==="array of JSON arrays" && required){  
                  
                   input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[name]} id={type} onblur={this.Validator} onInput={this.handleInputChange} required/>;
                  
             }else if (type==="array of JSON arrays" && !required){       
                 
                  input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[name]} id={type} onblur={this.Validator} onInput={this.handleInputChange} />;
             }
             
              inputs.push(
                    
         <div class="row">
         
            <div class="col-sm-3">
            {contents[i].name}
             </div>
            <div class="col-sm-3">
              
                 
            {input}
                
             
             </div>
             
             <div class="col-sm-6">
            {contents[i].description}
             </div>    
            <hr/> 
            <hr/> 
            <hr/> 
          </div>
         
            );
              
              
          }
              
    
          }

        
       }
    }
        
//        for(let i in this.state){
//            console.log(i);
//        }




   return inputs;

            }
            
            
            
    handleInputChange(event) {
        
       const target = event.target;
       const value = target.value;
       const name = target.name;
       const type = target.id;




       if (type === "int") {

           let conv = Number(value);

           this.setState({
               [name]: conv
           });

       } else if (type === "real") {

           let conv = Number(value);

           this.setState({
               [name]: conv
           });


       } else {

           this.setState({

               [name]: value
           });

       }

       if (typeof(Storage) !== "undefined") {
           sessionStorage.setItem(name, value);
       } else {
           alert("Sorry, your browser does not support Web Storage...");
       }




       //       for(let i in this.state){
       //            consolee.log(i);
       //                }
   }


   Validator(event) {

       const target = event.target;
       const value = target.value;
       const name = target.name;
       const type = target.id;

       if (type == "JSON object") {

           if (!isJSONObject(value)) {

               if (!this.invalid.includes(name)) {
                   this.invalid.push(name);

               }

           } else {

               this.invalid = removeElement(this.invalid, name);


           }

       } else if (type == "array of bools") {

           if (!isArrayOfBools(value)) {


               if (!this.invalid.includes(name)) {
                   this.invalid.push(name);

               }

           } else {

               this.invalid = removeElement(this.invalid, name);


           }


       } else if (type == "array of reals") {

           if (!isArrayOfReals(value)) {

               if (!this.invalid.includes(name)) {
                   this.invalid.push(name);

               }

           } else {

               this.invalid = removeElement(this.invalid, name);


           }

       } else if (type == "array of integers") {

           if (!isArrayOfIntegers(value)) {

               if (!this.invalid.includes(name)) {
                   this.invalid.push(name);

               }

           } else {

               this.invalid = removeElement(this.invalid, name);




           }

       } else if (type == "array of strings") {

           if (!isArrayOfStrings(value)) {

               if (!this.invalid.includes(name)) {
                   this.invalid.push(name);

               }

           } else {

               this.invalid = removeElement(this.invalid, name);



           }

       } else if (type == "array of JSON objects") {

           if (!isArrayOfJSONObjects(value)) {

               if (!this.invalid.includes(name)) {
                   this.invalid.push(name);

               }

           } else {

               this.invalid = removeElement(this.invalid, name);


           }

       } else if (type == "array of JSON arrays") {

           if (!isArrayOfJSONArrays(value)) {

               if (!this.invalid.includes(name)) {
                   this.invalid.push(name);

               }

           } else {

               this.invalid = removeElement(this.invalid, name);


           }

       }




   }


   handleSubmit(layer, alias, event) {

       var empty = require('is-empty');

       let configure = {};
       let name = this.state[layer + "_layerName"];
       let description = this.state[layer + "_description"];
       let conv = null;
       if (this.state[layer + "_visib"] !== "none") {

           conv = (this.state[layer + "_visib"] == "true");
       }
       let visible = conv;
       let id = this.state[layer + "_id"];
       let priority = this.state[layer + "_prio"];
       let type = alias[0];
       let createLayer = {};
       let data = [];


       if (!empty(this.invalid)) {
           for (let i in this.invalid) {


               let error = this.invalid[i].replace(layer + "_", "");


               this.invalid[i] = error;

           }

           alert("The following fields are invalid: " + this.invalid + " please, correct them!");

       } else {


           if (!this.state.dialog) {
               let nr_states = null;



               for (let i in this.state) {

                   if (this.state[i] !== "none" && this.state[i] !== null && i !== layer + "_layerName" && i != layer + "_description" && i != layer + "_prio" && i != layer + "_visib" && i !== layer + "_id" && i !== "dialog") {


                       let attri = i.replace(layer + "_", "");


                       if (this.state[i] == "true" || this.state[i] == "false") {

                           let conv = (this.state[i] == "true");

                           configure[attri] = conv;

                       } else {
                           configure[attri] = this.state[i];
                       }

                   }

               }




               createLayer = {
                   "execute": [{
                       "configure": configure
                   }]
               };

               if (priority) {
                   createLayer.priority = priority;
               }

               if (visible !== "none") {
                   createLayer.visible = visible;
               }

               if (id) {
                   createLayer.id = id;
               }




               data = {
                   "layer_name": name,
                   "layer_description": description,
                   "layer_type": type,
                   "layer_json": {
                       "createLayer": createLayer
                   }
               };

               this.json = JSON.stringify(data, undefined, 2);

               this.setState({

                   dialog: true
               });

           } else {


               data = JSON.parse(this.json);
               data["layer_json"] = JSON.stringify(data["layer_json"]);
               console.log(data);

               $.ajax({

                   url: 'http://"http://10.200.24.2:2000/add_qa_layer',
                   header: {
                       'content-type': 'application/json; charset=utf-8'
                   },
                   dataType: 'json',
                   type: 'POST',
                   data: data,
                   success: function(data) {
                       this.setState({
                           data: data
                       });
                   }.bind(this),
                   error: function(xhr, status, err) {
                       console.error(this.props.url, status, err.toString());
                   }.bind(this)
               });
               this.setState({

                   dialog: false
               });


           }
       }
   event.preventDefault();

   }           

        


        
   
    

    render(props) {
        
        

        return(
<div class="container">
    <br/>
    <br/>
    <div class="row main">
        <div class="main-login main-center">

            <div>
                <button class="btn btn-primary btn-lg btn-block login-button" onClick={ this.handleClear}>Clear</button>
            </div>

            <form data-toggle="validator" role="form">

                <div class="col-sm-4">
                    <div class="form-group">
                        <label>Layer Name</label>
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                <input type="text" name={props.layer+ "_layerName"} class="form-control" placeholder="string" value={this.state[props.layer+ "_layerName"]} id="string" onInput={this.handleInputChange} required/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-4">
                    <div class="form-group">
                        <label>Description</label>
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                <input type="text" name={props.layer+ "_description"} class="form-control" placeholder="string" value={this.state[props.layer+ "_description"]} id="string" onInput={this.handleInputChange} />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-4">
                    <div class="form-group">
                        <label>Priority</label>
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                <input type="int" name={props.layer+ "_prio"} class="form-control" placeholder="int" value={this.state[props.layer+ "_prio"]} id="int" onInput={this.handleInputChange} />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-4">
                    <label>Visible</label>
                    <div class="cols-sm-10">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                            <select name={props.layer+ "_visib"} value={this.state[props.layer+ "_visib"]} id="bool" onChange={this.handleInputChange}>
                                <option value="none">none</option>
                                <option value="true">true</option>
                                <option value="false">false</option>

                            </select>
                        </div>
                    </div>
                </div>

                <div class="col-sm-4">
                    <label>ID</label>
                    <div class="cols-sm-10">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                            <input type="number" name={props.layer+ "_id"} class="form-control" placeholder="int" value={this.state[props.layer+ "_id"]} id="int" onInput={this.handleInputChange} />
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <div class="row">
                    <table class="table">
                        <tbody>
                            { this.Configuration(props) ? ( this.Configuration(props)) : (

                            <div class="alert alert-danger">
                                <strong>Data not found! - get Tibor or Øystein </strong>
                            </div>

                            ) }
                        </tbody>
                    </table>
                </div>
                <div calss="container">
                    <div class="row">
                        <dialog open={this.state.dialog}>
                            <pre>       
               				{this.json}
            				</pre>

                            <div class="container-fluid">
                                <div class="row">

                                    <button type="button" class="col-sm-6 btn btn-danger custom-button-width .navbar-right" onClick={ this.closePop}>NoT CooL</button>
                                    <button type="button" class="col-sm-6 btn btn-primary custom-button-width .navbar-right" onClick={ this.handleSubmit}>CooL</button>

                                </div>
                            </div>

                        </dialog>
                    </div>
                </div>
                <br/>
                <br/>

                <div class="form-group ">
                    <button type="submit" class="btn btn-primary btn-lg btn-block login-button" onClick={ this.handleSubmit}>Register</button>
                </div>

            </form>

        </div>
    </div>
</div>

                );
    }
}

export default LayerType;
    
     