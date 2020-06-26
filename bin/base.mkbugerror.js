module.exports = class MkbugError extends Error {
  constructor(status, responseBody) {
    super()
    this.status = status;
    this.body = responseBody;
    this.name = 'MkbugError';
  }
};
