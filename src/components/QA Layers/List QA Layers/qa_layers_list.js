import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import ApiService from '../../../utils/ApiService';
import JsonList from '../../../utils/jsonList';
import LayerEdit from './qa_layer_edit';



class List_layers extends Component {
    
    
        constructor(props) {
        super(props);

        // Set default loading state to false
        this.state = {
            loading: true,
            active: null
            
            
        };
        
         this.getBaseClass = this.getBaseClass.bind(this);
         this.getConfig = this.getConfig.bind(this);
         this.getType = this.getType.bind(this);
         this.getId = this.getId.bind(this);
         this.composite=null;
         this.id=null;
         
         
         
    }
    
    
   getId(obj) {

  const instance = obj.instance;
  const id=obj.id;
  const desc=obj.desc;
  this.id++;
  
  instance.setState({
    loading: false,
    active: id,
    description:desc
   
  });
  
   
  }
  
  
  
  
    getType(){
        let layor=this.state.json1;
        let id=this.state.active;
        let type=null;
        for (let i in layor){
            
            if(id===layor[i].name){
              type=layor[i].type;
            }
            
            
        }
        
        return type;
        
    }

    
   
    getConfig() {
    
        let value = this.getType();
        let composites = [];
        let data = this.state.json0;
        let base_classes = null;
        
        this.id++;
     
  

            for (let i in data.contents) {

              

                    let layer = data.contents[i].contents;


                    for (let i in layer) {
                        
                        let names=[];
                        
                      layer[i].knownAs?names=layer[i].knownAs:null;
                        
                        names.push(layer[i].name);
               
                         for(let j in names){

                        if (names[j]=== value) {
                            
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
            
           


           
              this.composite=composites;
            
          

      

    }
    
    
    
    getBaseClass(value, previous) {

        let data = this.state.json0;
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
    
    componentDidMount() {


        let API1 = "http://10.200.24.2:2000/get_latest_documentation";
        let API2 = "http://10.200.24.2:2000/get_qa_layers";
        let APIs=[API1,API2];
        
            for(let i in APIs){
   
    
        ApiService.getJson(APIs[i])
                .then(
                        res => {
                          if(i==0){
                               res=JSON.parse(res.documentation)
                                }
                                
                            this.setState({
                                ['json'+i]: res
                            });
                        },
                        error => {
                            // An error occurred, set state with error
                            this.setState({
                                ['error'+i]: error
                            });
                        }
                );


      
                }
    }
    
    
    

    render(props, state) {
        
        return(
                <div class="container-fluid">
                
        
        
                    <div className="row">
                    <div className="col-lg-6"> 
                        <JsonList json={state.json1} url="http://10.200.24.2:2000/delete_qa_layer" event={this.getId} instance={this}/>
                       
                    </div>
                                
                    <div className="col-lg-6">
                    
                       
                       {
                        !state.loading && state.json1? (
                      this.getConfig(),          
                     <LayerEdit json={state.json1} id={state.active} desc={state.description} config={this.composite} key={this.id} />
                        ) : (
                      <p class="bg-primary"><h2>Click on an item</h2></p>
                     )
                        }         
                                
                    </div>
                    </div>
                    
                    
                    
                </div>

                );
    }
}
    

export default List_layers;