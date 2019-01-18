import Inferno from 'inferno';
import Component from 'inferno-component';
import ApiService from '../../../utils/ApiService';
import $ from "jquery";

class Operating_system extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            OS: sessionStorage.getItem("OperatingSystem"),
            OS_descritpion: sessionStorage.getItem("OperatingSystem_desc")
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this,props.url);
        this.handleClear = this.handleClear.bind(this);
        this.oses = null;
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
            "name": this.state.OS,
            "ip_address": this.state.OS_descritpion
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

    componentDidMount()
    {
        let API = "http://10.200.24.2:2000/get_qa_oses";
        ApiService.getJson(API).then(
            res =>      { this.setState({ oses: res });     },
            error =>    { this.setState({ error: error });  }
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
                                    <label for="name" class="cols-sm-2 control-label">OS Name</label>
                                    <div class="cols-sm-10">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                            <input type="text" name="OS" class="form-control" placeholder="OS Name"  value={this.state.OS} onInput={this.handleInputChange} required data-fv-notempty-message="The name must not be empty" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="cols-sm-2 control-label">OS Description</label>
                                    <div class="cols-sm-10">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                                            <input type="text" class="form-control"  placeholder="string" name="OS_descritpion" value={this.state.OS_descritpion} onInput={this.handleInputChange}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-6" style="background-color:skyblue;">
                                <h3>Existing Operating Systems</h3>
                                {
                                    this.state.oses
                                    ? this.state.oses.map((val) => (
                                        <div>
                                            <label for="email" class="cols-sm-2 control-label">{val.name}</label>
                                            <p>{val.description}</p>
                                        </div>
                                    ))
                                    : <div><h2>Could not load operting systems!</h2></div>
                                }
                            </div>

                            <div class="form-group ">
                                <button  type="submit" class="btn btn-primary btn-lg btn-block login-button" onClick={ this.handleSubmit}>Add Operating System</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Operating_system;
