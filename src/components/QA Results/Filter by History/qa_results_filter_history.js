import Inferno from 'inferno';
import Component from 'inferno-component';

class Filter_by_history extends Component {
  render(props) {

    return(
      <div className="list-group">
            
              <div className="list-group-item">
                <h4 className="list-group-item-heading">Pronunciation</h4>
              </div>
              <div className="list-group-item">
                <h4 className="list-group-item-heading">Meaning of Name</h4>
              
              </div>
              <div className="list-group-item">
                <h4 className="list-group-item-heading">Period</h4>
              
              </div>
              <div className="list-group-item">
                <h4 className="list-group-item-heading">Diet</h4>
               
              </div>
              <div className="list-group-item">
                <h4 className="list-group-item-heading">Length</h4>
               
              </div>
              <div className="list-group-item">
        
              </div>
            </div>
          
     
    );
  }
};

export default Filter_by_history;