const request = require('superagent');

describe("Controller Header", () => {
  it("Header from client", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/headerapitest')
      .set('from-header', 'from-header')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
      expect(ret.text).toBe('from-header');
    }
  });

  it("Header from server", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/headerapitest/header')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
      expect(ret.header['from-header']).toBe('from-header');
    }
  });

  it("Ip test", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/headerapitest/ip')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
      expect(ret.text).toBe('::ffff:127.0.0.1');
    }
  });

  it("Ip test", async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/headerapitest/ips')
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
      expect(ret.text).toBe('[]');
    }
  });
})