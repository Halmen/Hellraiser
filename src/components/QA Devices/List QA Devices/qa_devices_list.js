import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import ApiService from '../../../utils/ApiService';
import JsonList from '../../../utils/jsonList';
import Add from '../Add QA Device/qa_devices_add';

class List_devices extends Component
{
    constructor(props)
    {
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

    getId(obj)
    {
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

    componentDidMount(props)
    {
        let API ="http://10.200.24.2:2000/get_qa_devices";
        ApiService.getJson(API).then
        (
            res =>      { this.setState({ devices: res }); },
            error =>    { this.setState({ error: error }); }
        );
    }

    render(props, state)
    {
        return(
            <div class="container-fluid">
                <div className="row">
                    <div className="col-lg-4">
                        {
                            this.state.devices
                            ? <JsonList json={this.state.devices} url="http://10.200.24.2:2000/delete_qa_device" event={this.getId} instance={this} flag="true"/>
                            : null
                        }
                    </div>
                    <div className="col-lg-4">
                        {
                            !state.loading
                            ? ( <Add id={state.active}   key={this.id}  devices={this.state.devices} url="http://10.200.24.2:2000/edit_qa_device"/> )
                            : ( <p class="bg-primary"><h2>Click on an item</h2></p> )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default List_devices;
