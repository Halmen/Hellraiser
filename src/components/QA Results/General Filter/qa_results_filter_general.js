import Inferno from 'inferno';
import Component from 'inferno-component';
import $ from "jquery";
import Diff from './diff'

function removeElement(array, value) {
    let index = -1;
    for (let i in array) {
        index = (value === Object.keys(array[i])[0]) ? i : -1;
    }

    if (index > -1) {
        array.splice(index, 1);
        return array;
    } else
        return array;


}

class General_filter extends Component {

constructor(props) {
super(props);
        this.state = {
                devices:[],
                composites:[],
                runs:[],
                result_states:[],
                device:"none",
                composite:"none",
                run:"none",
                result_state:"none",
                data_list :[]

        };
        this.devices = [];
        this.composites = [];
        this.runs = [];
        this.states = [];
        this.filters = [];
        this.list = [];
        this.response = [];
        this.count = 0;
        this.changed_state = null;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChange2 = this.handleInputChange2.bind(this);
        this.setInput = this.setInput.bind(this, props.result, props.states);
        this.Filter = this.Filter.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.handlePush = this.handlePush.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.buttonHandle = this.buttonHandle.bind(this);
        

        
        }
        
loadMore(){
          
          let list = [];
           var empty = require('is-empty');
          if(!empty(this.state.data)){
          for ( let i = 0; i<500; i++){
              if(i<this.state.data.length){
            list.push(<tr class= {this.state.data[i].state==="MATCHING_BLUEPRINT"?'success':this.state.data[i].state==="NOT_MATCHING_BLUEPRINT"?'danger':this.state.data[i].state==="CURRENT_BLUEPRINT"?'info':this.state.data[i].state==="OLD_BLUEPRINT"?'info':this.state.data[i].state==="WTF"?'warning':this.state.data[i].state==="WTF_SOLVED"?'active':null} bgcolor = {this.state.data[i].state==="IGNORED"?'#4c4c4c':this.state.data[i].state==="AUTO_IGNORED"?'#4c4c4c':null}>
                     <td><select name={"action_" + this.state.data[i].result_id}  id = {this.state.data[i].result_id}  value={this.state["action_" + this.state.data[i].result_id]} onChange={this.handlePush}>
                            <option value="">Select</option>
                            <option value="blueprint">BLUEPRINT</option>
                            <option value="old_blueprint">OLD_BLUEPRINT</option>
                            <option value="other"> Compare it with other </option>
                         </select>
                         {this.state.data[i].state==="NOT_MATCHING_BLUEPRINT"?
                         <select name={"action_" + this.state.data[i].result_id}  id = {this.state.data[i].result_id}  value={this.state["action_" + this.state.data[i].result_id]} onChange={this.handleStateChange}>
                            <option value="">Change state</option>
                            <option value="CURRENT_BLUEPRINT">CURRENT_BLUEPRINT</option>
                            <option value="IGNORED">IGNORE</option>
                         </select>:null}</td>
                         
                     <td>{this.state.data[i].result_id}</td>
                     <td>{this.state.data[i].state}</td>
                     <td> <a target="_blank" href={this.state.data[i].changes_url}>{this.state.data[i].revision}</a></td>
                     <td>{this.state.data[i].timestamp}</td>
                     <td>{this.state.data[i].device_name}</td>
                     <td>{this.state.data[i].run_name}</td>
                     <td>{this.state.data[i].composite_name}</td>
                    </tr>,
                    this.state["change_" + this.state.data[i].result_id]?
                    <tr>
                    <td><p>Add comment</p></td>
                    <td><button type="button" class="btn btn-secondary" name="cancel" value="change_" id={this.state.data[i].result_id} onClick={this.buttonHandle}>Cancel</button></td>
                    <td><input type="text" class="form-control"   name={"change_" + this.state.data[i].result_id}  id = {this.state.data[i].result_id} value={this.state["change_" + this.state.data[i].result_id]}   onInput={this.handleInputChange2} /></td>
                    <td><button type="button" class="btn btn-info" name="ok" value="change_" id={this.state.data[i].result_id} onClick={this.buttonHandle}>Ok</button></td>  
                    </tr>:null,
                    this.state["other_" + this.state.data[i].result_id]?
                    <tr>
                    <td><p>Insert the desired results ID to diff against:</p></td>
                    <td><button type="button" class="btn btn-secondary" name="cancel" value="other_" id={this.state.data[i].result_id} onClick={this.buttonHandle}>Cancel</button></td>
                    <td><input type="number" class="form-control"   name={"other_" + this.state.data[i].result_id}  id = {this.state.data[i].result_id} value={this.state["other_" + this.state.data[i].result_id]}   onInput={this.handleInputChange2} /></td>
                    <td><button type="button" class="btn btn-info" name="ok" value="other_" id={this.state.data[i].result_id} onClick={this.buttonHandle}>Ok</button></td>  
                    </tr>:null
                    
                    );
            
       
              
          }
      }
      }
         
          
          
        return list;
      }        

Filter(){
        let query = {};
        let response = [];
        let keys = []; 
        let flag = false;
        for(let i of this.filters){    
            query[Object.keys(i)[0]] = Object.values(i)[0];
            keys.push(Object.keys(i)[0]);
            
            flag = true;
        }
        
    
    if(flag){
    $.ajax({
        url: "http://10.200.24.2:2000/get_qa_results",
        header: {'Content-Type': 'application/json'},
        dataType: 'json',
        type: 'GET',
        data: query,
        success: function(data) {
            
           let device = true;
           let run = true;
           let composite = true;
           let state = true;
           
           for (let i of keys){
               i==="device"?device=false:
               i==="run"?run=false:
               i==="composite"?composite=false:
               i==="state"?state=false:
               null;
           }
            
            this.setInput(device,run,composite,state,data);
 
         
        }.bind(this),
        error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        }.bind(this)
        });
        
    }
    
    
      }
      
