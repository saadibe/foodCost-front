export class HeaderGrid{
    constructor( public label = "", public key = "", public filter= false){
        if( this.key == "")
        this.key = this.label
    }
    have( value ){
        return this.label == value || this.key == value
    }
    refTo( value ){
        if( value == this.key )return this.label
        if( value == this.label)return this.key
        return null
    }
}



export interface ItemGridFormatter{
    itemFormatter();
}

export class ItemGrid<T extends ItemGridFormatter>{
    constructor(public data: T){}
}


export class ItemWarningState{
    constructor(public positive: boolean = false,
        public warnings: boolean = false,
        public errors: boolean = false){}
}