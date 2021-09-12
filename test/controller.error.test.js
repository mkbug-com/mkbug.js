const request = require('superagent');

describe('Controller Error', () => {
  it('Error from before String', async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/errortest?type=StringError');
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(400);
      expect(ret.response.text).toBe('Error Message');
    }
  });

  it('Error from before Json', async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/errortest?type=JsonError');
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(400);
      expect(ret.response.body).toEqual({ msg: 'Error Message' });
    }
  });

  it('Error from func', async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/errortest');
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(405);
      expect(ret.response.text).toBe('Request not allowed!');
    }
  });

  it('Error from return', async () => {
    let ret = null;
    try {
      ret = await request.get('http://localhost:3000/api/errortest/case');
    } catch (err) {
      ret = err;
    } finally {
      expect(ret.status).toBe(200);
      expect(ret.body).toEqual({
        status: 405,
        body: 'Request not allowed!',
        name: 'MkbugError'
      });
    }
  });
});
