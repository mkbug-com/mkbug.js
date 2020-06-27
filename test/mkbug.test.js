const request = require('superagent');

describe("Mkbug", () => {
  it("初始化 200", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/heath')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200)
    }
  });

  it("初始化 404", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(404)
    }
  });

  it("初始化 500", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/error')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(500)
    }
  });
});