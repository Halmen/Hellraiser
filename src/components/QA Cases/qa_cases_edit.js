import Inferno, { linkEvent } from 'inferno';
import update from 'immutability-helper';
import Component from 'inferno-component';
import $ from "jquery";
import {removeElement, isJSONObject, isArrayOfBools, isArrayOfReals, isArrayOfIntegers, isArrayOfStrings, isArrayOfJSONObjects, isArrayOfJSONArrays} from "./../../utils/Validator";


class CaseEdit extends Component {

    constructor(props) {
        super(props);

        this.state={
            
          [props.id]:{}
     
         };

        this.handleClear = this.handleClear.bind(this);
        this.Validator = this.Validator.bind(this,props.invalid);
       
        this.Configuration = this.Configuration.bind(this);
        this.id=props.id;
       

    }

    handleClear() {
         let clear=null;
        
        for (let i in this.state[this.id]) {
            
           

           this.setState({
               
                [this.id]: {
                    [i]:null
                }
            });    

            sessionStorage.removeItem(i);

        }
       


    }

    Validator(invalid,event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        const type = target.id;

        if (type == "JSON object") {

            if (!isJSONObject(value)) {

                if (!invalid.includes(name)) {
                    invalid.push(name);

                }

            } else {

                invalid = removeElement(invalid, name);


            }

        } else if (type == "array of bools") {

            if (!isArrayOfBools(value)) {


                if (!invalid.includes(name)) {
                    invalid.push(name);

                }

            } else {

                invalid = removeElement(invalid, name);


            }


        } else if (type == "array of reals") {

            if (!isArrayOfReals(value)) {

                if (!invalid.includes(name)) {
                    invalid.push(name);

                }

            } else {

                invalid = removeElement(invalid, name);


            }

        } else if (type == "array of integers") {

            if (!isArrayOfIntegers(value)) {

                if (!invalid.includes(name)) {
                    invalid.push(name);

                }

            } else {

                invalid = removeElement(invalid, name);




            }

        } else if (type == "array of strings") {

            if (!isArrayOfStrings(value)) {

                if (!invalid.includes(name)) {
                    invalid.push(name);

                }

            } else {

                invalid = removeElement(invalid, name);



            }

        } else if (type == "array of JSON objects") {

            if (!isArrayOfJSONObjects(value)) {

                if (!invalid.includes(name)) {
                    invalid.push(name);

                }

            } else {

                invalid = removeElement(invalid, name);


            }

        } else if (type == "array of JSON arrays") {

            if (!isArrayOfJSONArrays(value)) {

                if (!invalid.includes(name)) {
                    invalid.push(name);

                }

            } else {

                invalid = removeElement(invalid, name);


            }

        }




    }   
    

