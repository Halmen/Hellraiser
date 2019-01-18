
import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import ApiService from '../../../utils/ApiService';
import JsonList from '../../../utils/jsonList';
import ComponentEdit from './qa_composite_edit'




class List_layers extends Component {
    
    
        constructor(props) {
        super(props);

        // Set default loading state to false
        this.state = {
            loading: true,
            active: null
            
            
        };
      
         this.getId = this.getId.bind(this);
         this.composite=null;
         this.id=null;
         
         
         
    }
    
    
   getId(obj) {

  const instance = obj.instance;
  const id=obj.id;
  const desc=obj.desc;
  
  this.id++;

  // Set loading state to true while data is being fetched
  // Set active state to index of clicked item
  instance.setState({
    loading: false,
    active: id,
    description:desc
   
  });
 
   
  }
  
  
  



    componentDidMount() {


        let API = "http://10.200.24.2:2000/get_qa_composites";

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
    

    
    
    

    render(props, state) {
        
        return(
                <div class="container-fluid">
                
        
        
                    <div className="row">
                    <div className="col-lg-6"> 
                        <JsonList json={state.json} url="http://10.200.24.2:2000/delete_qa_composite" event={this.getId} instance={this}/>
                       
                    </div>
                                
                    <div className="col-lg-4">
                    
                    
                    {
                        !state.loading ? (
                               
                     <ComponentEdit id={state.active} desc={state.description}  key={this.id} />
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