const request = require('superagent');

describe('Plugin', () => {
  it('Plugin生效判断 通过', async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/plugintest');
    } catch (err) {
      ret = err;
    } finally {
      const cookie = ret.headers['set-cookie'].join(',');
      expect(cookie).toMatch('plugin=true');
    }
  });

  it('Plugin生效判断 阻断String类型', async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/plugintest?type=plugin2');
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(400);
      expect(ret.response.text).toBe('test string');
    }
  });

  it('Plugin生效判断 阻断Json类型', async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/plugintest?type=plugin3');
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(400);
      expect(ret.response.body).toEqual({ msg: 'test json' });
    }
  });
});
