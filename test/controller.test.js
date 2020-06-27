const request = require('superagent');

describe("Controller", () => {
  it("初始化", () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/index/test')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200)
    }
  });
});
