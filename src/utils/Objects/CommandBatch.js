export class CommandBatch {
    
    
    constructor(id,initialize_commands,run_commands){
        
        this.id=id;
        this._initialize_commands=initialize_commands;
        this._run_commands=run_commands;

    }
    
    set id(id){
         this._id=id;
    }
    set initialize_commands(initialize_commands){
         this._initialize_commands=initialize_commands;
    }
    
    set run_commands(run_commands){
        this._run_commands=run_commands;
    }
    
    get id(){
        return this._id;
    }
    
    get initialize_commands(){
        return this._initialize_commands;
    }
    
    get run_commands(){
        return this._run_commands;
    }
    
    addInitializeCommand(initialize_command){
        if(!this._initialize_commands){
            this._initialize_commands=[];
        }
        this._initialize_commands.push(initialize_command);
    }

    
    addRunCommand(run_command){
        if(!this._run_commands){
            this._run_commands=[];
        }
        this._run_commands.push(run_command);
    }
}