# get-async
get something asynchronously without repetition 


## usage

```js
import getAsync from 'get-async';

let called = 0;

function getTimer() {
  called++;
  return new Promise<number>(resolve => {
    setTimeout(() => {
      resolve(called);
    }, 100);
  });
}

const call1 = getAsync<number>('timer', getTimer);

const call2 = getAsync<number>('timer', getTimer);

const ret = await Promise.all([call1, call2]);

expect(ret).toMatchInlineSnapshot(`
  Array [
    1,
    1,
  ]
`);
expect(called).toBe(1);
```
