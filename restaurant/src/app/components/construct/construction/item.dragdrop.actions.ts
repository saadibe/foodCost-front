import { BehaviorSubject } from "rxjs";

export let RemovedItem = new BehaviorSubject<any>( null );
export let DragItem = new BehaviorSubject<boolean>( false );
export let onChooseProduct = new BehaviorSubject<any>( null );
export let onRejectProduct = new BehaviorSubject<boolean>( false );
