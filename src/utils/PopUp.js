
import Inferno from 'inferno';
import Component from 'inferno-component';



class PopUp extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }

        this.Looping = this.Looping.bind(this);


    }

    Looping(props) {

        let states = props.states;
        let detail=[];

        for (let i in states) {

              if(states[i]!=="none" && states[i]!==null && i!="dialog"){
                    detail.push(<tr>
                        <td >{i}</td>   
                        <td ><span class="label label-default">{states[i]}</span></td>        
                    </tr>);
            
              }

                }

   return detail;
   
   
   
    }

    render(props) {


        return(
                <div class="border row">
                
                    <div class="col-sm-6">
                        <table class="table">
                            <thead class="thead-inverse">
                                <tr>
                                    <th>Attribute</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.Looping(props) ? (
                                        
                                            this.Looping(props)) : (
                                            
                                    <div class="alert alert-danger">
                                        <strong>Data not found! - get Tibor or Øystein </strong> .
                                    </div>
                                    
                                        )
                            }
                            </tbody>
                        </table>
                    </div>
                   
                </div>

                );
    }
}

export default PopUp;
    
     