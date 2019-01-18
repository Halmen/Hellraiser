import Inferno , { linkEvent } from 'inferno';
import Component from 'inferno-component';
import './list.css';
import $ from "jquery";


 function deleteObject(obj){

       let del = null;
       
       if (obj.flag){
           del={"id" : obj.name}; 
       } else {
          del={"name" : obj.name};
       }
       
       //eslint-disable-next-line
        let sure=confirm("Do you really want to delete " + obj.name + "?");
        
       if(sure){
        $.ajax({

                   url: obj.url,
                   header: {
                       'content-type': 'application/json; charset=utf-8'
                   },
                   dataType: 'json',
                   type: 'POST',
                   data: del,
                   success: function(data) {
                     console.log(data.message);
                   }.bind(this),
                   error: function(xhr, status, err) {
                       console.error(this.props.url, status, err.toString());
                   }.bind(this)
               });
               //eslint-disable-next-line
               location.reload();
               
        
     }
    }

  

class jsonList extends Component {
    
  
    


    render(props) {
       
    
        let json = props.json;
        let flag = props.flag;
        

        return(
                
    <div className="QAList">
        
    { json ? (
  <div class="container-full">           
   <div className="row">
    <div className="col-sm-12">
    
     { flag ? (
         json.map((val) => (

                    <div class="container-fluid">
                                <div class="row">
                                    
                                    <button type="button" class="col-sm-4 btn btn-default btn-md"   onClick={linkEvent({id: val.id, desc: val.description, instance: this.props.instance},this.props.event)}>{val.name}</button>
                                    <button type="button" class="btn btn-danger btn-sm btn-round"   onClick={linkEvent({name: val.id, flag: flag, url:this.props.url}, deleteObject)}><span class="glyphicon glyphicon-trash"></span></button>

                                </div>
                            </div> ))
                ):
                (
                               json.map((val) => (

                    <div class="container-fluid">
                                <div class="row">
                                    
                                    <button type="button" class="col-sm-4 btn btn-default btn-md"   onClick={linkEvent({id: val.name, desc: val.description, instance: this.props.instance},this.props.event)}>{val.name}</button>
                                    <button type="button" class="btn btn-danger btn-sm btn-round"   onClick={linkEvent({name:val.name, url:this.props.url}, deleteObject)}><span class="glyphicon glyphicon-trash"></span></button>

                                </div>
                            </div>))
                                    
                               )}
       
     
        </div>
    </div>
    </div>
    ) : (
    <p className="lead">
        <em>Loading...(if you're really seeing this meens it's not getting data :P daaa!!!!)</em>
    </p>
    ) }
    
 </div>
                
                );
            }
}

export default jsonList;