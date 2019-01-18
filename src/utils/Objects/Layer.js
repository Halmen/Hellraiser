
export class Layer {

    constructor(name, configure, commands, knownAs, description, hidden, deprecated, base_classes) {
        this._name = name;
        this._knownAs = knownAs;
        this._description = description;
        this._configure = configure;
        this._commands=commands;
        this._hidden = hidden;
        this._deprecated = deprecated;
        this._base_classes=base_classes;
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
    
    set configure(configure) {
        this._configure = configure;
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
    
    set base_classes(base_classes) {
        this._base_classes = base_classes;
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
    
     get configure() {
        return this._configure;
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
    
    get base_classes() {
        return this._base_classes;
    }
    
    addConfigure(configure){
        if(!this._configure){
            this._configure=[];
        }
        this._configure.push(configure);
        
    }
    
    addCommands(commands){
        if(!this._commands){
            this._commands=[];
        }
        this._commands.push(commands);
        
    }
    
    getCommand(command_name){
        
        for (let i of this._commands){
            if(i.name===command_name){
                return i;
            }
            
        }
        
    }
    
      printConfigure(){
      
      console.log(this._configure);
  }
    
    printCommand(){
        console.log(this._commands);
    }
  

}