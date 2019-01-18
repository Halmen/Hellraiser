import Inferno from 'inferno';
import Component from 'inferno-component';
import ApiService from '../../../utils/ApiService';
import $ from "jquery";

class Result_states extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            Result_state: sessionStorage.getItem("Result_state"),
            Result_state_descritpion: sessionStorage.getItem("Result_state_descritpion"),
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this,props.url);
        this.handleClear = this.handleClear.bind(this);
        this.result_states = null;
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

    handleClear()
    {
        for (let i in this.state)
        {
            this.setState({ [i]: null });
            sessionStorage.removeItem(i);
        }
    }

    closePop()
    {
         this.setState({ dialog: false });
    }

    handleSubmit(url, event)
    {
        let data = null;
        url = url ? url : 'http://10.200.24.2:2000/add_qa_device';

        data = {
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
        let API = "http://10.200.24.2:2000/get_qa_result_states";
        ApiService.getJson(API).then(
            res =>      { this.setState({ result_states: res });    },
            error =>    { this.setState({ error: error });          }
        );
    }

    render(props)
    {
        return (
            <div class="container">
                <div class="row main">
                    <div class="main-login main-center">

                        <div>
                            <button class="btn btn-primary btn-lg btn-block login-button" onClick={this.handleClear}>Clear</button>
                        </div>

                        <form data-toggle="validator" role="form">

                            <div class="col-sm-6" >
                                <div class="form-group">
                                    <label for="name" class="cols-sm-2 control-label">Result State</label>
                                    <div class="cols-sm-10">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                            <input type="text" name="Result_state" class="form-control" placeholder="Result state" value={this.state.Result_state} onInput={this.handleInputChange} required data-fv-notempty-message="The name must not be empty" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="cols-sm-2 control-label">Description</label>
                                    <div class="cols-sm-10">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                                            <input type="text" class="form-control"  placeholder="string" name="Result_state_descritpion" value={this.state.Result_state_descritpion} onInput={this.handleInputChange}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-6" style="background-color:skyblue;">
                                <h3>Existing Result States</h3>
                                {
                                    this.state.result_states
                                    ? this.state.result_states.map((val) => (
                                        <div>
                                            <label for="email" class="cols-sm-2 control-label">{val.state}</label>
                                            <p>{val.description}</p>
                                        </div>
                                    ))
                                    : <div><h2>No result state found!!!</h2></div>
                                }
                            </div>

                            <div class="form-group">
                                <button  type="submit" class="btn btn-primary btn-lg btn-block login-button" onClick={this.handleSubmit}>Add Result State</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Result_states;
