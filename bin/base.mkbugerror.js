class MkbugError extends Error {
  constructor(status, responseBody) {
    super();
    this.status = status || 405;
    this.body = responseBody || 'Request not allowed!';
    this.name = 'MkbugError';
  }
}

Object.freeze(MkbugError.prototype);

module.exports = MkbugError;
