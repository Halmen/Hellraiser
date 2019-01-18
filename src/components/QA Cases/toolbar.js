
import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';


function clickMe(obj) {


    const instance = obj.instance;
    var id = obj.id;
    !instance.setState({
        active: id
    });


}

class Toolbar extends Component {

    constructor(props) {
        super(props);
        }

    render(props, state) {
        
        return(
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-5">
                
                            <h2>{props.name}</h2>
                            <h3>Command batch {props.batch_id}</h3>
                            <div class="btn-group">
                                <a href="#" class="btn btn-primary" id="arrow" name="batch_plus" onClick={props.handleCommandBatch }>+</a>
                                <a href="#" class="btn btn-default" id="arrow" name="batch_minus" onClick={props.handleCommandBatch }>-</a>
                                <a href="#" class="btn btn-default" id="arrow" name="batch_bcw" onClick={props.handleCommandBatch }>←</a>
                                <a href="#" class="btn btn-default" id="arrow" name="batch_frw" onClick={props.handleCommandBatch }>→</a>
                            </div>     
                            <nav class="nav-sidebar">
                                <ul class="nav tabs">
                                    <li  ><h4>Initialize command {props.init_id}</h4> </li>
                                    <li>
                                    <div class="btn-group">
                                        <a href="#" class="btn btn-primary" id="arrow" name="init_plus" onClick={props.handleCommandBatch }>+</a>
                                        <a href="#" class="btn btn-default" id="arrow" name="init_minus" onClick={props.handleCommandBatch }>-</a>
                                        <a href="#" class="btn btn-default" id="arrow" name="init_bcw" onClick={props.handleCommandBatch }>←</a>
                                        <a href="#" class="btn btn-default" id="arrow" name="init_frw" onClick={props.handleCommandBatch }>→</a>
                                    </div> 
                                    </li>
                                    <br></br>
                                    <li>
                                        <div class="btn-group-vertical">
                                            <button type="button" name="init" class="btn btn-primary" id="command" onClick={props.handleCommandBatch }>Composite command </button>
                                            <button type="button" name="init" class="btn btn-primary" id="layer"   onClick={ props.handleCommandBatch}>Layer command</button>  
                                        </div>
                                    </li>
                                </ul>
                                <br></br>
                                <ul class="nav tabs">
                                    <li  ><h4>Run command {props.run_id}</h4></li>
                                    <li>
                                    <div class="btn-group">
                                        <a href="#" class="btn btn-primary" id="arrow" name="run_plus" onClick={props.handleCommandBatch }>+</a>
                                        <a href="#" class="btn btn-default" id="arrow" name="run_minus" onClick={props.handleCommandBatch }>-</a>
                                        <a href="#" class="btn btn-default" id="arrow" name="run_bcw" onClick={props.handleCommandBatch }>←</a>
                                        <a href="#" class="btn btn-default" id="arrow" name="run_frw" onClick={props.handleCommandBatch }>→</a>
                                    </div> 
                                    </li>
                                    <br></br>
                                    <li>
                                        <div class="btn-group-vertical">
                                            <button type="button" name="run" class="btn btn-primary" id="command" onClick={props.handleCommandBatch }>Composite command </button>
                                            <button type="button" name="run" class="btn btn-primary"id="layer"   onClick={ props.handleCommandBatch}>Layer command</button>  
                                        </div>
                                    </li>           
                                </ul>
                            </nav>
                
                
                            <div><h2 class="add"></h2></div>
                        </div>
                
                
                
                    </div>
                </div>







                );
    }
}



export default Toolbar;