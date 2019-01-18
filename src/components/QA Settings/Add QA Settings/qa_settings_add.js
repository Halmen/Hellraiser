import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import $ from "jquery";

class Add_Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            qaSetting: sessionStorage.getItem("qaSetting"),
            qaDesc: sessionStorage.getItem("qaDesc"),
            cachePath: sessionStorage.getItem("cachePath"),
            cacheVersion: sessionStorage.getItem("cacheVersion"),
            continuousRendering: sessionStorage.getItem("continuousRendering") === null ? 'none' : sessionStorage.getItem("continuousRendering"),
            cacheSizeInMega: sessionStorage.getItem("cacheSizeInMega"),
            cacheMaxNumberOfFiles: sessionStorage.getItem("cacheMaxNumberOfFiles"),
            cacheDeltaBetweenIndexSave: sessionStorage.getItem("cacheDeltaBetweenIndexSave"),
            cacheForceClean: sessionStorage.getItem("cacheForceClean") === null ? 'none' : sessionStorage.getItem("cacheForceClean"),
            httpUserAgent: sessionStorage.getItem("httpUserAgent"),
            httpRetryBeforeFailure: sessionStorage.getItem("httpRetryBeforeFailure"),
            minGLVersion: sessionStorage.getItem("minGLVersion"),
            httpSourceEnable: sessionStorage.getItem("httpSourceEnable") === null ? 'none' : sessionStorage.getItem("httpSourceEnable"),
            httpUseCache: sessionStorage.getItem("httpUseCache") === null ? 'none' : sessionStorage.getItem("httpUseCache"),
            httpNumberOfThreads: sessionStorage.getItem("httpNumberOfThreads"),
            saveRestoreRenderState: sessionStorage.getItem("saveRestoreRenderState") === null ? 'none' : sessionStorage.getItem("saveRestoreRenderState"),
            ecwpSourceEnable: sessionStorage.getItem("ecwpSourceEnable") === null ? 'none' : sessionStorage.getItem("ecwpSourceEnable"),
            ecwpSourceNumberOfThreads: sessionStorage.getItem("ecwpSourceNumberOfThreads"),
            resourceManagerNoRandom: sessionStorage.getItem("resourceManagerNoRandom") === null ? 'none' : sessionStorage.getItem("resourceManagerNoRandom"),
            replayFile: sessionStorage.getItem("replayFile"),
            replayMode: sessionStorage.getItem("ecwpSourceEnable") === null ? 'none' : sessionStorage.getItem("replayMode"),
            useCustomProjection: sessionStorage.getItem("ecwpSourceEnable") === null ? 'none' : sessionStorage.getItem("useCustomProjection"),
            cacheSalt: sessionStorage.getItem("cacheSalt"),
            permanentCacheForceClean: sessionStorage.getItem("permanentCacheForceClean") === null ? 'none' : sessionStorage.getItem("permanentCacheForceClean"),
            permanentCachePath: sessionStorage.getItem("permanentCachePath"),
            permanentCacheVersion: sessionStorage.getItem("permanentCacheVersion"),
            telemetryPort: sessionStorage.getItem("telemetryPort"),
            telemetryHostname: sessionStorage.getItem("telemetryHostname"),
            emscriptenWorkerPath: sessionStorage.getItem("emscriptenWorkerPath"),
            emscriptenWorkerCount: sessionStorage.getItem("emscriptenWorkerCount"),
            maxActivationPerFrame: sessionStorage.getItem("maxActivationPerFrame"),
            sendDebugInformation: sessionStorage.getItem("sendDebugInformation") === null ? 'none' : sessionStorage.getItem("sendDebugInformation"),
            dialog : false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.closePop = this.closePop.bind(this);
        this.json=null;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const type= !target.placeholder ? "bool" : target.placeholder;

        if(type==="int"){
            let conv=Number(value);
            this.setState({ [name]: conv });
        }
        else if (type==="real") {
            let conv=Number(value);
            this.setState({ [name]: conv });
        }
        else {
            this.setState({ [name]: value });
        }

        if (typeof (Storage) !== "undefined") {
            sessionStorage.setItem(name, value);
        }
        else {
            alert("Sorry, your browser does not support Web Storage...");
        }
    }

    handleClear() {
        for(let i in this.state){
            this.setState({ [i]: null });
            sessionStorage.removeItem(i);
        }
    }

    closePop(){
        this.setState({ dialog: false });
    }

    handleSubmit(event) {
        let settings={};
        let data=null;
        const settings_name=this.state.qaSetting;
        const settings_desc=this.state.qaDesc;

        if(!this.state.dialog) {
            for(let i in this.state){
                if(this.state[i] !== "none" && this.state[i] !== null && i !== "qaSetting" && i !== "qaDesc" && i !== "dialog") {
                    if(this.state[i]=="true" || this.state[i]=="false") {
                        let conv = (this.state[i] == "true");
                        settings[i]=conv;
                    }
                    else {
                        settings[i]=this.state[i]
                    }
                }
            }

            this.json=JSON.stringify(settings, null, 4);
            this.setState({ dialog: true });
        }
        else {
            data={
                "settings_name": settings_name,
                "settings_description": settings_desc,
                "settings_json": this.json
            };

            $.ajax({
                url: 'http://10.200.24.2:2000/add_qa_settings',
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

        event.preventDefault();
    }

    render() {
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
                                <label for="name" class="cols-sm-2 control-label">Settings Name</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                        <input type="text" name="qaSetting" class="form-control" placeholder="string"  value={this.state.qaSetting} onInput={this.handleInputChange} required data-fv-notempty-message="The name must not be empty" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="name" class="cols-sm-2 control-label">Settings Description</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                        <input type="text" name="qaDesc" class="form-control" placeholder="string"  value={this.state.qaDesc} onInput={this.handleInputChange} required/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="name" class="cols-sm-2 control-label">cachePath</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                        <input type="text" name="cachePath" class="form-control" placeholder="string"  value={this.state.cachePath} onInput={this.handleInputChange}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email" class="cols-sm-2 control-label">cacheVersion</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                                        <input type="number" class="form-control" step="1" placeholder="int"  name="cacheVersion" value={this.state.cacheVersion} onInput={this.handleInputChange}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="username" class="cols-sm-2 control-label">continuousRendering</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                                        <select name="continuousRendering" value={this.state.continuousRendering} onChange={this.handleInputChange}>
                                            <option value="true">true</option>
                                            <option value="false">false</option>
                                            <option value="none"> none </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="password" class="cols-sm-2 control-label">cacheSizeInMega</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                        <input type="number" class="form-control" step="1" placeholder="int" name="cacheSizeInMega" value={this.state.cacheSizeInMega} onInput={this.handleInputChange}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="confirm" class="cols-sm-2 control-label">cacheMaxNumberOfFiles</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                        <input type="number" class="form-control" step="1" placeholder="int" name="cacheMaxNumberOfFiles" value={this.state.cacheMaxNumberOfFiles} onInput={this.handleInputChange}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="name" class="cols-sm-2 control-label">cacheForceClean</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                        <select name="cacheForceClean" value={this.state.cacheForceClean} onChange={this.handleInputChange}>
                                            <option value="true">true</option>
                                            <option value="false">false</option>
                                            <option value="none"> none </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email" class="cols-sm-2 control-label">httpUserAgent</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                                        <input type="text" class="form-control"  placeholder="string" name="httpUserAgent" value={this.state.httpUserAgent} onInput={this.handleInputChange}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="username" class="cols-sm-2 control-label">httpRetryBeforeFailure</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                                        <input  type="number" class="form-control" step="1" placeholder="int" name="cacheSalt" value={this.state.cacheSalt} onInput={this.handleInputChange}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-4" style="background-color:lavender;">
                            <div class="form-group">
                                <label for="password" class="cols-sm-2 control-label">minGLVersion</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                        <input type="number" step="any" class="form-control" placeholder="real" name="minGLVersion" value={this.state.minGLVersion} onInput={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="confirm" class="cols-sm-2 control-label">httpSourceEnable</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                        <select name="httpSourceEnable" value={this.state.httpSourceEnable} onChange={this.handleInputChange}>
                                            <option value="true">true</option>
                                            <option value="false">false</option>
                                            <option value="none"> none </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email" class="cols-sm-2 control-label">httpUseCache</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                                        <select name="httpUseCache" value={this.state.httpUseCache} onChange={this.handleInputChange}>
                                            <option value="true">true</option>
                                            <option value="false">false</option>
                                            <option value="none"> none </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="username" class="cols-sm-2 control-label">httpNumberOfThreads</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                                        <input type="number" class="form-control" step="1" placeholder="int" name="httpNumberOfThreads" value={this.state.httpNumberOfThreads} onInput={this.handleInputChange}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="password" class="cols-sm-2 control-label">saveRestoreRenderState</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                        <select name="saveRestoreRenderState" value={this.state.saveRestoreRenderState} onChange={this.handleInputChange}>
                                            <option value="true">true</option>
                                            <option value="false">false</option>
                                            <option value="none"> none </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="confirm" class="cols-sm-2 control-label">ecwpSourceEnable</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                        <select name="ecwpSourceEnable" value={this.state.ecwpSourceEnable} onChange={this.handleInputChange}>
                                            <option value="true">true</option>
                                            <option value="false">false</option>
                                            <option value="none"> none </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email" class="cols-sm-2 control-label">ecwpSourceNumberOfThreads</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                                        <input type="number" class="form-control" step="1" placeholder="int" name="ecwpSourceNumberOfThreads" value={this.state.ecwpSourceNumberOfThreads} onInput={this.handleInputChange}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="username" class="cols-sm-2 control-label">resourceManagerNoRandom</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                                        <select name="resourceManagerNoRandom" value={this.state.resourceManagerNoRandom} onChange={this.handleInputChange}>
                                            <option value="true">true</option>
                                            <option value="false">false</option>
                                            <option value="none"> none </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="password" class="cols-sm-2 control-label">replayFile</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                        <input type="text" class="form-control"  placeholder="string" name="replayFile" value={this.state.replayFile} onInput={this.handleInputChange}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="confirm" class="cols-sm-2 control-label">replayMode</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                        <select name="replayMode" value={this.state.replayMode} onChange={this.handleInputChange}>
                                            <option value="true">true</option>
                                            <option value="false">false</option>
                                            <option value="none"> none </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4" style="background-color:skyblue;">
                            <div class="form-group">
                                <label class="cols-sm-2 control-label" for="continuousRendering">useCustomProjection</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                        <select name="useCustomProjection" value={this.state.useCustomProjection} onChange={this.handleInputChange}>
                                            <option value="true">true</option>
                                            <option value="false">false</option>
                                            <option value="none"> none </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="username" class="cols-sm-2 control-label">cacheSalt</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                                        <input  type="number" class="form-control" step="1" placeholder="int" name="cacheSalt" value={this.state.cacheSalt} onInput={this.handleInputChange}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="cols-sm-2 control-label" for="continuousRendering">permanentCacheForceClean</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                            <select name="permanentCacheForceClean" value={this.state.permanentCacheForceClean} onChange={this.handleInputChange}>
                                              <option value="true">true</option>
                                              <option value="false">false</option>
                                              <option value="none"> none </option>
                                            </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email" class="cols-sm-2 control-label">permanentCachePath</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                                        <input type="text" class="form-control"  placeholder="string" name="permanentCachePath" value={this.state.permanentCachePath} onInput={this.handleInputChange}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="username" class="cols-sm-2 control-label">permanentCacheVersion</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                                        <input  type="number" class="form-control" step="1" placeholder="int" name="permanentCacheVersion" value={this.state.permanentCacheVersion} onInput={this.handleInputChange}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="username" class="cols-sm-2 control-label">telemetryPort</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                                        <input  type="number" class="form-control" step="1" placeholder="int" name="telemetryPort" value={this.state.telemetryPort} onInput={this.handleInputChange}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="username" class="cols-sm-2 control-label">telemetryHostname</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                                        <input type="text" class="form-control"  placeholder="string" name="telemetryHostname" value={this.state.telemetryHostname} onInput={this.handleInputChange}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email" class="cols-sm-2 control-label">emscriptenWorkerPath</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                                        <input type="text" class="form-control"  placeholder="string" name="emscriptenWorkerPath" value={this.state.emscriptenWorkerPath} onInput={this.handleInputChange}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="username" class="cols-sm-2 control-label">emscriptenWorkerCount</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                                        <input  type="number" class="form-control" step="1" placeholder="int" name="emscriptenWorkerCount" value={this.state.emscriptenWorkerCount} onInput={this.handleInputChange}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="username" class="cols-sm-2 control-label">maxActivationPerFrame</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                                        <input  type="number" class="form-control" step="1" placeholder="int" name="maxActivationPerFrame" value={this.state.maxActivationPerFrame} onInput={this.handleInputChange}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="cols-sm-2 control-label" for="continuousRendering">sendDebugInformation</label>
                                <div class="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                        <select name="sendDebugInformation" value={this.state.sendDebugInformation} onChange={this.handleInputChange}>
                                            <option value="true">true</option>
                                            <option value="false">false</option>
                                            <option value="none"> none </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group ">
                            <button  type="submit" class="btn btn-primary btn-lg btn-block login-button" onClick={ this.handleSubmit}>Register</button>
                        </div>

                        <div calss="container">
                            <div class="row">
                                <dialog open={this.state.dialog}>
                                    Name: {this.state.qaSetting}<br/>
                                    Description: {this.state.qaDesc}<br/>
                                    <pre>{this.json}</pre>

                                    <div class="container-fluid">
                                        <div class="row">
                                            <button type="button" class="col-sm-6 btn btn-danger custom-button-width .navbar-right" onClick={ this.closePop}>NoT CooL</button>
                                            <button type="button" class="col-sm-6 btn btn-primary custom-button-width .navbar-right" onClick={ this.handleSubmit}>CooL</button>
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
export default Add_Settings;