handleStateChange(event){
    const target = event.target;
    const id = target.id;
    const name = target.name;
    const value = target.value;
    
    let change = "change_" + id;
    this.changed_state=value;
       this.setState({
             [change]: " ",
             [name]:value
        });
    
    
} 
handleInputChange2(event){
      const target = event.target;
      const value = target.value;
      let name = target.name;
    
    
    
    
    this.setState({

        [name]: value
        });
    
}


handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        let name = target.name;
        let flag = true;
        let filter = {[name]: value};
        
        if (value){
        for (let i in this.filters){
            if (Object.keys(this.filters[i])[0] === Object.keys(filter)[0]){
                this.filters[i] = filter;
                 flag = false;
             }
        }
            flag?this.filters.push(filter):null;
            } else{
            this.filters = removeElement(this.filters,  Object.keys(filter)[0]);
        }
        
        
    
        
        this.Filter();
         
         name = name==="state"?"result_state":name;
         
        this.setState({
        [name]: value
        });
        
        }
        
        
 buttonHandle(event){
     
     const target = event.target;
     const value = target.value;
     const id = target.id;
     const name = target.name; 
     
     
     
     
     
     
     if(name==="cancel"){
         
         this.setState({

        [value+id]: false
        });
         
     }else if(name==="ok"){
         if(value==="other_"){  
         
        let other=this.state[value+id];  
                
       let data = { diff_id : id,
                  diff_type :"other"};
            
      $.ajax({
      url: "http://10.200.24.2:2000/get_diff_data",
      header: {'Content-Type': 'application/json'},
      dataType: 'json',
      type: 'POST',
      data: data,
      traditional: true,
      success: function(data) {
                Inferno.render(
                <Diff diff={data}/>,
                 document.getElementById('app')
    );
      }.bind(this),
      error: function(xhr, status, err) { 
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
             
   
             
     }else if(value==="change_"){
         
            let comment =this.state[value+id];
             
            let data = {results_id: id,
            new_state: this.changed_state,
            comments: comment
        };

        $.ajax({
            url: 'http://10.200.24.2:2000/update_state',
            header: {'Content-Type': 'application/json'},
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function (data) {
                console.log(data.message);
                //eslint-disable-next-line
                location.reload();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
             
             
         }
         
         this.setState({

        [value+id]: false
        });
         
         
         
     }
     
  
 }       
 handlePush(event){
     
     const target = event.target;
     const value = target.value;
     const id = target.id;
     const name = target.name;
  
     let data = { diff_id : id,
                diff_type :value 
         
     };
     
     if(value==="other"){
         let other = "other_" + id;
         
         this.setState({
             [other]:" ",
             [name]:value
         });
         
     }else{
     
      $.ajax({
      url: "http://10.200.24.2:2000/get_diff_data",
      header: {'Content-Type': 'application/json'},
      dataType: 'json',
      type: 'POST',
      data: data,
      traditional: true,
      success: function(data) {
                Inferno.render(
                <Diff diff={data}/>,
                 document.getElementById('app')
    );
      }.bind(this),
      error: function(xhr, status, err) { 
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
     
        }






  }      


setInput(json1, json2, device_flag, run_flag, composite_flag, state_flag, new_data){
  
  if(new_data){
      json1=new_data;
      json2=new_data;
  }
  
  device_flag?this.devices=[]:null;
  run_flag?this.runs=[]:null;
  composite_flag?this.composites=[]:null;
  state_flag?this.states=[]:null;    

for (let i of json1){
if(device_flag){
if (!this.devices.includes(i.device_name)){
this.devices.push(i.device_name);
        }
 }
if(run_flag){
if (!this.runs.includes(i.run_name)){
this.runs.push(i.run_name);
        }
    }
if(composite_flag){
if (!this.composites.includes(i.composite_name)){
this.composites.push(i.composite_name);
        }
    }
}

if(new_data){
    for (let i of json2){
        if(state_flag){ 
            if(!this.states.includes(i.state)){
                this.states.push(i.state);
            }
        }
   }
}else{
for (let i of json2){
if(state_flag){    
this.states.push(i.state);
            }
        }
    }

this.setState({
        devices:this.devices,
        composites:this.composites,
        runs:this.runs,
        result_states:this.states,
        data : json1,   
        data_list : []
        });
        
        
}

componentDidMount(props) {

this.setInput(true,true,true,true,false);

        }
        





render(props) {

     return(
   <div class="container">
  <div class="row main">
    <div class="main-login main-center">

        
 
      
     
        <div class="col-sm-3" >
         <div class="form-group">
         <label for="password" class="cols-sm-2 control-label">Select QA Devices</label>
          <div class="cols-sm-10">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
               <select name="device" id="comp" value={this.state.device} onChange={this.handleInputChange} required>
                <option value=""> none</option>
                  {
                  this.state.devices.map((val) => (
                  <option value={val}>{val}</option>
                  ))
                  }
                </select>   
               </div>
          </div>
        </div> 

        
        </div>
        
        <div class="col-sm-3" >

       <div class="form-group">
         <label for="password" class="cols-sm-2 control-label">Select QA Run</label>
          <div class="cols-sm-10">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
               <select name="run" id="comp" value={this.state.run} onChange={this.handleInputChange} required>
                <option value=""> none</option>
                  {
                  this.state.runs.map((val) => (
                  <option value={val}>{val}</option>
                  ))
                  }
                </select>   
               </div>
          </div>
 
        </div>
         </div>
        
        <div class="col-sm-3" >
        
       <div class="form-group">
         <label for="password" class="cols-sm-2 control-label">Select QA Composites</label>
          <div class="cols-sm-10">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
               <select name="composite" id="comp" value={this.state.composite} onChange={this.handleInputChange} required>
                <option value="">none</option>
                  {
                  this.state.composites.map((val) => (
                  <option value={val}>{val}</option>
                  ))
                  }
                </select>   
               </div>
          </div>
 
        </div>
        
         </div>
         
        <div class="col-sm-3" >
        
        <div class="form-group">
         <label for="password" class="cols-sm-2 control-label">Select QA Result State</label>
          <div class="cols-sm-10">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
               <select name="state" id="comp" value={this.state.result_state} onChange={this.handleInputChange} required>
                <option value="">none</option>
                  {
                  this.state.result_states.map((val) => (
                  <option value={val}>{val}</option>
                  ))
                  }
                </select>   
               </div>
          </div>
 
        </div>
        
        </div>
        </div>
        
                <div class="container">
                <table class="table table-bordered table-hover">
                 <thead>
                    <tr>
                    <th>Actions</th>
                    <th>Result ID</th>
                    <th>State</th>
                    <th>Revision</th>
                    <th>Timestamp</th>
                    <th>Device</th>
                    <th>Run Name</th>
                    <th>Composite Name</th>
                    
                    </tr>
                  </thead>  
                  <tbody>
                  
                {this.state.data?
                      this.loadMore():
                    null
                }
                </tbody>
                </table>
                
                </div>
        
        </div>
   </div>

                );
    }
};
        export default General_filter;