import Inferno, {
    linkEvent
} from 'inferno';
import Component from 'inferno-component';
import Options from '../Add QA Layer/layer_type'
import ApiService from '../../../utils/ApiService';
import './layer.css'

class Add_Layers extends Component {
    constructor(props) {

        super(props);


        this.state = {
            type: null,
            layerGroup: "none",
            layerType: "none",
            json:null
        };
        
      
        
        this.getBaseClass = this.getBaseClass.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.composites=null;
        this.id=null;
        this.alias=null;

    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let layerType = [];
        let composites = [];
        let data = this.state.json;
        let base_classes = null;
        
        this.id++;
     

        this.setState({
            [name]: value,
            
        });


     


        

        if (name === "layerGroup") {
            
            this.setState({
            layerType: "none"
        });
        
        
        
            for (let i in data.contents) {


                if (data.contents[i].name === value) {

                    let layer = data.contents[i].contents;

                    for (let i in layer) {
                        layerType.push(layer[i].name);
                        


                    }

                }

            }

            this.setState({
                type: layerType
            });

        }



        if (name === "layerType") {
            
          
            
           
                            

            for (let i in data.contents) {

                if (data.contents[i].name === this.state.layerGroup) {

                    let layer = data.contents[i].contents;


                    for (let i in layer) {

                        if (layer[i].name === value) {
                            this.alias=layer[i].knownAs;
                            base_classes = layer[i].base_classes;
                            let contents = layer[i].contents;

                            for (let i in contents) {

                                if (contents[i].name === "configure") {

                                    composites.push(contents[i]);
                                }



                            }


                        }


                    }


                }



            }


            if (base_classes) {

                let base = [];
                base = this.getBaseClass(base_classes);


                for (let i in base) {

                    composites.push(base[i]);

                }

            }
            
           


           
                this.composites=composites;
            
          

        }

    }

    getBaseClass(value, previous) {

        let data = this.state.json;
        let configure = [];
        let base_classes = null;

        if (previous) {
            configure = previous;
        }

        if (value) {
            for (let j in value) {
                for (let i in data.contents) {

                    let layers = data.contents[i].contents;


                    for (let i in layers) {


                        if (layers[i].name === value[j]) {

                            base_classes = layers[i].base_classes;
                            let contents = layers[i].contents;


                            for (let i in contents) {

                                if (contents[i].name === "configure") {
                                    configure.push(contents[i]);


                                }
                            }

                        }
                    }

                }


            }
        }

        if (base_classes === null || !base_classes) {
            return configure;
        } else {
            return this.getBaseClass(base_classes, configure);

        }




    }
       
  



componentDidMount(props) {
    
let API = "http://10.200.24.2:2000/get_latest_documentation";


 
        ApiService.getJson(API)
                .then(
                        res => {
                          
                            this.setState({
                                json: JSON.parse(res.documentation)
                            });
                        },
                        error => {
                           
                            this.setState({
                                error: error
                            });
                        }
                );
}

render(state) {


return (
<div class="container">
   <div class="row main">
      <div class="main-login main-center">
         <div class="col-sm-4" >
            <label for="username" class="cols-sm-2 control-label">Layer Group</label>
            <div class="cols-sm-10">
               <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                  <select name="layerGroup" value={this.state.layerGroup}  onChange={ this.handleInputChange}>
                     {this.state.json?
                     this.state.json.contents.map((val) => (     
                        <option value = { val.name  } > { val.name} </option>
                        ))        
                        :<option value = "" > No data!!! </option> 
                        }  
                     <option value="none"> none </option>
                  </select>
               </div>
            </div>
         </div>
         <div class="col-sm-4">
            {
            this.state.type ? (
            <div class="input-group">
               <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>                                   
               <select name="layerType" value={this.state.layerType}  onChange={this.handleInputChange}>       
                  {
                  this.state.type.map((val) => (
                  <option value={val}>{val}</option>
                  ))
                  }
                 <option value="none"> none </option>
               </select>
            </div>
            ) : (
            null
            )
            }
         </div>
      </div>
      <div>
         {
         this.composites? (  
         <Options json={this.composites} layer={this.state.layerType} alias={this.alias} key={this.id}/>
         ):(
         null
         )
         }
      </div>
   </div>
</div>
);
}
}
export default Add_Layers;
