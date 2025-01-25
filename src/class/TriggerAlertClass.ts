import { Ref, ref } from "vue";

export default class TriggerAlertClass {
    private showAlert: Ref<Boolean>;
    private smstatus: boolean;
    private sm: string;

    constructor (){
        this.showAlert = ref(false);
        this.smstatus = false;
        this.sm = '';
    }

    get_showAlert(){
        return this.showAlert.value;
    }

    get_smstatus(){
        return this.smstatus
    }

    get_sm(){
        return this.sm;
    }

    set_showAlert(showAlert_: Ref<boolean>){
        this.showAlert.value = showAlert_.value;
    }

    set_sms(smstatus_: boolean, sm_: string){
        this.smstatus = smstatus_;
        this.sm = sm_;
    }
}