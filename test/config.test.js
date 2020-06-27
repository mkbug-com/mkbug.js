const Config = require('../bin/base.config');

describe("Config", () => {
  it("初始化 默认路径", () => {
    const case1 = new Config('case1');
    console.log(case1)
    expect(case1).toEqual({})
  });

  it("初始化 指定路径", () => {
    const case1 = new Config('case1', './example');
    expect(case1).toEqual({msg: 'test1'})
  });

  it("初始化 JEST 覆盖 1", () => {
    process.env.NODE_ENV = 'JEST';
    const case2 = new Config('case2', './example');
    expect(case2).toEqual({msg: 'test2'})
  });

  it("初始化 JEST 覆盖 2", () => {
    process.env.NODE_ENV = 'JEST';
    const case3 = new Config('case3', './example');
    expect(case3).toEqual({
      msg: 'test2',
      msg1: 'test2',
      msg2: 'test2'
    })
  });

  it("初始化 JEST 覆盖 3", () => {
    process.env.NODE_ENV = 'JEST';
    const case3 = new Config('case3', './example');
    expect(case3.msg2).toBe('test2')
  });
});
