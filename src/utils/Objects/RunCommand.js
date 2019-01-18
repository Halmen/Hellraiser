export class RunCommand {

    constructor(id, composite_command_id, layer_command_id, type, command, layer) {

        this._id = id;
        this._composite_command_id = composite_command_id;
        this._layer_command_id = layer_command_id;
        this._type = type;
        this._command = command;
        this._layer = layer;

    }

    set id(id) {
        this._id = id;
    }

    set composite_command_id(composite_command_id) {
        this._composite_command_id = composite_command_id;
    }

    set layer_command_id(layer_command_id) {
        this._layer_command_id = layer_command_id;
    }

    set type(type) {
        this._type = type;
    }

    set command(command) {
        this._command = command;
    }

    set layer(layer) {
        this._layer = layer;
    }

    get id() {
        return this._id;
    }

    get composite_command_id() {
        return this._composite_command_id;
    }

    get layer_command_id() {
        return this._layer_command_id;
    }
    get type() {
        return this._type;
    }
    get command() {
        return this._command;
    }
    get layer() {
        return this._layer;
    }

}