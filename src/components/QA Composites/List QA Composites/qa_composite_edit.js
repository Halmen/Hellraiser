import Inferno from 'inferno';
import Component from 'inferno-component';
import $ from "jquery";
import ApiService from '../../../utils/ApiService';


class ComponentEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };

        this.setLayers = this.setLayers.bind(this);
        this.addLayers = this.addLayers.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this, props.id);
        this.layer_id = null;
        this.layers = [] ;
    }

    setLayers(props) {


        let composits = null;
        let layers = [];
        let value = [];


        if (this.state.json1) {
            composits = this.state.json1;


            let id = props.id;

            for (let i in composits) {


                if (id === composits[i].composite_name) {

                    value.push(<option value={composits[i].layer_name}>{composits[i].layer_name}</option>);

                }

            }


            for (let i in composits) {


                if (id === composits[i].composite_name) {
                    if (!this.state[composits[i].layer_name]) {
                        this.setState({

                            [composits[i].layer_name]: composits[i].layer_name
                        });
                    }
                    let layer =
                            <select  id="layer" name={composits[i].layer_name} value={this.state[composits[i].layer_name] }  onChange={this.handleInputChange}>  
                            
                                {value}
                                <option value="none"> Delete </option>
                            
                            </select>



                    layers.push(
                            <div class="container-fluid">            
                                <div class="row">
                            
                            
                                    <div class="col-xs-6">
                            
                            
                                        {layer}
                            
                            
                                    </div>
                            
                            
                                    <hr/> 
                            
                            
                                </div>
                            </div>
                            );
                }


            }
        }

        return layers;
    }

    addLayers() {

        let list = this.state.json2;
        
         this.setState({

            ["layer"+this.layer_id]: "none",

        });
        

        let layer =
                <select name={"layer" + this.layer_id} id="layer" value={this.state["layer" + this.layer_id]} onChange={this.handleInputChange}>  
                    <option value="none"> none </option>
                    {
                    list.map((val) => (
                                            <option value={val.name}>{val.name}</option>
                                ))
                    }
                
                </select>

        this.layers.push(
                <div class="container-fluid">            
                    <div class="row">
                
                
                        <div class="col-xs-6">
                
                
                            {layer}
                
                
                        </div>
                
                
                        <hr/> 
                
                
                    </div>
                </div>
                );


         this.layer_id++;       
         


    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;



        this.setState({

            [name]: value

        });

    }
    
    
  handleSubmit(id,event) {
    
 
   let data=null;
   let layers_in_composite=[];
   let old_composite_name=id;
   let composite_name=this.state.name;
   let composite_description=this.state.description;
   var empty = require('is-empty');
   
   
        for(let i in this.state){
           
                if(this.state[i]!=="none" && this.state[i]!=="delete" && i!=="json1" && i!=="json2" && this.state[i]!==null && i!=="name" && i!=="description" && this.state[i]!==null){
                    
                    
                    
                 layers_in_composite.push(this.state[i]);
             
                        
            
       
        }
    }
    
   
      if(empty(layers_in_composite)){
         
         alert("Please add a layer!");
         
         
     }else{
      
            
  
        
        
         data={     "old_composite_name": old_composite_name,
                    "composite_name" : composite_name,
                    "composite_description": composite_description,
                    "layers_in_composite":layers_in_composite 
            };
            
      
          
      $.ajax({
      url: 'http://"http://10.200.24.2:2000/edit_qa_composite',
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

        let API1 = "http://10.200.24.2:2000/get_qa_composites_and_layers";
        let API2 = "http://10.200.24.2:2000/get_qa_layers";

        ApiService.getJson(API1)
                .then(
                        res => {
                            // Set state with fetched json1 list
                            this.setState({
                                json1: res
                            });
                        },
                        error => {
                            // An error occurred, set state with error
                            this.setState({
                                error: error
                            });
                        }
                );

        ApiService.getJson(API2)
                .then(
                        res => {
                            // Set state with fetched json1 list
                            this.setState({
                                json2: res
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

    render(props) {


        return(
        <div class="container-full">  
         <div class="row">
                 <div className="col-lg-8"> 
                   <form data-toggle="validator" role="form"> 
                <div class="col-lg-6">
                    <div class="form-group">
                        <label>New Composite Name</label>
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                <input type="text" name="name" class="form-control" placeholder="string" value={this.state.name} id="string" onInput={this.handleInputChange} required/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
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
                   
                   
                   
                <table class="table">
                    <tbody>
                
                        { (this.setLayers(props)) ? (this.setLayers(props)) : (
                                    <div class="alert alert-danger">
                                        <strong>Data not found! - get Tibor or Øystein </strong>
                                    </div>

                            ) }
                
                    { this.layers ? this.layers : null}
                
                </tbody>
                
                <button type="button" class="btn btn-success" onClick={this.addLayers}>+</button>
                </table>

                <div class="form-group ">
                    <button type="submit" class="btn btn-primary btn-lg btn-block login-button" onClick={ this.handleSubmit}>Update</button>
                </div>
                    </form>
                   </div>   
                   <div className="col-lg-4"> 
                   
                <h3>{props.desc}</h3>
                   </div>
                   </div>
                 </div>

                );
    }
}

export default ComponentEdit;






































