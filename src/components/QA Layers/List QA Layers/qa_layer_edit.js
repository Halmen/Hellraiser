
import Inferno from 'inferno';
import Component from 'inferno-component';
import $ from "jquery";
import {removeElement, isJSONObject, isArrayOfBools, isArrayOfReals, isArrayOfIntegers, isArrayOfStrings, isArrayOfJSONObjects, isArrayOfJSONArrays} from "./../../../utils/Validator";
import '../input.css'

class LayerEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialog: false
        };
        
        this.Configuration = this.Configuration.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Validator=this.Validator.bind(this);
        this.closePop=this.closePop.bind(this);
        this.getVal = this.getVal.bind(this);
        this.id = props.id;
        this.js=props.json;
        this.alias=null;
        this.invalid=[];
        

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
        
        

        }
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
   
    getVal(json) {


        let layor = json;
        let id = this.id;

        for (let i in layor) {

            if (id === layor[i].name) {

                let object = layor[i];

                for (let i in object.qa_layer_initialize.createLayer.execute) {

                    let execute = object.qa_layer_initialize.createLayer.execute[i];

                    for (let i in execute.configure) {
                        
                        this.setState({

                            [i]: execute.configure[i]
                            
                        });


                    }


                }

            }



        }
    }

    Configuration(props) {
        
     

        let json = props.config;
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
              
              
             let name=contents[i].name;
             let type=contents[i].type; 
             let required=contents[i].mandatory;
             let deprecated=contents[i].deprecated;
             let basic=contents[i].default;
             let text=type; 
             let hidden=contents[i].hidden;
             
             
             if(required)text+="-required";
             if(deprecated)text+="-deprecated";
             if(basic!==null && basic!=="false")text+="   default:"+basic;
             if(hidden)text+="-hidden";
             
            
        
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
                    
       <div class="container-fluid">            
         <div class="row">
         
         
            <div class="col-xs-6">
              
             <lable>{name}</lable>    
            {input}
                
             
             </div>
             
             <div class="col-xs-6">
            {contents[i].description}
             </div>    
            <hr/> 
            <hr/> 
            <hr/> 
            
          </div>
         </div>
         
            );
              
              
          }
              
    
          }

        
       }
    }
    




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
            
            
    handleSubmit(layer, event) {

       var empty = require('is-empty');

       let configure = {};
       let name = this.state.name;
       let description = this.state.description;
       let conv = null;
       if (this.state.visib !== "none") {

           conv = (this.state.visib == "true");
       }
       let visible = conv;
       let id = this.state.id;
       let priority = this.state.prio;
       let type = this.alias;
       let createLayer = {};
       let data = [];
       let oldname=this.id;


       if (!empty(this.invalid)) {
        
           alert("The following fields are invalid: " + this.invalid + " please, correct them!");

       } else {


           if (!this.state.dialog) {
               let nr_states = null;



               for (let i in this.state) {

                   if (this.state[i] !== "none" && this.state[i] !== null && i !== "name" && i != "description" && i != "prio" && i != "visib" && i !=="id" && i !== "dialog") {


                       let attri = i


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
                   "old_layer_name": oldname,
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

                   url: 'http://"http://10.200.24.2:2000/edit_qa_layer',
                   header: {
                       'content-type': 'application/json; charset=utf-8'
                   },
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
               this.setState({

                   dialog: false
               });


           }
       }
        event.preventDefault();

   }   
   
   
    componentDidMount() {
        
        let layor = this.js;
        let id = this.id;

        for (let i in layor) {
            
            
            if (id === layor[i].name) {
                
                this.alias=layor[i].type;
                this.setState({

                            name : layor[i].name,
                            description : layor[i].description,
                            prio: layor[i].priority,
                            visib: layor[i].visible,
                            id: layor[i].id
                            
                        });

                let object = layor[i];

                for (let i in object.qa_layer_initialize.createLayer.execute) {

                    let execute = object.qa_layer_initialize.createLayer.execute[i];

                    for (let i in execute.configure) {
                        
                        this.setState({

                            [i]: execute.configure[i]
                            
                        });


                    }


                }

            }



        }
     }


    render(props) {


        return(
                
              <div class="container-full">  
                <div class="row">
                 <div className="col-lg-12"> 
               
                   
                   
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
                                <input type="text" name="name" class="form-control" placeholder="string" value={this.state.name} id="string" onInput={this.handleInputChange} required/>
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
                                <input type="text" name= "description" class="form-control" placeholder="string" value={this.state.description} id="string" onInput={this.handleInputChange} />
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
                                <input type="int" name="prio" class="form-control" placeholder="int" value={this.state.prio} id="int" onInput={this.handleInputChange} />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-4">
                    <label>Visible</label>
                    <div class="cols-sm-10">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                            <select name="visib" value={this.state.visib} id="bool" onChange={this.handleInputChange}>
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
           
                    <table class="table">
                        <tbody>
                        
                            { (this.Configuration(props)) ? ( this.Configuration(props)) : (

                            <div class="alert alert-danger">
                                <strong>Data not found! - get Tibor or Øystein </strong>
                            </div>

                            ) }
                        </tbody>
                    </table>
                    
                    
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

export default LayerEdit;

     