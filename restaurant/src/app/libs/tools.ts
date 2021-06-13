import tippy, {followCursor} from 'tippy.js';

export function makeTippy(id, c){
    return tippy(id, {
      content: c,
      allowHTML: true,
      theme:'light',
      followCursor: 'horizontal',
      plugins: [followCursor],
    })
}
