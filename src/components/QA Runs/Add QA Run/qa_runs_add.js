import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import {removeElement} from "../../../utils/Validator";
import ApiService from '../../../utils/ApiService';
import $ from "jquery";

class Add_run extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            runName: sessionStorage.getItem("runName"),
            runDescription: sessionStorage.getItem("runDescription"),
            qaSettings: sessionStorage.getItem("qaSettings") === null ? 'none':sessionStorage.getItem("qaSettings"),
            runType: sessionStorage.getItem("runType") === null ? 'none':sessionStorage.getItem("runType"),
            compositeNr: [],
            cases : [],
            json3 : null
        };

        this.composite_cases=[];
        this.composites = [];
        this.devices = [];
        this.composite_added = [];
        this.cases_added = [];
        this.caseNr = 0
        this.compositeNr = 1;

        this.selected = props.id;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this,props.url);
        this.handleClear = this.handleClear.bind(this);
        this.getCases = this.getCases.bind(this);
        this.getState= this.getState.bind(this,props.runs);
        this.addCases = this.addCases.bind(this);
        this.addComposite = this.addComposite.bind(this);
    }

    getState(runs)
    {
        let compNr = [];
        var empty = require('is-empty');
        let cases = [];
        for (let i of runs)
        {
            if(i.id === this.selected)
            {
                if(!empty(i.qa_devices))
                {
                    for (let j of i.qa_devices)
                    {
                        this.devices.push(j.name);
                        this.setState({ [j.name] : j.name });
                    }
                }

                if(!empty(i.qa_composites))
                {
                    let comp_nr = 0;
                    for (let k of i.qa_composites)
                    {
                        this.composite_added.push(k.name);
                        let obj = this.composite_cases.filter(function(obj){ return obj.composite == k.name});

                        let c = {
                            name: 'composite' + comp_nr,
                            obj: obj[0]
                        };

                        cases.push(c);

                        if(!comp_nr)
                        {
                            this.setState({ composite0: k.name });
                        }
                        else
                        {
                            compNr.push(this.compositeNr);
                            this.setState({
                                compositeNr: compNr,
                                ['composite' + this.compositeNr]: k.name
                            });
                            this.compositeNr++;
                        }

                        comp_nr++;
                    }
                }

                if (!empty(i.qa_cases))
                {
                    let caseNr = 0;
                    for (let l of i.qa_cases)
                    {
                        this.cases_added.push(l.name);
                        this.setState({ [l.name + caseNr] : true });
                    }
                }

                this.setState({
                    runName: i.name,
                    runID: i.id,
                    runDescription: i.description,
                    runType: i.run_type,
                    qaSettings: i.settings_name,
                    cases: cases
                });
            }
        }
    }

    getCases(cases)
    {
       let composite_case = null;
       if(cases)
       {
            for(let i of cases)
            {
                if(!this.composites.includes(i.composite_name))
                {
                    this.composites.push(i.composite_name);
                    composite_case = {
                        composite: i.composite_name,
                        cases: [i.name]
                    };

                    this.composite_cases.push(composite_case);
                }
                else
                {
                    for (let j in this.composite_cases)
                    {
                        if(this.composite_cases[j].composite === i.composite_name)
                        {
                            this.composite_cases[j].cases.push(i.name);
                        }
                    }
                }
            }
        }
    }

    addComposite()
    {
        this.setState({
            compositeNr: this.state.compositeNr.concat(this.compositeNr)
        });
        this.compositeNr++;
    }

    addCases(obj, comp_name)
    {
        let flag = true;
        let cases_copy = this.state.cases;

        for(let i in this.state.cases)
        {
            if (cases_copy[i].name === comp_name)
            {
                cases_copy [i].obj = obj;
                this.setState({ cases : cases_copy });
                flag = false;
            }
        }

        if (flag)
        {
            let c = {
                name: comp_name,
                obj: obj
            };

            this.setState({ cases: this.state.cases.concat(c) });
            this.caseNr++;
        }
    }

    handleInputChange(event)
    {
        const target = event.target;
        const name = target.name;
        const id = target.id;
        const value = target.type === 'checkbox' ? (this.state[name] ? '': 'true') : target.value;

        if(id === "device")
        {
            if (!this.devices.includes(name))
            {
                this.devices.push(name);
            }
            else
            {
                this.devices = removeElement(this.devices, name);
            }
        }
        else if (id === "case")
        {
            let case_name = name.slice(0, -1);
            if (!this.cases_added.includes(case_name))
            {
                this.cases_added.push(case_name);
            }
            else
            {
                this.cases_added=removeElement(this.cases_added, case_name);
            }
        }
        else if (id === "comp")
        {
            let flag = true;
            if(value && value!="none")
            {
                for (let i in this.state.cases)
                {
                    if(this.state.cases[i].name === name)
                    {
                        this.composite_added[i] = value;
                        flag = false;
                    }
                }

                if(flag)
                {
                    this.composite_added.push(value);
                }

                let obj = this.composite_cases.filter(function(obj){
                    return obj.composite == value
                });

                this.addCases(obj[0], name);
            }
            else if(value === "none")
            {
                this.composite_added = removeElement(this.composite_added, this.state[name]);
            }
        }

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
        var empty = require('is-empty');
        let data = null;
        let composites = [];

        for (let i of this.composite_added)
        {
            let comp = {
                name: i,
                cases: []
            };

            let obj = this.composite_cases.filter(function(obj){
                return obj.composite == i
            });

            for (let j of obj[0].cases)
            {
                if(this.cases_added.includes(j))
                {
                    comp.cases.push(j);
                }
            }

            composites.push(comp);
        }

        if (empty(this.devices))
        {
            alert ("Warning: No devices added for the run. Edit this case later to actually run it on some devices.");
        }

        let composite_string = JSON.stringify(composites, null, 4);
        let devices_string = JSON.stringify(this.devices, null, 4);
        url = url ? url:'http://10.200.24.2:2000/add_qa_run';

        data = {
            "name": this.state.runName,
            "description": this.state.runDescription,
            "settings": this.state.qaSettings,
            "run_type": this.state.runType,
            "composites": composite_string,
            "devices": devices_string,
            "runId": this.state.runID
        };

        $.ajax({
            url: url,
            header: {'Content-Type': 'application/json'},
            dataType: 'json',
            type: 'POST',
            data: data,
            traditional: true,
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
        let API1 = "http://10.200.24.2:2000/get_qa_devices";
        let API2 = "http://10.200.24.2:2000/get_qa_settings";
        let API3 = "http://10.200.24.2:2000/get_qa_run_types";
        let API4 = "http://10.200.24.2:2000/get_qa_cases";
        let APIs = [API1, API2, API3, API4];

        for(let i in APIs)
        {
            ApiService.getJson(APIs[i]).then(
                res => {
                    if(i === "3")
                    {
                        this.getCases(res);
                        if(this.selected)
                        {
                            this.getState();
                        }
                    }

                    this.setState({ ['json' + i]: res });
                },
                error => {
                    this.setState({ ['error' + i]: error });
                }
            );
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

                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="name" class="cols-sm-2 control-label">Run Name</label>
                                    <div class="cols-sm-10">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                            <input type="text" name="runName" class="form-control" placeholder="string"  value={this.state.runName} onInput={this.handleInputChange} required data-fv-notempty-message="The name must not be empty" />
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="name" class="cols-sm-2 control-label">Run Description</label>
                                    <div class="cols-sm-10">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                            <input type="text" name="runDescription" class="form-control" placeholder="string"  value={this.state.runDescription} onInput={this.handleInputChange}/>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="username" class="cols-sm-2 control-label">Run Settings</label>
                                    <div class="cols-sm-10">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                                            <select name="qaSettings" value={this.state.qaSettings} onChange={this.handleInputChange} required>
                                                <option value="">Please select</option>
                                                    {
                                                        this.state.json1
                                                        ? this.state.json1.map((val) => ( <option value={val.name}>{val.name}</option> ))
                                                        : <option>Data not found</option>
                                                    }
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="username" class="cols-sm-2 control-label">Run Type</label>
                                    <div class="cols-sm-10">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                                            <select name="runType" value={this.state.runType} onChange={this.handleInputChange} required>
                                                <option value="">Please select</option>
                                                    {
                                                        this.state.json2
                                                        ? this.state.json2.map((val) => ( <option value={val.type}>{val.type}</option> ))
                                                        : <option>Data not found</option>
                                                    }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-2" style="background-color:lavender;">
                                <label class="form-check-label">Select devices for the new QA Run</label>
                                {
                                    this.state.json0
                                    ?   this.state.json0.map((val) => (
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" name={val.name} id="device" onChange={this.handleInputChange} checked={this.state[val.name]} />{val.name}
                                                <br></br>
                                                <br></br>
                                            </div>
                                        ))
                                    :   <p>Not found!</p>
                                }
                            </div>

                            <div class="col-lg-4" style="background-color:skyblue;">
                                <label for="username" class="cols-sm-2 control-label">Select composite(s)</label>
                                <div class="form-group">
                                    <div class="cols-sm-10">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                                            <select name="composite0" id="comp" value={this.state.composite0} onChange={this.handleInputChange} required>
                                                <option value=""> Please select</option>
                                                {
                                                    this.composites.map((val) => ( <option value={val}>{val}</option> ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {
                                    this.state.compositeNr.map((val) => (
                                        <div class="form-group">
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                                                    <select name={"composite"+val} id="comp"  value={this.state["composite"+val]} onChange={this.handleInputChange} >
                                                        <option value="none"> none</option>
                                                        {
                                                            this.composites.map((val) => ( <option value={val}>{val}</option> ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                       </div>
                                    ))
                                }

                                <button type="button" class="btn btn-success" onClick={this.addComposite}>+</button>
                            </div>

                            <div class="col-sm-3" style="background-color:skyblue;">
                                {
                                    this.state.cases.map((val) => (
                                        val.obj
                                        ?   <div>
                                                <label class="form-check-label">Select {val.obj.composite} case</label>
                                                    {
                                                        val.obj.cases.map((val) => (
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" name={val+this.caseNr} id="case" onChange={this.handleInputChange} checked={this.state[val+this.caseNr]} />{val}
                                                                <br></br>
                                                            </div>
                                                        ))
                                                    }
                                            </div>
                                        :   <p>Nothing to see here </p>
                                    ))
                                }
                            </div>

                            <div class="form-group ">
                                <button type="submit" class="btn btn-primary btn-lg btn-block login-button" onClick={ this.handleSubmit}>Register</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Add_run;
