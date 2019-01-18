import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import ApiService from '../../../utils/ApiService';
import JsonList from '../../../utils/jsonList';
import JsonDetail from '../../../utils/jsonDetail';

class List_Settings extends Component {

    getId(obj) {
        const instance = obj.instance;
        const id=obj.id;
        const desc=obj.desc;

        // Set loading state to true while data is being fetched
        // Set active state to index of clicked item
        instance.setState({
            loading: false,
            active: id,
            description:desc
        });
    };

    componentDidMount() {
        let API = "http://10.200.24.2:2000/get_qa_settings";

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

    constructor() {
        super();

        // Set default loading state to false
        this.state = {
            loading: true,
            active: null

        };
    }

    render(props, state, context) {
        console.log(props);
        return(
            <div className="App">
                <div className="col-sm-3">
                    <JsonList json={state.json} event={this.getId}  url="http://10.200.24.2:2000/delete_qa_settings" instance={this}/>
                </div>

                <div className="col-sm-9">
                    {
                        !state.loading
                        ? ( <JsonDetail json={state.json} id={state.active} desc={state.description}/> )
                        : ( <p class="bg-primary"><h2>Click on an item</h2></p> )
                    }
                </div>
            </div>
        );
    }
}

export default List_Settings;
