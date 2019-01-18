
export class Composite {

    constructor(name, knownAs, description, layers, commands, hidden, deprecated) {
        this._name = name;
        this._knownAs = knownAs;
        this._description = description;
        this._layers = layers;
        this._commands = commands;
        this._hidden = hidden;
        this._deprecated = deprecated;
    }

    set name(name) {
        this._name = name;
    }
    set knownAs(knownAs) {
        this._knownAs = knownAs;
    }
    set description(description) {
        this._description = description;
    }

    set layers(layers) {
        this._layers = layers;
    }

    set commands(commands) {
        this._commands = commands;
    }

    set hidden(hidden) {
        this._hidden = hidden;
    }

    set deprecated(deprecated) {
        this._deprecated = deprecated;
    }

    get name() {
        return this._name;
    }

    get knownAs() {
        return this._knownAs;
    }

    get description() {
        return this._description;
    }

    get layers() {
        return this._layers;
    }

    get commands() {
        return this._commands;
    }

    get hidden() {
        return this._hidden;
    }
    get deprecated() {
        return this._deprecated;
    }

    addLayer(layer) {
        if(!this._layers){
           this._layers=[];
        }
        this._layers.push(layer);
    }

    printLayers() {

        console.log(this._layers);
    }

    printCommands() {

        console.log(this._commands);
    }
    
    getLayer(layer_name){
        
        for (let i of this._layers){
            if(i.name===layer_name){
                return i;
            }
            
        }
    }
    getCommand(command_name){
        
        for (let i of this._commands){
            if(i.name===command_name){
                return i;
            }
            
        }    
        
        
        
        
    }

}