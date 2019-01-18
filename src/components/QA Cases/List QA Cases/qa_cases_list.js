
import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import ApiService from '../../../utils/ApiService';
import JsonList from '../../../utils/jsonList';
import CaseHandler from './qa_casese_list_handle'





        class List_composite extends Component {

    constructor(props) {
        super(props);

        // Set default loading state to false
        this.state = {
            loading: true,
            active: null


        };

        this.getId = this.getId.bind(this);
        this.getObj = this.getObj.bind(this);
        this.composite = null;
        this.id = null;



    }

    getId(obj) {

        const instance = obj.instance;
        const id = obj.id;
        const desc = obj.desc;

        this.id++;

        // Set loading state to true while data is being fetched
        // Set active state to index of clicked item
        instance.setState({
            loading: false,
            active: id,
            description: desc

        });



    }

    getObj(state) {
        let object = null;
        if (state.json2 && state.active)
            for (let i of state.json2) {
                if (state.active === i.name) {
                    object = i;
                }
            }
        if (object) {
            this.composite = object;

        }
    }

    componentDidMount() {

         let API1 = "http://10.200.24.2:2000/get_latest_documentation";
        let API2 = "http://10.200.24.2:2000/get_qa_composites_and_layers";
        let API3 = "http://10.200.24.2:2000/get_qa_cases";
        let API4 = "http://10.200.24.2:2000/get_qa_layers";
        let APIs = [API1, API2, API3, API4];

        for (let i in APIs) {

            ApiService.getJson(APIs[i])
                    .then(
                            res => {

                                this.setState({
                                    ['json' + i]: res
                                });
                            },
                            error => {
                                // An error occurred, set state with error
                                this.setState({
                                    ['error' + i]: error
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
                            <JsonList json={state.json2} url="http://10.200.24.2:2000/delete_qa_case" event={this.getId} instance={this}/>
                
                        </div>
                
                        <div className="col-lg-6">
                            {this.getObj(state)}
                
                            {
                                !state.loading ? (
                                    <CaseHandler master_js={state.json0} layer_js={state.json4} selected={this.composite} key={this.id} composite_layer_js={state.json1}/>
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


export default List_composite;