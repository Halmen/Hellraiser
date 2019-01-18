import {Command} from '../utils/Objects/Command'
import {Composite} from '../utils/Objects/Composite'
import {Attribute} from '../utils/Objects/Attribute'
import {Layer} from '../utils/Objects/Layer'

function getBaseClass(data, layer, value) {



            let base_classes = null;
            if (value) {
                for (let j of value) {
                    for (let i of data) {

                        let layers = i.contents;
                        for (let i of layers) {

                            let name = i.name;
                            if (name === j) {

                                base_classes = i.base_classes;
                                let contents = i.contents;


                                for (let iter of contents) {

                                    if (iter.name === "configure") {
                                        let configure = iter.contents;
                                        for (let c of iter.contents) {
                                            let attribute = new Attribute(c.name, c.knownAs, c.description, c.type, c.mandatory, c.default, c.folder, c.layer, c.method, c.param, c.return_param, c.callback, c.hiddem, c.deprecated);
                                            layer.addConfigure(attribute);
                                        }

                                    } else {
                                        let command_attributes = [];
                                        if (iter.contents) {
                                            let configure = iter.contents;
                                            for (let c of iter.contents) {
                                                let attribute = new Attribute(c.name, c.knownAs, c.description, c.type, c.mandatory, c.default, c.folder, c.layer, c.method, c.param, c.return_param, c.callback, c.hiddem, c.deprecated);
                                                command_attributes.push(attribute);
                                            }

                                            let command = new Command(iter.name, iter.knownAs, iter.description, command_attributes, iter.hidden, iter.deprecated);
                                            layer.addCommands(command)


                                        }
                                    }

                                }
                            }

                        }


                    }
                }

                if (base_classes === null || !base_classes) {
                    return;
                } else {

                    if (data && layer) {
                        return getBaseClass(data, layer, base_classes);
                    }

                }



            }
        }


function getLayerCommands(data, layer_alias, layer_name) {

    let layer = null;

    if (data && layer_alias) {
        let commands = [];
        let attributes = [];


        for (let i of data) {
            let layer_type = i.contents;
            for (let i of layer_type) {



                if (i.knownAs) {

                    if (i.knownAs.includes(layer_alias)) {

                        let commds = i.contents;
                        for (let i of commds) {

                            if (i.name == "configure") {

                                let configure = i.contents;
                                for (let i of configure) {
                                    let attribute = new Attribute(i.name, i.knownAs, i.description, i.type, i.mandatory, i.default, i.folder, i.layer, i.method, i.param, i.return_param, i.callback, i.hiddem, i.deprecated);
                                    attributes.push(attribute);
                                }

                            } else {
                                let command_attributes = [];
                                if (i.contents) {
                                    let configure = i.contents;
                                    for (let i of configure) {
                                        let attribute = new Attribute(i.name, i.knownAs, i.description, i.type, i.mandatory, i.default, i.folder, i.layer, i.method, i.param, i.return_param, i.callback, i.hiddem, i.deprecated);
                                        command_attributes.push(attribute);
                                    }

                                    let command = new Command(i.name, i.knownAs, i.description, command_attributes, i.hidden, i.deprecated);
                                    
                                    commands.push(command);
                                }
                            }

                        }


                        layer = new Layer(layer_name, attributes, commands, i.knownAs, i.description, i.hidden, i.deprecated, i.base_classes);





                    }
                }
            }

        }
        if (layer) {
            //              console.log(layer.base_classes );

            getBaseClass(data, layer, layer.base_classes);
//                 console.log(layer.configure);
//                  console.log("---------------------------------");
        }


    }
    return layer;
}


function getCompositeCommands(json) {

    let data = JSON.parse(json.documentation);

    let commands = [];

    for (let i in data.contents) {

        let layer = data.contents[i].contents;

        if (data.contents[i].name === "Compositing") {

            let composites = data.contents[i].contents;

            for (let i in composites) {

                if (composites[i].name === "Composite") {

                    let content = composites[i].contents;
                    //     console.log(content);

                    for (let i in content) {




                        if (!content[i].callback) {




                            let command = new Command(content[i].name, content[i].knownAs, content[i].description, null, content[i].hidden, content[i].deprecated);

                            //console.log(command.name +" " + content[i].callback);

                            let attrib = content[i].contents;


                            if (attrib) {
                                for (let i in attrib) {

                                    let attribute = new Attribute(attrib[i].name, attrib[i].knownAs, attrib[i].description, attrib[i].type, attrib[i].mandatory, attrib[i].default, attrib[i].folder, attrib[i].layer, attrib[i].method, attrib[i].param, attrib[i].return_param, attrib[i].callback, attrib[i].hidden, attrib[i].deprecated);
                                    command.addAttribute(attribute);

                                }
                            }

                            commands.push(command);
                        }
                    }


                }



            }


        }

    }

    return commands;
}


export function getCompositeLayers(master_js, composite_layer_js) {

    let data = JSON.parse(master_js.documentation);
    let composites = [];
    let composite = new Composite();
    let commands = getCompositeCommands(master_js);


    for (let i of composite_layer_js) {

        let current_composite = new Composite(i.composite_name, null, i.composite_description, null, commands);
        if (composite.name === current_composite.name) {


            let layer = getLayerCommands(data.contents, i.layer_type, i.layer_name);


            composite.addLayer(layer);

        } else {

            if (composite.name) {
                composites.push(composite);
            }

            composite = current_composite;
            let layer = getLayerCommands(data.contents, i.layer_type, i.layer_name);

            composite.addLayer(layer);

        }

    }



    composites.push(composite);

//        for (let i of composites) {
//          console.log(i.layers);
//        }
    return composites;

}


export function getComposite(composites, composite_name) {


    for (let i of composites) {

        if (i.name === composite_name) {
            return i;
        }

    }

}

export function getSelectedNeeded(layer_js, master_js, composite) {

   let responses = []; 
   let response = {
       
        type: null,
        phase: null,
        values: null,
        inputs: null
        


    };

    let data = JSON.parse(master_js.documentation);
   


    for (let i of composite.qa_case) {

        
            for (let j of i.initialize) {
                
                   response.phase="initialize";
                if(j.QACommandType === "Layer"){
                    response.type="layer";
                    let layer_alias = null;
                    let layer_name=j.QALayerName;
                    
                    for(let k of layer_js){
                
                         if(k.name===layer_name){
                          layer_alias=k.type;
                            }
                        }
                  let layer=getLayerCommands(data.contents, layer_alias, layer_name);
                   
                   response.values=j.QACommands;
                   response.inputs=layer;
                   
                   responses.push(response);


            }
            
            if(j.QACommandType === "Composite"){
                response.type="composite";
                let commands = getCompositeCommands(master_js);
             
                response.values=j.QACommands;
                response.inputs=commands;
                responses.push(response);
            }
            
            
        }
            
            for (let j of i.run) {
                response.phase="run";
             if(j.QACommandType === "Layer"){
                    response.type="layer";
                    let layer_alias = null;
                    let layer_name=j.QALayerName;
                    
                    for(let k of layer_js){
                
                         if(k.name===layer_name){
                          layer_alias=k.type;
                            }
                        }
                  let layer=getLayerCommands(data.contents, layer_alias, layer_name);
                   
                   response.values=j.QACommands;
                   response.inputs=layer;
                   
                   responses.push(response);


            }
            
            if(j.QACommandType === "Composite"){
                response.type="composite";
                let commands = getCompositeCommands(master_js);   
                response.values=j.QACommands;
                response.inputs=commands;
                responses.push(response);
            }
            }

    }

 
    return responses;
    

}