const request = require('superagent');

describe("Util", () => {
  it("Util this.Utils.xxx", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/utiltest/case1')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
      expect(ret.text).toBe('Mkbug said Hello from TestUtil!');
    }
  });

  it("Util this.getUtil", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/utiltest/case2')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
      expect(ret.text).toBe('Mkbug said Hello from TestUtil.TestUtil!');
    }
  });
})