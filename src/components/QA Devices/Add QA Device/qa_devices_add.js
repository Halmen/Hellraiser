import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import ApiService from '../../../utils/ApiService';
import $ from "jquery";

class Add_device extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            deviceName: sessionStorage.getItem("deviceName"),
            deviceOS: sessionStorage.getItem("deviceOS") === null ? 'none' : sessionStorage.getItem("deviceOS"),
            qaPath: sessionStorage.getItem("qaPath"),
            ipAddress: sessionStorage.getItem("ipAddress"),
            osVersion: sessionStorage.getItem("osVersion"),
            qaUser: sessionStorage.getItem("qaUser"),
            macAddress: sessionStorage.getItem("macAddress"),
            android_adb_device_id: sessionStorage.getItem(" android_adb_device_id"),
            qaPort: sessionStorage.getItem("qaPort"),
            oses: null,
            dialog : false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this,props.url);
        this.handleClear = this.handleClear.bind(this);
        this.closePop = this.closePop.bind(this);
        this.getState = this.getState.bind(this,props.devices);
        this.json = null;
        this.selected = props.id;
    }

    getState(devices)
    {
        for (let i of devices)
        {
            if (i.id === this.selected)
            {
                this.setState({
                    deviceName: i.name,
                    deviceOS: i.os,
                    qaPath: i.qa_path,
                    ipAddress: i.ip_address,
                    osVersion: i.os_version,
                    qaUser: i.qa_user,
                    macAddress: i.mac_address,
                    android_adb_device_id: i.android_adb_device_id,
                    qaPort: i. port,
                    deviceId: i.id
                });
            }
        }
    }

    handleInputChange(event)
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const type = !target.placeholder ? "bool" : target.placeholder;

        if(type === "int" || type === "real")
        {
            this.setState({ [name]: Number(value) });
        }
        else
        {
            this.setState({ [name]: value });
        }

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
        for(let i in this.state)
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
            "name": this.state.deviceName,
            "ip_address": this.state.ipAddress,
            "os": this.state.deviceOS,
            "qa_path": this.state.qaPath,
            "qa_user": this.state.qaUser,
            "mac_address": this.state.macAddress,
            "os_version": this.state.osVersion,
            "qa_port": this.state.qaPort,
            "android_adb_device_id": this.state.android_adb_device_id,
            "deviceId": this.state.deviceId
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

        this.setState({ dialog: false });
    }

    componentDidMount(props)
    {
        let API = "http://10.200.24.2:2000/get_qa_oses";

        ApiService.getJson(API).then(
            res =>      { this.setState({ oses: res });     },
            error =>    { this.setState({ error: error });  }
        );

        if(this.selected)
        {
            this.getState();
        }
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

                        <div class="col-sm-4" >
                           <div class="form-group">
                              <label for="name" class="cols-sm-2 control-label">Device Name</label>
                              <div class="cols-sm-10">
                                 <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                    <input type="text" name="deviceName" class="form-control" placeholder="My Firebreathing Minion" value={this.state.deviceName} onInput={this.handleInputChange} required data-fv-notempty-message="The name must not be empty" />
                                 </div>
                              </div>
                           </div>
                           <div class="form-group">
                              <label for="username" class="cols-sm-2 control-label">Device OS</label>
                              <div class="cols-sm-10">
                                 <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                                    <select name="deviceOS" value={this.state.deviceOS} onChange={this.handleInputChange} required>
                                        <option value=""> Please select</option>
                                        {
                                            this.state.oses
                                            ? this.state.oses.map((val) => ( <option value={val.name}>{val.name}</option> ))
                                            : <option value="">Data not found</option>
                                        }
                                    </select>
                                 </div>
                              </div>
                           </div>
                           <div class="form-group">
                              <label for="email" class="cols-sm-2 control-label">QA Path</label>
                              <div class="cols-sm-10">
                                 <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                                    <input type="text" class="form-control"  placeholder="string" name="qaPath" value={this.state.qaPath} onInput={this.handleInputChange}/>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div class="col-sm-4" style="background-color:lavender;">
                           <div class="form-group">
                              <label for="password" class="cols-sm-2 control-label">Device IP Address</label>
                              <div class="cols-sm-10">
                                 <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                    <input type="text" class="form-control"  placeholder="10.200.(24|26).XXX"  name="ipAddress" value={this.state.ipAddress} onInput={this.handleInputChange} onblur={this.Validator} required pattern="10\.200\.(24|26)\.[0-9]{1,3}"/>
                                 </div>
                              </div>
                           </div>
                           <div class="form-group">
                              <label for="username" class="cols-sm-2 control-label">OS Version</label>
                              <div class="cols-sm-10">
                                 <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                                    <input type="text" class="form-control"  name="osVersion"  placeholder="OS Version" value={this.state.osVersion} onInput={this.handleInputChange}/>
                                 </div>
                              </div>
                           </div>
                           <div class="form-group">
                              <label for="username" class="cols-sm-2 control-label">QA User</label>
                              <div class="cols-sm-10">
                                 <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                                    <input type="text" class="form-control"  placeholder="string" name="qaUser" value={this.state.qaUser} onInput={this.handleInputChange}/>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div class="col-sm-4" style="background-color:skyblue;">
                           <div class="form-group">
                              <label for="email" class="cols-sm-2 control-label">Mac Address</label>
                              <div class="cols-sm-10">
                                 <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                                    <input type="text" class="form-control" placeholder="XX:XX:XX:XX:XX:XX" pattern="[0-9A-Fa-f]{2}\:[0-9A-Fa-f]{2}]\:[0-9A-Fa-f]{2}\:[0-9A-Fa-f]{2}\:[0-9A-Fa-f]{2}\:[0-9A-Fa-f]{2}" name="macAddress" value={this.state.macAddress} onInput={this.handleInputChange} onblur={this.Validator}/>
                                 </div>
                              </div>
                           </div>
                           <div class="form-group">
                              <label for="email" class="cols-sm-2 control-label">Android_adb_device_id</label>
                              <div class="cols-sm-10">
                                 <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                                    <input type="text" class="form-control" placeholder="string" name="android_adb_device_id" value={this.state.android_adb_device_id} onInput={this.handleInputChange}/>
                                 </div>
                              </div>
                           </div>
                           <div class="form-group">
                              <label for="email" class="cols-sm-2 control-label">QA Port</label>
                              <div class="cols-sm-10">
                                 <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                                    <input type="number" class="form-control" placeholder="int" name="qaPort" value={this.state.qaPort} onInput={this.handleInputChange}/>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div class="form-group ">
                           <button  type="submit" class="btn btn-primary btn-lg btn-block login-button" onClick={ this.handleSubmit}>Register</button>
                        </div>
                        <div class="container">
                           <div class="row">
                              <dialog open={this.state.dialog}>
                                 <div class="container-fluid">
                                    <div class="row">
                                       <button type="button" class="col-sm-6 btn btn-danger custom-button-width .navbar-right" onClick={this.closePop}>NoT CooL</button>
                                       <button type="button" class="col-sm-6 btn btn-primary custom-button-width .navbar-right" onClick={this.handleSubmit}>CooL</button>
                                    </div>
                                 </div>
                              </dialog>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
        );
    }
}

export default Add_device;
