import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import General from './qa_results_filter_general';
import ApiService from './../../../utils/ApiService';







class General_filter_api extends Component {

    constructor(props) {     
        super();
        
         this.state = {
               json0:null,
               json1:null

        };
        
    }
    
    
    
     componentDidMount() {


      
        let API1 = "http://10.200.24.2:2000/get_qa_results";
        let API2 = "http://10.200.24.2:2000/get_qa_result_states"; 
        let APIs=[API1,API2];
   

   for(let i in APIs){
   
    
        ApiService.getJson(APIs[i])
                .then(
                        res => {
                            // Set state with fetched json1 list
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

    render(state) {

        return(
                <div>
                { this.state.json0 && this.state.json1?                    
                      < General result={this.state.json0} states={this.state.json1}/>
                      :(
                     <div>
                        <h1>Loading.........</h1>
                        <h3>Ehhh if you can read this, than it's not found</h3>
                     </div>) 
                }                                       
                                                       
                </div>                                       
                                    );
                        }
                    }

                    export default General_filter_api;