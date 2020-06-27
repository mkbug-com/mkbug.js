const request = require('superagent');

describe("Model", () => {
  it("Model this.Models.xxx", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/modeltest/case1')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
      expect(ret.text).toBe('Mkbug.js from TestModel');
    }
  });

  it("Model this.getModel", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/modeltest/case2')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
      expect(ret.text).toBe('Mkbug.js from TestModel.TestModel');
    }
  });
})