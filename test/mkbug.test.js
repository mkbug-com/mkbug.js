const axios = require('axios');

describe("Mkbug", () => {
  it("初始化Express实例", async () => {
    const ret = await axios.get('http://localhost:3000');
    expect(ret).toBe(404);
  });
});