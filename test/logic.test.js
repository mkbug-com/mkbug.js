const request = require('superagent');

describe("Logic", () => {
  it("Logic this.Logics.xxx", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/logictest/case1')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
      expect(ret.text).toBe('Mkbug.js from TestLogic');
    }
  });

  it("Logic this.getLogic", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/logictest/case2')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
      expect(ret.text).toBe('Mkbug.js from TestLogic.TestLogic');
    }
  });
})