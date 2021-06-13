import { ElementRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';


export function watchField(element: ElementRef, event: string = 'input', debounce: number = 650): Observable<any>{
    return fromEvent<any>(element.nativeElement, event)
    .pipe(map(ev=>ev['target'].value))
    .pipe(debounceTime( debounce ), distinctUntilChanged())
}