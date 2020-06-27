const request = require('superagent');

describe("Controller Response测试", () => {
  it("Response String", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/responsetest/string')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
      expect(ret.text).toBe('ok');
    }
  });

  it("Response Number", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/responsetest/number')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
      expect(ret.body).toBe(10086);
    }
  });

  it("Response JSON", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/responsetest/json')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
      expect(ret.body).toEqual({ msg: 'ok' });
    }
  });

  it("Response Buffer", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/responsetest/buffer')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
      expect(ret.text).toEqual('10086');
    }
  });

  it("Response Stream", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/responsetest/stream')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
      expect(ret.text).toEqual('10086');
    }
  });
})