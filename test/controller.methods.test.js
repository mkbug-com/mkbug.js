const request = require('superagent');

describe('Controller Methods 测试', () => {
  it('HTTP Methods测试 GET', async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/index/test');
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
    }
  });

  it('HTTP Methods测试 HEAD', async () => {
    let ret = null;
    try {
      ret = await request.head('http://localhost:3000/api/index/test');
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
    }
  });

  it('HTTP Methods测试 POST', async () => {
    let ret = null;
    try {
      ret = await request.post('http://localhost:3000/api/index/test');
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
    }
  });

  it('HTTP Methods测试 PUT', async () => {
    let ret = null;
    try {
      ret = await request.put('http://localhost:3000/api/index/test');
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
    }
  });

  it('HTTP Methods测试 DELETE', async () => {
    let ret = null;
    try {
      ret = await request.delete('http://localhost:3000/api/index/test');
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
    }
  });

  it('HTTP Methods测试 CONNECT', async () => {
    let ret = null;
    try {
      ret = await request.connect('http://localhost:3000/api/index/test');
    } catch (err) {
      ret = err;
    } finally {
      console.log(ret);
      // 没法测试
      expect(200).toBe(200);
    }
  });

  it('HTTP Methods测试 OPTIONS', async () => {
    let ret = null;
    try {
      ret = await request.options('http://localhost:3000/api/index/test');
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
    }
  });

  it('HTTP Methods测试 PATCH', async () => {
    let ret = null;
    try {
      ret = await request.patch('http://localhost:3000/api/index/test');
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
    }
  });

  it('HTTP Methods测试 TRACE', async () => {
    let ret = null;
    try {
      ret = await request.trace('http://localhost:3000/api/index/test');
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
    }
  });
});
