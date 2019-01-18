import Inferno, {
    linkEvent
} from 'inferno';
import Component from 'inferno-component';
import ApiService from "../../../utils/ApiService";
import $ from "jquery";


class Add_Composite extends Component {
    constructor(props) {

        super(props);


        this.state = {

            name: sessionStorage.getItem("compName"),
            description: sessionStorage.getItem("compDesc"),
            layer0 : "none", 
            layers : []
        };

       
     
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.layers=[];
        this.layer_id=null;
        this.layer_list=[];
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const id =target.id;
        let list=this.state.json;
;
         
   
      

           this.setState({
            [name]: value,
            
        })
           
            if((id=="layer")&&(!this.layer_list.includes(name))){
                
            
           this.layer_id++;
           
           
        
        
           
        let layer=
               
             <div class="col-sm-2 col-md-offset-2">    
            <div class="input-group">
             <select name={"layer"+this.layer_id} id="layer" value={this.state["layer"+this.layer_id]} onChange={this.handleInputChange}>  
               <option value="none"> none </option>
                  {
                  list.map((val) => (
                  <option value={val.name}>{val.name}</option>
                  ))
                  }
                 
               </select>
               </div>
               </div>; 
               
              
               
           this.layers.push(layer);
            this.setState({
            ["layer"+this.layer_id]: "none",
            layers:this.state.layers.concat(layer)
            })
           this.layer_list.push(name);
           
//           for (let i in this.state){
//           console.log(i);
//            
//            }
//            console.log("-------------");
           
       } else if(id!=="layer"){



        if (typeof(Storage) !== "undefined") {
            sessionStorage.setItem(name, value);
        } else {
            alert("Sorry, your browser does not support Web Storage...");
        }


        

       
        }       
          
        
        
        


    }
    
    
    
    handleSubmit(event) {
    
 
   let data=null;
   const composite_name=this.state.name;
   const composite_description=this.state.description;
   let layers_in_composite=[];
   var empty = require('is-empty');
   
        for(let i in this.state){
           
                if(this.state[i]!=="none" && i!=="json" &&  this.state[i]!==null && i!=="name" && i!=="description"){
                    
                    
                    
                 layers_in_composite.push(this.state[i]);
             
                        
            
       
        }
    }
    
   // console.log(layers_in_composite);
     
     
     if(empty(layers_in_composite)){
         
         alert("Please add a layer!");
         
         
     }else{
     
      
            
  
        
        
         data={"composite_name": composite_name,
                    "composite_description": composite_description,
                    "layers_in_composite":layers_in_composite 
            };
            
         
      $.ajax({
      url: 'http://10.200.24.2:2000/add_qa_composite',
      header: {'Content-Type': 'application/json'},
      dataType: 'json',
      type: 'POST',
      data: data,
      traditional: true,
      success: function(data) {
        console.log(data.message);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    

       
  event.preventDefault();
  
        }
}   
    
   componentDidMount() {


        let API = "http://10.200.24.2:2000/get_qa_layers";

        ApiService.getJson(API)
                .then(
                        res => {
                            // Set state with fetched json list
                            this.setState({
                                json: res
                            });
                        },
                        error => {
                            // An error occurred, set state with error
                            this.setState({
                                error: error
                            });
                        }
                );
                

    }
    
    

render(state) {



return (
    <div class="container">
        <form data-toggle="validator" role="form">
                 <div class="col-sm-6">
                    <div class="form-group">
                        <label>Composite Name</label>
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                <input type="text" name="name" class="form-control" placeholder="string" value={this.state.name} id="string" onInput={this.handleInputChange} required/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-6">
                    <div class="form-group">
                        <label>Description</label>
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                <input type="text" name="description" class="form-control" placeholder="string" value={this.state.description} id="string" onInput={this.handleInputChange} />
                            </div>
                        </div>
                    </div>
                </div>
                
                
   <div class="col-sm-2">
            {
            this.state.json ? (
                    
            <div class="input-group">
               <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>                                   
               <select name="layer0" id="layer" value={this.state.layer0} onChange={this.handleInputChange}>  
               
               <option value="none"> none </option>
                  {
                  this.state.json.map((val) => (
                  <option value={val.name}>{val.name}</option>
                  ))
                  }
                 
               </select>
            </div>
            ) : (
            <p>Composite data missing!</p>
            )
            }
         </div>
         
               
                 { this.state.layers ? this.state.layers : null}

                
        <div class="form-group ">
                    <button type="submit" class="btn btn-primary btn-lg btn-block login-button" onClick={ this.handleSubmit}>Register</button>
                </div>
  
     </form>
   </div>
   
   

);
}
}
export default Add_Composite;
