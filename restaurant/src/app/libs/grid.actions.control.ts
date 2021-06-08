import { ActionField, ActionOnField, TypeActionField } from './object-filter';
import { BehaviorSubject } from "rxjs"
import { HeaderGrid } from './grid.templates';

export class PaginationConfig{
    constructor(public itemsPerPage: number = 11, public currentPage: number = 0){}
}

export class GridActionControl{

    public header: Array<HeaderGrid>;
    private asc_fields = new Array<ActionField>()
    private desc_fields = new Array<ActionField>()
    private select_fields = new Array<ActionField>()
    public actions = new BehaviorSubject<ActionOnField>(null)
    public pagination_config: PaginationConfig;

    constructor(header: Array<HeaderGrid>, paginationConfig = new PaginationConfig()){
       this.pagination_config = paginationConfig
       this.header = header
    }

    get actual_grid_page(){ return this.pagination_config.currentPage }
    get haveFilter(){
        return !this.header.map(e=>e.filter).every(f=> f == false)
    }
    set actual_grid_page(page: number){
        this.pagination_config.currentPage = page
    }

    setAscField( name ){
        let t = this.asc_fields.filter( e=> e.name == name )
        if( t.length > 0 ){
            this.asc_fields = this.asc_fields.filter(e=> e.name != name )
            return
        }
        this.desc_fields = this.desc_fields.filter(e=> e.name != name )
        this.asc_fields.push( {name} )
        this.actions.next({type:TypeActionField.ASC, keys: this.asc_fields, fields:{
            asc: this.asc_fields,
            desc: this.desc_fields
        }})
    }

    setDescField( name ){
        let t = this.desc_fields.filter( e=> e.name == name )
        if( t.length > 0 ){
            this.desc_fields = this.desc_fields.filter(e=> e.name != name )
            return
        }
        this.asc_fields = this.asc_fields.filter(e=> e.name != name )
        this.desc_fields.push( {name} )
        this.actions.next({type:TypeActionField.DESC, keys: this.desc_fields, fields:{
            asc: this.asc_fields,
            desc: this.desc_fields
        }})
    }
    setSelectField( name ){
        let t = this.select_fields.filter( e=> e.name == name )
        if( t.length > 0 ){
            this.select_fields = this.select_fields.filter(e=> e.name != name )
            this.actions.next({type: TypeActionField.SELECT,keys: this.select_fields})
            return
        }
        this.select_fields.push( {name} )
        this.actions.next({type: TypeActionField.SELECT,keys: this.select_fields})
    }

    fieldClassAction( name, header=true ){
        if( header ) return{
            'header-asc': this.asc_fields.filter( e=> e.name == name ).length > 0,
            'header-desc': this.desc_fields.filter( e=> e.name == name ).length > 0,
            'header-select': this.select_fields.filter( e=>e.name == name ).length > 0
        }
        else return{
            'field-asc': this.asc_fields.filter( e=> e.name == name ).length > 0,
            'field-desc': this.desc_fields.filter( e=> e.name == name ).length > 0,
            'field-select': this.select_fields.filter( e=>e.name == name ).length > 0
        }
    }
    
}