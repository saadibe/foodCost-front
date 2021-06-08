export class ObjectFilterItem {
  constructor(public id: number, public value: string) {}
}
export enum TypeActionField{
  ASC = "ASC",
  DESC = "DESC",
  SELECT = "SELECT"
}
export interface ActionField{
  name?: string;
}
export interface ActionOnField{
  type: TypeActionField;
  keys: Array<ActionField>;
  fields?:any
}
export class DataFilterList{
  constructor(public list = [], public ignore = []){}
}


export class ObjectFilter {
  private global_search_data: Array<ObjectFilterItem>;
  private _data: Array<any>;
  private asc_fields = []
  private desc_fields = []
  private filtred_data = []
  constructor(list: Array<any> = [], public ignore = []) {
    this.data = list;
  }

  set data(list: Array<any>) {
    this.global_search_data = [];
    list.forEach((e) =>
      this.global_search_data.push(
        new ObjectFilterItem(
          e.id,
          this.objectToString(e).join(' ').toLowerCase()
        )
      )
    );
    this._data = [...list];
  }
  get data(){ return this._data }

  public objectToString(obj: any, values = []) {
    for (let key in obj) {
      if( this.ignore.includes(key) )continue;

      if (typeof obj[key] !== 'object') values.push(obj[key]);
      else this.objectToString(obj[key], values);
    }
    return values;
  }

  searchByColumn(name, value){
    
    let filtred_ids = this.data.map(e=> ({id: e.id, val: e[name], isObject: typeof e[name] == 'object'})  )
    .map( e=> {
      e.val = (e.isObject)?this.objectToString(e.val).join(" "):e.val
      return e
    })
    .filter( e=>
      e.val.toString().toLowerCase().includes( value.toString().toLowerCase() )
    ).map(e=> e.id)
      let filtred = this.data.filter(e=> filtred_ids.includes(e.id))
      this.filtred_data = this.sortAsc(this.asc_fields, filtred)
      this.filtred_data = this.sortDesc(this.desc_fields, filtred)
      return this.filtred_data
  }

  searchGlobally(search_with) {
    let vtext = search_with.toLowerCase();
    if (vtext == '') return [...this._data];
    let t = this.global_search_data
      .filter((e) => e.value.includes(vtext))
      .map((e) => this._data.filter((pr) => pr.id == e.id)[0]);
    return t;
  }
  sortList( params: ActionOnField ){
    this.asc_fields = params.fields.asc
    this.desc_fields = params.fields.desc
    if( params.type == TypeActionField.ASC )
      return this.sortAsc(params.keys)
    else if( params.type == TypeActionField.DESC )
      return this.sortDesc( params.keys )
    return null
  }

  private sortAsc(asc_fields: Array<ActionField>, values = []) {
    let list = (values.length == 0)?[...this._data]:values
    asc_fields.forEach((e) => {
      list = list.sort((a, b) => {
          if (a[e.name] < b[e.name]) return -1;
          if (b[e.name] == a[e.name]) return 0;
      });
    });
    return list;
  }

  private sortDesc(desc_fields: Array<ActionField>, values = []) {
    let list = (values.length == 0)?[...this._data]:values
    desc_fields.forEach((e) => {
      list = list.sort((a, b) => {
          if (b[e.name] < a[e.name]) return -1;
          if (b[e.name] == a[e.name]) return 0;
      });
    });
    return list;
  }
}
