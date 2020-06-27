const request = require('superagent');

describe("Plugin", () => {
  it("Plugin生效判断", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/heath')
    } catch (err) {
      ret = err;
    } finally {
      const cookie = ret.headers['set-cookie'].join(',');
      expect(cookie).toMatch('plugin=true');
    }
  });
});
