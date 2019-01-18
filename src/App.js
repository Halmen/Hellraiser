import Inferno from 'inferno';
import { Link } from 'inferno-router';



import './App.css';



export const App = ({children}) => (
	<div class="container-fluid">
                
                    <nav class="navbar navbar-inverse">
                        <div class="container">
                
                            <div class="navbar-header">
                                <a class="navbar-brand"  >myVR QA Tool</a>
                            </div>
                
                
                            <div class="collapse navbar-collapse" id="navbar-collapse-3">
                                <ul class="nav navbar-nav navbar-left">
                                   <li><Link to="/qa_results">QA RESULTS</Link></li>
                                  <li> <Link to="/qa_runs">QA RUNS</Link></li>
                                  <li> <Link to="/qa_settings">QA SETTINGS</Link></li>
                                   <li><Link to="/qa_composites">QA COMPOSITES</Link></li>
                                   <li><Link to="/qa_layers">QA LAYERS</Link></li>
                                   <li><Link to="/qa_cases">QA CASES</Link></li>
                                   <li><Link to="/qa_devices">QA DEVICES</Link></li>
                                   <li><Link to="/qa_miscelleaneous">MISCELLANEOUS</Link></li>
                                   <li><Link to=""></Link></li>
                                </ul>  
                            </div>
                        </div>
                    </nav>
                    <div class="row">
                     <div className="col-sm-9">
                      { children }
                    </div>
                 </div>   

                </div>

  );
                                                

export const NoMatch = () => (
	<div className="layer">
		<p>+1 point if you're not Øystein and you are seeing this</p>
	</div>
);