    Configuration(props) {

//console.log(props.states);
        
        let attributes = props.attr;
        let input=null;
        let inputs = [];
        let nr_states1 = null;
        let nr_states2 = null;
        
     for(let i in this.state[props.id]){
         
         nr_states1++;
     }    
        
        
     for(let i in this.state){
         
         nr_states2++;
     }
    
  

        for(let i of attributes){
            let real_name=i.name;
            let name=this.id+i.name;
            let type=i.type;
            let required=i.mandatory;
            let default_val=i.default_val;
            let hidden=i.hidden;
            let deprecated=i.deprecated;
            let text=type;
            let next=null; 
            
            
            
            if(required)text+="-required";
             if(deprecated)text+="-deprecated";
             if(default_val!==null && default_val!=="false")text+="   default:"+default_val;
             if(hidden)text+="-hidden";
            
            
                    
             if (type==="bool" && !required){
                
                 next = update(this.state[this.id], {
                 [name]: {$set: sessionStorage.getItem(name)===null?'none':sessionStorage.getItem(name)} 
                });   
                 
                 
          
                
            } else if(type==="bool" && required){
                 
                 next = update(this.state[this.id], { 
                 [name]:{$set: sessionStorage.getItem(name)===null?'':sessionStorage.getItem(name)}
                 
                 });
                 
                   
             }else{
             
                next = update(this.state[this.id], { 
                 [name]:{$set: sessionStorage.getItem(name)} 
 
                });
            
             }
      if(props.states){      
        if(nr_states2<2){
            
          
                
                for (let j in props.states){
                    
                       this.setState({        
                         [j]:props.states[j]  
                });
                    
                }
                
                
            
                
            }
        }else{
            if(nr_states1<1){
             this.setState({        
                         [this.id]:next  
                });
             
              props.instance.setState({
               [this.id]:next 
           });
                
                
            }
    }
            
            
           
            
            
              if(type==="integer" && required){
                 input=<input type="number" class="form-control" step="1" placeholder={text} name={name} value={this.state[this.id][name]}  id={type} onInput={linkEvent({state : this},props.handleInputChange)} required/>;
                 
             }
             else if (type==="integer" && !required){
                 
                 input=<input type="number" class="form-control" step="1" placeholder={text} name={name} value={this.state[this.id][name]}  id={type} onInput={linkEvent({state : this},props.handleInputChange)} />;
                 
             }else if (type==="bool" && required){
                 
                input=<select name={name}  value={this.state[this.id][name]} id={type}  onChange={linkEvent({state : this},props.handleInputChange)} required>
                <option value="">Please select</option>
                <option value="true">true</option>
                <option value="false">false</option>    
                </select>;
                 
             }else if (type==="bool" && !required){
                 
                  input=<select name={name} value={this.state[this.id][name]} id={type}  onChange={linkEvent({state : this},props.handleInputChange)}>
                <option value="none"> none </option>
                <option value="true">true</option>
                <option value="false">false</option>
                
                </select>;
                 
             }else if (type==="real" && required){
                 
                  input=<input type="number" class="form-control" step="any" placeholder={text} name={name} value={this.state[this.id][name]}  id={type} onInput={linkEvent({state : this},props.handleInputChange)} required/>;
                 
             }else if (type==="real" && !required){
                  input=<input type="number" class="form-control" step="any" placeholder={text} name={name} value={this.state[this.id][name]}  id={type} onInput={linkEvent({state : this},props.handleInputChange)} />;
                 
             }else if (type==="string" && required){
                 
                   input=<input type="text" class="form-control"  placeholder={text} name={name} value={this.state[this.id][name]} id={type} onInput={linkEvent({state : this},props.handleInputChange)} required/>;
                 
             }else if (type==="string" && !required){
                    
                     input=<input type="text" class="form-control"  placeholder={text} name={name} value={this.state[this.id][name]} id={type} onInput={linkEvent({state : this},props.handleInputChange)} />;
                 
             }else if (type==="JSON object" && required){
                 
                  input=<input type="text" class="form-control"  placeholder={text} name={name} value={this.state[this.id][name]} id={type} onblur={this.Validator} onInput={linkEvent({state : this},props.handleInputChange)} required/>;
                  
             }else if (type==="JSON object" && !required){
                  
               input=<input type="text" class="form-control"  placeholder={text} name={name} value={this.state[this.id][name]} id={type} onblur={this.Validator} onInput={linkEvent({state : this},props.handleInputChange)} />;
               
              }else if (type==="array of bools" && required){  
                  
                   input=<input type="text" class="form-control"  placeholder={text} name={name} value={this.state[this.id][name]} id={type} onblur={this.Validator} onInput={linkEvent({state : this},props.handleInputChange)} required/>;
                  
             }else if (type==="array of bools" && !required){       
                 
                  input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[this.id][name]} id={type} onblur={this.Validator} onInput={linkEvent({state : this},props.handleInputChange)} />;
                  
             }else if (type==="array of reals" && required){  
                  
                   input=<input type="text" class="form-control" placeholder={text} name={name}  value={this.state[this.id][name]} id={type} onblur={this.Validator} onInput={linkEvent({state : this},props.handleInputChange)} required/>;
                  
             }else if (type==="array of reals" && !required){       
                 
                  input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[this.id][name]} id={type} onblur={this.Validator} onInput={linkEvent({state : this},props.handleInputChange)} />;
                  
             }else if (type==="array of integers" && required){  
                  
                   input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[this.id][name]} id={type} onblur={this.Validator} onInput={linkEvent({state : this},props.handleInputChange)} required/>;
                  
             }else if (type==="array of integers" && !required){       
                 
                  input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[this.id][name]} id={type} onblur={this.Validator} onInput={linkEvent({state : this},props.handleInputChange)} />;
                  
             }else if (type==="array of strings" && required){  
                  
                   input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[this.id][name]} id={type} onblur={this.Validator} onInput={linkEvent({state : this},props.handleInputChange)} required/>;
                  
             }else if (type==="array of strings" && !required){       
                 
                  input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[this.id][name]} id={type} onblur={this.Validator} onInput={linkEvent({state : this},props.handleInputChange)} />;
                  
             }else if (type==="array of JSON objects" && required){  
                  
                   input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[this.id][name]} id={type} onblur={this.Validator} onInput={linkEvent({state : this},props.handleInputChange)} required/>;
                  
             }else if (type==="array of JSON objects" && !required){       
                 
                  input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[this.id][name]} id={type} onblur={this.Validator} onInput={linkEvent({state : this},props.handleInputChange)} />;
                  
             }else if (type==="array of JSON arrays" && required){  
                  
                   input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[this.id][name]} id={type} onblur={this.Validator} onInput={linkEvent({state : this},props.handleInputChange)} required/>;
                  
             }else if (type==="array of JSON arrays" && !required){       
                 
                  input=<input type="text" class="form-control"  placeholder={text} name={name}  value={this.state[this.id][name]} id={type} onblur={this.Validator} onInput={linkEvent({state : this},props.handleInputChange)} />;
             }
             
              inputs.push(
                    
         <div class="row">
         
            <div class="col-sm-3">
            {real_name}
             </div>
            <div class="col-sm-3">
              
                 
            {input}
                
             
             </div>
              
            <hr/> 
            <hr/> 
            <hr/> 
          </div>
         
            );
              
              
         
      }
//              console.log(this.state);
               return inputs;
          
          

    }
       
    
            

    

    render(props,state) {
        
 

        return(

<div class="row">
    
             <br/>
             <br/>
             <div>
                <button class="btn btn-primary btn-lg btn-block login-button" onClick={ this.handleClear}>Clear</button>
            </div>
             <form data-toggle="validator" role="form">
             <br/>
                <br/>
                    <table class="table">
                        <tbody>
                            { this.Configuration(props) ? ( this.Configuration(props)) : (

                            <div class="alert alert-danger">
                                <strong>Data not found! - get Tibor or Øystein </strong>
                            </div>

                            ) }
                        </tbody>
                    </table>
               <br/>
               <br/>      
                    
             
                    
              </form>       
                    
                    
                    </div>
                






        );



    }
}
export default CaseEdit;