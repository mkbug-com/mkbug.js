const request = require('superagent');

describe("Controller Params", () => {
  it("Controller文件名定义param取值", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/params/case1/param1')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200)
      expect(ret.text).toBe('param1')
    }
  });

  it("Controller文件夹名定义param取值", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/params/case2/param2/paramcase2')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200)
      expect(ret.text).toBe('param2')
    }
  });

  it("Controller文件夹名定义param取值", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/params/case2/param3/param/param4')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200)
      expect(ret.body).toEqual({"id": "param3", "subId": "param4"})
    }
  });
})
