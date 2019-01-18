import Inferno,{ linkEvent } from 'inferno';
import Component from 'inferno-component';
import $ from "jquery";
import math from "mathjs";
import lodash from "lodash";
import resemble from "resemblejs";
import update from 'immutability-helper';





function to_blob(base64string){
    
    var byteCharacters = atob(base64string);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++)
        {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], {type: "image"});
        return blob;
}


        function valueCompare(a, b) {



            if (lodash.isNumber(a) && lodash.isNumber(b)) {
                let diff = math.abs(a - b);
                return diff < 1e-6 ? true : undefined;
            }

            return undefined;
        }



class Diff extends Component {
    constructor(props) {

        super(props);
        this.changed_state = null;
        this.diffImage = null;
        this.currentColor = {red: 255,
                            green: 0,
                            blue: 255};
        this.errorType = "flat";
        this.transperency = 1;
        this.flag = false;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this, props.diff);
        this.changeState = this.changeState.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.diffTab = this.diffTab.bind(this);
        this.handleCancle = this.handleCancle.bind(this);
        this.jsonDiff = this.jsonDiff.bind(this);
        this.diffSettings =this.diffSettings.bind(this); 
       
    

        this.state = {

            dialog: false,
            tab: [],
            ignore:{
                nothing:"active"
            },
            color:{
                magenta:"active"
            },
            settings:{
                flat:"active"
            },
            transparency:{
                opaque:"active"
            }
            
            

        };
     
    }
    handleCancle(event) {

        this.setState({

            dialog: false
        });

    }
    

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;


        this.setState({

            [name]: value
        });
    }

    changeState(event) {
        const target = event.target;
        const value = target.value;
        this.changed_state = value === "blue" ? "CURRENT_BLUEPRINT" : "IGNORED";

        this.setState({

            dialog: true

        });

    }
    diffTab(left_a, left_b, right_a, right_b, size_a, size_b) {
        let values = [];
        for (let i = 0; i < size_a; i++) {
            if (lodash.isEqualWith(left_a[i], right_a[i], valueCompare)) {
                values.push({
                    name: left_a[i].action,
                    result: "col-sm-4 btn btn-success btn-md",
                    id: i,
                    type: "QACallbackResults"});
            } else {
                values.push({
                    name: left_a[i].action,
                    result: "col-sm-4 btn btn-danger btn-md",
                    id: i,
                    type: "QACallbackResults"
                });

            }

        }


        for (let i = 0; i < size_b; i++) {
            if (lodash.isEqualWith(left_b[i], right_b[i], valueCompare)) {

                values.push({
                    name: Object.keys(left_b[i].command[0])[0],
                    result: "col-sm-4 btn btn-success btn-md",
                    id: i,
                    type: "QAOutStrings"});

            } else {

                values.push({
                    name: Object.keys(left_b[i].command[0])[0],
                    result: "col-sm-4 btn btn-danger btn-md",
                    id: i,
                    type: "QAOutStrings"
                });

            }

        }



        this.setState({
            tab: values
        });

    }

    diffSettings(event){
        const target = event.target;
        const name = target.name;
        const id = target.id;
        let next = null;
       
        
        
        
        if(this.state[id][name]){
            
         next = update(this.state[id], { 
                 [name]:{$set:"active"}
             });    

        }else{
            
            next = update(this.state[id], { 
                 [name]:{$set:"active"}
             });
            
            for(let i in this.state[id]){
                if(i !== name ){
                next[i]="";
                }
            }
        }

            
switch(name){
    case "nothing" :
        this.diffImage.ignoreNothing();
        break;
        
   case "colors" :
       this.diffImage.ignoreColors();
       break;
       
   case "antianlising" :
       this.diffImage.ignoreAntialiasing();
       break;
       
   case "magenta" :
       this.currentColor = {red:255, green: 0, blue: 255};
       break; 
   case "yellow" :
       this.currentColor = {red:255, green: 255, blue: 0};
       break;    
   case "cyan" :
       this.currentColor = {red:0, green: 255, blue: 255};
       break;
   case "red" :
       this.currentColor = {red:255, green: 0, blue: 0};
       break;
   case "green" :
       this.currentColor = {red:0, green: 255, blue: 0};
       break;
   case "blue" :
       this.currentColor = {red:0, green: 0, blue: 255};
       break;
   case "black" :
       this.currentColor = {red:0, green: 0, blue: 0};
       break;    
   case "white" :
       this.currentColor = {red:255, green: 255, blue: 255};
       break; 
    
   case "flat" :
       this.errorType = "flat";
       break;  
   
    case "movement" :
       this.errorType = "movement";
       break;                   
    
     case "flat_intesitivity" :
       this.errorType = "flatDifferenceIntensity";
       break;  
    
     case "movement_intesitivity" :
       this.errorType = "movementDifferenceIntensity";
       break;  
    
     case "opaque" :
       this.transperency = 1;
       break;
    
     case "transparent" :
       this.transperency = 0.3;
       break;
    
}

        
     resemble.outputSettings({
     errorColor: this.currentColor,
     errorType: this.errorType,
     transparency: this.transperency,
     largeImageThreshold: 1200,
     useCrossOrigin: false,
     outputDiff: true
    });

    this.diffImage.repaint();

                this.setState({
                        [id]:next
                        });

    }












    jsonDiff(event) {
        


        let jsondiffpatch = require('jsondiffpatch');
        let formatters = require('./../../../../node_modules/jsondiffpatch/public/build/jsondiffpatch-formatters');
      
        const target = event.target;
        const value = target.value;
        const id = target.id;
        let left = this.state.left.results[0][value][id];
        let right = this.state.right.results[0][value][id];
        let left_image = new Image();
        let right_image = new Image();
        let right_blob = null;
        let left_blob = null;
        let diff_data = null;

        if (left.options) {
            if (left.options.data) {
                 
                left_image.width=left.options.width;
                left_image.height=left.options.height;
                left_image.src = 'data:image/png;base64,' + left.options.data;
                left_blob = to_blob(left.options.data);
                left.options.data = left.options.data.substring(0, 400);
                this.flag=true;
            }
        }
        if (right.options) {
            if (right.options.data) {
                
                right_image.width=left.options.width;
                right_image.height=left.options.height;
                right_image.src = 'data:image/png;base64,' + right.options.data;
                right_blob = to_blob(right.options.data);
                right.options.data = right.options.data.substring(0, 400);
                this.flag=true;
            }
        }
        let local_this = this;
        

    if(this.flag){
     resemble.outputSettings({
   errorColor: {
    red: 255,
    green: 0,
    blue: 255
  },
  errorType: 'flat',
  transparency: 1,
  largeImageThreshold: 1200,
  useCrossOrigin: false,
  outputDiff: true
});
     
       this.diffImage = resemble(left_blob).compareTo(right_blob).ignoreNothing().onComplete(function(data){
          
  
  
        local_this.setState({
            diff_image: data.getImageDataUrl(),
            diff_settings: data
        });
         
        
});


    }
    
       
 
        let delta = jsondiffpatch.diff(left, right);
        let dom = formatters.html.format(delta, left) ? <div dangerouslySetInnerHTML={{__html: formatters.html.format(delta, left)}} /> : <pre>{JSON.stringify(left, null, 4)}</pre>;


    


        this.setState({
            diff_dom: dom,
            left_image:left_image,
            right_image:right_image
        });

    }

    handleUpdate() {

        let data = {results_id: this.state.left.results_id,
            new_state: this.changed_state,
            comments: this.state.comment
        };

        $.ajax({
            url: 'http://10.200.24.2:2000/update_state',
            header: {'Content-Type': 'application/json'},
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function (data) {
                console.log(data.message);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        this.setState({
            dialog: false

        });

    }
    componentDidMount(diff) {
        let left = null;
        let right = null;
        let left_tab_a = null;
        let left_tab_b = null;
        let right_tab_a = null;
        let right_tab_b = null;


        for (let i of diff.results) {

            if (i.results_id === diff.left_id) {
                left = i;
                left_tab_a = i.results[0].QACallbackResults;
                left_tab_b = i.results[0].QAOutStrings;
            }
            if (i.results_id === diff.right_id) {
                right = i;
                right_tab_a = i.results[0].QACallbackResults;
                right_tab_b = i.results[0].QAOutStrings;

            }
        }



        let size_a = left_tab_a.length > right_tab_a.length ? right_tab_a.length : left_tab_a.length;
        let size_b = left_tab_b.length > right_tab_b.length ? right_tab_b.length : left_tab_b.length;



        this.diffTab(left_tab_a, left_tab_b, right_tab_a, right_tab_b, size_a, size_b);


        this.setState({
            left: left,
            right: right,
            name: diff.qa_cases[0].name
        });



    }

    render(props, state) {


        return(
                <div class="container-full">
                    <div class="row">
                        <div class='col-lg-2'>
                            <div class="container-fluid">
                                <h3><b>{this.state.name}</b></h3>
                                {
                                    this.state.tab.map((val) => (
                                        <div class="row">
                                            <button type="button" class={val.result} id={val.id} value={val.type}  onClick={this.jsonDiff}>{val.name}</button>
                                        </div>
                                                ))
                                }
                            </div>
                        </div>
                        <div class='row col-lg-4 col-md-pull-1'>
                            <h1 >
                                <span class="label label-default"> myVR QA Diff Tool: The place to go to, when shit happens </span>
                            </h1>
                            <br/>
                            <br/>
                
                
                            <div class="border row">
                
                                <div class="col-md-4 ">
                                    <table class="table">
                                        {this.state.left ? (
                                    <tbody>
                                        <tr>
                                            <td>Results ID</td>
                                            <td ><b>{this.state.left.results_id}</b></td>    
                                        </tr>
                                        <tr>
                                            <td>Results State</td>
                                            <td ><span class="label label-default">{this.state.left.state}</span></td> 
                                        </tr>
                                        <tr>
                                            <td>Timestamp</td>
                                            <td ><b>{this.state.left.qa_timestamp}</b></td> 
                                        </tr>
                                        <tr>
                                            <td>Device ID</td>
                                            <td ><b>{this.state.left.device_id}</b></td> 
                                        </tr>
                                        <tr>
                                            <td>Device Name</td>
                                            <td ><b>{this.state.left.device_name}</b></td> 
                                        </tr>
                                        <tr>
                                            <td>Run ID</td>
                                            <td ><b>{this.state.left.run_id}</b></td> 
                                        </tr>
                                        <tr>
                                            <td>Run Name</td>
                                            <td ><b>{this.state.left.run_name}</b></td> 
                                        </tr>
                                        <tr>
                                            <td>Composite Name</td>
                                            <td ><b>{this.state.left.composite_name}</b></td> 
                                        </tr>
                                        <tr>
                                            <td>Changelist</td>
                                            <td><a target="_blank" href={this.state.left.changes_url}>{this.state.left.revision}</a></td>
                                        </tr>
                                        <tr>
                                            <td>Users in changelist</td>
                                        </tr>
                                    </tbody>

                                                    ) : null}
                                    </table>
                                    <div class="container-fluid">
                                        <div class="row">
                                            <p>Change state:</p>
                                            <button type="button" class="col-sm-6 btn btn-primary custom-button-width .navbar-right" value="blue" onClick={ this.changeState}>Set as BLUEPRINT</button>
                                            <button type="button" class="col-sm-6 btn btn-danger custom-button-width .navbar-right" value="red" onClick={ this.changeState}>Set as IGNORE</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-md-push-1">
                                    <table class="table">
                                        {this.state.right ? (
                                    <tbody>
                                        <tr>
                                            <td>Results ID</td>
                                            <td ><b>{this.state.right.results_id}</b></td>    
                                        </tr>
                                        <tr>
                                            <td>Results State</td>
                                            <td ><span class="label label-default">{this.state.right.state}</span></td> 
                                        </tr>
                                        <tr>
                                            <td>Timestamp</td>
                                            <td ><b>{this.state.right.qa_timestamp}</b></td> 
                                        </tr>
                                        <tr>
                                            <td>Device ID</td>
                                            <td ><b>{this.state.right.device_id}</b></td> 
                                        </tr>
                                        <tr>
                                            <td>Device Name</td>
                                            <td ><b>{this.state.right.device_name}</b></td> 
                                        </tr>
                                        <tr>
                                            <td>Run ID</td>
                                            <td ><b>{this.state.right.run_id}</b></td> 
                                        </tr>
                                        <tr>
                                            <td>Run Name</td>
                                            <td ><b>{this.state.right.run_name}</b></td> 
                                        </tr>
                                        <tr>
                                            <td>Composite Name</td>
                                            <td ><b>{this.state.right.composite_name}</b></td> 
                                        </tr>
                                        <tr>
                                            <td>Changelist</td>
                                            <td><a target="_blank" href={this.state.right.changes_url}>{this.state.right.revision}</a></td>
                                        </tr>
                                        <tr>
                                            <td>Users in changelist</td>
                                        </tr>
                                    </tbody>
                                                    ) : null}
                                    </table>
                                    <div calss="container">
                                        <div class="row">
                                            <dialog open={this.state.dialog}>
                                                <div class="input-group">
                                                    <p>Add comment for changig state</p>
                                                    <input type="text" class="form-control" name="comment" value={this.state.comment} onInput={this.handleInputChange}/>
                                                    <span class="btn btn-default" onClick={ this.handleUpdate}>Update</span>
                                                    <span class="btn btn-default" onClick={ this.handleCancle}>Cancle</span>
                                                </div>
                                            </dialog>
                                        </div>
                                    </div>
                                </div>
                
                            </div>
                          
                            <div class="border borderrow">  
                            
                                {this.state.diff_dom ?
                                     this.state.diff_dom:
                                    <p>Click on an item on the left, see what happens!</p>
                                }
                                <div class="col-md-4 ">
                                 <div class="thumbnail">
                                {this.state.left_image?
                                <img src={this.state.left_image.src} alt={"No image available"} width={this.state.left_image.width} height={this.state.left_image.height}/>
                                :null
                                }
                                 </div>
                                </div>
                                {this.flag?
                                <div>
                                
                                 <div class="col-md-4 ">
                                  <div class="thumbnail">
                                {this.state.diff_image?
                                <img src={this.state.diff_image} alt={"No image available"} width={this.state.diff_image.width} height={this.state.diff_image.height}/>
                                :null
                                }
                                </div>
                                </div>
                                 <div class="col-md-4 ">
                                  <div class="thumbnail">
                                {this.state.right_image?
                                <img src={this.state.right_image.src} alt={"No image available"} width={this.state.right_image.width} height={this.state.right_image.height}/>
                                :null
                                }
                                </div>
                                </div>
                               </div>
                               :null}
                            </div>
                           {this.flag?
                            <div class="row">
                            <div class="col-md-6">
                            <h3>Diff tools:</h3>
                            <br/>
                            <h4>Ignoring:</h4>
                            <div class="row">
                               <div class="btn-group" data-toggle="buttons">
                            <label class={"btn btn-primary "+ this.state.ignore.nothing}>
                            <input type="radio" name="nothing"  id="ignore" autocomplete="off" onClick={this.diffSettings}/>Ingore nothing
                            </label>
                             <label class={"btn btn-primary "+ this.state.ignore.colors}>
                             <input type="radio" name="colors"  id="ignore" autocomplete="off" onClick={this.diffSettings}/> Ingore colors
                            </label>
                              <label class={"btn btn-primary "+ this.state.ignore.antianlising}>
                            <input type="radio" name="antianlising"  id="ignore" autocomplete="off" onClick={this.diffSettings}/> Ingore antianlising
                            </label>
                            </div>
                            </div>
                            <br/>
                             <h4>Colors:</h4>
                            <div class="row">
                             <div class="btn-group" data-toggle="buttons">
                            <label class={"btn btn-primary "+ this.state.color.magenta}>
                            <input type="radio" name="magenta"  id="color" autocomplete="off" onClick={this.diffSettings}/>Magenta
                            </label>
                             <label class={"btn btn-primary "+ this.state.color.yellow}>
                             <input type="radio" name="yellow"  id="color" autocomplete="off" onClick={this.diffSettings}/> Yellow
                            </label>
                             <label class={"btn btn-primary "+ this.state.color.cyan}>
                            <input type="radio" name="cyan"     id="color" autocomplete="off" onClick={this.diffSettings}/> Cyan
                            </label>
                            <label class={"btn btn-primary "+ this.state.color.red}>
                            <input type="radio" name="red"    id="color" autocomplete="off" onClick={this.diffSettings}/> Red
                            </label>
                            <label class={"btn btn-primary "+ this.state.color.green}>
                            <input type="radio" name="green"  id="color" autocomplete="off" onClick={this.diffSettings}/>Green
                            </label>
                             <label class={"btn btn-primary "+ this.state.color.blue}>
                             <input type="radio" name="blue"  id="color" autocomplete="off" onClick={this.diffSettings}/> Blue
                            </label>
                             <label class={"btn btn-primary "+ this.state.color.black}>
                            <input type="radio" name="black"  id="color" autocomplete="off" onClick={this.diffSettings}/> Black
                            </label>
                            <label class={"btn btn-primary "+ this.state.color.white}>
                            <input type="radio" name="white"  id="color" autocomplete="off" onClick={this.diffSettings}/> White
                            </label>
                            </div>
                            </div>
                            <br/>
                            <h4>Color settings:</h4>
                            <div class="row">
                               <div class="btn-group" data-toggle="buttons">
                            <label class={"btn btn-primary "+ this.state.settings.flat}>
                            <input type="radio" name="flat" id="settings" autocomplete="off" onClick={this.diffSettings}/>Flat
                            </label>
                             <label class={"btn btn-primary "+ this.state.settings.movement}>
                             <input type="radio" name="movement"  id="settings" autocomplete="off" onClick={this.diffSettings}/>Movement
                            </label>
                              <label class={"btn btn-primary "+ this.state.settings.flat_intesitivity}>
                            <input type="radio" name="flat_intesitivity"  id="settings" autocomplete="off" onClick={this.diffSettings}/> Flat with diff intensity
                            </label>
                             <label class={"btn btn-primary "+ this.state.settings.movement_intesitivity}>
                            <input type="radio" name="movement_intesitivity" id="settings" autocomplete="off" onClick={this.diffSettings}/> Movement with diff intensity
                            </label>
                            </div>
                            </div>
                             <br/>
                            <h4>Transparency:</h4>
                            <div class="row">
                               <div class="btn-group" data-toggle="buttons">
                            <label class={"btn btn-primary "+ this.state.transparency.opaque}>
                            <input type="radio" name="opaque" id="transparency" autocomplete="off" onClick={this.diffSettings}/>Opaque
                            </label>
                             <label class={"btn btn-primary "+ this.state.transparency.transparent}>
                             <input type="radio" name="transparent" id="transparency" autocomplete="off" onClick={this.diffSettings}/> Transparent
                            </label>
                             
                            </div>
                            </div>
                            </div>
                            <div class="col-md-6">
                                <pre>{JSON.stringify(this.state.diff_settings, null, 4)}</pre>;
                            </div>
                            </div>
                            :null}
                        </div>
                        <div class='col-sm-2 col-lg-pull-2'>
                            <div class="container-fluid">
                                <p>Place for json</p>
                
                            </div>
                        </div>
                
                    </div >
                
                
                </div>

                            );

                }

    }
    export default Diff;