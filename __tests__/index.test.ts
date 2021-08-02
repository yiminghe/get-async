import getAsync, { isLoaded } from '../src/index';

describe('get async', () => {
  it('works', async () => {
    let called = 0;

    function getTimer() {
      called++;
      return new Promise<number>(resolve => {
        setTimeout(() => {
          resolve(called);
        }, 100);
      });
    }

    expect(isLoaded('timer')).toBe(false);

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
    expect(isLoaded('timer')).toBe(true);
  });
});
