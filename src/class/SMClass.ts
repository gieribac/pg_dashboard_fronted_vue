import ShortMessageAP from "../interfaces/ShortMessageAP";
export default class SMClass implements ShortMessageAP {
    // Propiedades privadas para encapsulación
    private _status: boolean;
    private _message: string;
  
    constructor() {
      this._status = true;
      this._message = '';
    }
  
    // Getter y setter para `status` (cumpliendo la interfaz)
    public get status(): boolean {
      return this._status;
    }
  
    public set status(value: boolean) {
      this._status = value;
    }
  
    // Getter y setter para `message` (cumpliendo la interfaz)
    public get message(): string {
      return this._message;
    }
  
    public set message(value: string) {
      this._message = value;
    }
  }