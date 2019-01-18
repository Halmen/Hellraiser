export class Attribute {
    
  constructor(name,knownAs,description,type,mandatory,default_val,folder,layer,method,param,return_param,callback,hidden,deprecated) {
      
    this._name = name;
    this._knowAs = knownAs; 
    this._description = description;
    this._type = type;
    this._mandatory = mandatory;
    this._default_val = default_val;
    this._folder = folder;
    this._layer = layer;
    this._method = method;
    this._param = param;
    this._return_param=return_param;
    this._callback=callback;
    this._hidden=hidden;
    this._deprecated=deprecated;

  }
  
    set name(name){
      this._name=name;
   }
    set knownAs (knownAs){
      this._knownAs=knownAs;
  }
    set description (description){
      this._description=description;
  }
    set type (type){
      this._type=type;
  }
    set mandatory (mandatory){
      this._mandatory=mandatory;
  }
    set default_val (default_val){
      this._default_val=default_val;
  }
    set folder (folder){
      this._folder=folder;
  }
    set layer (layer){
      this._layer=layer;
  }
  
    set method (method){
      this._method=method;
  }
     set param (param){
      this._param=param;
  }
  
    set return_param (return_param){
      this._return_param=return_param;
  }
  
    set callback (callback){
      this._callback=callback;
  }
    set hidden (hidden){
      this._hidden=hidden;
  }
    set deprecated (deprecated){
      this._deprecated=deprecated;
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
  
  get type() {
    return this._type;
  }
  
  get mandatory() {
    return this._mandatory;
  }
  
  get default_val() {
    return this._default_val;
  }
  
  get folder() {
    return this._folder;
  }
  
  get layer() {
    return this._layer;
  }
  
  get method() {
    return this._method;
  }
  
  get param() {
    return this._param;
  }
  
  get return_param() {
    return this._return_param;
  }
  
  get callback() {
    return this._callback;
  }
  
  get hidden() {
    return this._hidden;
  }
  
  get deprecated() {
    return this._deprecated;
  }
}

