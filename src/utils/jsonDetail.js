
import Inferno from 'inferno';
import Component from 'inferno-component';



class JsonDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }

        this.Looping = this.Looping.bind(this);


    }

    Looping(props) {

        let qa_settings = props.json;
        let settings = [];
        let detail = [];
        let id = props.id;
        
        for (let i in qa_settings) {

            if (id == qa_settings[i].name) {


                settings[i] = qa_settings[i].qa_settings;

                for (let j in settings[i]) {
                       
                       if (typeof settings[i][j] === "boolean" ){
                           detail.push(<tr>
                        <td >{j}</td>   
                        <td ><span class="label label-default">{settings[i][j].toString()}</span></td>        
                    </tr>);
                           
                       }else{
                    detail.push(<tr>
                        <td >{j}</td>   
                        <td ><span class="label label-default">{settings[i][j]}</span></td>        
                    </tr>);
                        }

                }


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
                    <div class="col-sm-6">
                
                        <h1>{props.id}</h1>
                        <h3>{props.desc}</h3>
                    </div>
                </div>

                );
    }
}

export default JsonDetail;
    
     