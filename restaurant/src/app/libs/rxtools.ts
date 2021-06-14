import { ElementRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';


export function watchField(element: ElementRef, debounce: number = 350, event: string = 'input'): Observable<any>{
    return fromEvent<any>(element.nativeElement, event)
    .pipe(map(ev=>ev['target'].value))
    .pipe(debounceTime( debounce ), distinctUntilChanged())
}