import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import ApiService from '../../../utils/ApiService';
import $ from "jquery";

class Enviroment_variables extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            text: null
        };

        this.handleSubmit = this.handleSubmit.bind(this,props.url);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.resetText = this.resetText.bind(this);
        this.default = null;
    }

    resetText()
    {
        this.setState({
            text:JSON.stringify(this.default, undefined, 4)
        })
    }

    handleInputChange(event)
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });

        if (typeof (Storage) !== "undefined")
        {
            sessionStorage.setItem(name, value);
        }
        else
        {
            alert("Sorry, your browser does not support Web Storage...");
        }
    }

    handleSubmit(url, event)
    {
        let data = null;
        url = url ? url : 'http://10.200.24.2:2000/add_qa_device';

        data={
            "name": this.state.Result_state,
            "ip_address": this.state.Result_state_descritpion
        };

        $.ajax({
            url: url,
            header: {'Content-Type': 'application/json'},
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(data) {
                console.log(data.message);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
     }

    componentDidMount(props)
    {
        let API = "http://10.200.24.2:2000/get_qa_env_variables";
        ApiService.getJson(API).then(
            res => {
                this.default = res;
                this.setState({
                    text:JSON.stringify(res, undefined, 4)
                });
            },
            error => {
                this.setState({ error: error });
            }
        );
    }

    render(state)
    {
        return (
            <div class="container">
                <div class="row main">
                    <div class="main-login main-center">
                        <div>
                            <button class="btn btn-primary btn-lg btn-block login-button" onClick={this.resetText}>Reset Text</button>
                        </div>

                        <h4>The environment variables are sent to the mQATool client together with QA cases and expanded in mMap.</h4>
                        <br></br>
                        <h4>All the environment variables are parsed in the mQATool client and are thus expanded when executing the JSON commands and creating layers and composites. These variables should thus be used when creating layers, cases and other things.</h4>

                    </div>

                    {
                        this.state.text
                        ? <textarea rows="50" cols="200"  name="text" value={this.state.text} onInput={this.handleInputChange}></textarea>
                        : <textarea rows="50" cols="200"  name="text" value="No data can be found" onInput={this.handleInputChange}></textarea>
                    }

                    <button type="submit" class="btn btn-primary btn-lg btn-block login-button" onClick={this.handleSubmit}>Change variables</button>
                </div>
            </div>
        );
    }
}

export default Enviroment_variables;
