import { FormAction, ViewMode } from "./ViewModes.enum";

export class ViewSwitcherController{
    public item_edit = null
    public form_mode: FormAction = FormAction.CREATE;
    constructor(
        private view: ViewMode = ViewMode.GRID,
        public canEditItem: boolean = false
    ){}

    set viewMode( mode: ViewMode ){ this.view = mode }
    get viewMode(){ return this.view }
}