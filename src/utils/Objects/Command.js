
export class Command {
    
    
 constructor(name, knownAs, description, attributes, hidden, deprecated) {
        this._name = name;
        this._knownAs = knownAs;
        this._description = description;
        this._attributes =attributes;
        this._hidden = hidden;
        this._deprecated = deprecated;
    }

    set name(name){
        this._name = name;
 
    }
    set knownAs(knownAs) {
        this._knownAs = knownAs;
  
    }
    set description(description) {
        this._description = description;
    
    }
    
     set attributes(attributes) {
        this._attributes = attributes;
       
    }

    set hidden(hidden) {
        this._hidden = hidden;
       
    }

    set deprecated(deprecated) {
        this._deprecated = deprecated;
  
    }
    
    get name(){
        return this._name;
    }

    get knownAs(){
        return this._knownAs;
    }

    get description(){
        return this._description;
    }
    
    get attributes(){
        
        return this._attributes;
    }

    get hidden(){
        return this._hidden;
    }
    get deprecated(){
        return this._deprecated;
    }
    
   
   addAttribute(attribute){
       if(!this._attributes){
           this._attributes=[];
       }
       this._attributes.push(attribute);
       
   }

  
  printAttributes(){
      
      console.log(this._attributes);
  }
  
  
  }