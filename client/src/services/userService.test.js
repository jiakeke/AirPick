const axios=require('axios') ;
const MockAdapter=require('axios-mock-adapter');
const userService=require('./userService');


const BASE_URL = 'http://localhost:4000/api/users';

describe('userService API tests', () => {
  let mock;

  beforeAll(() => {
    // 初始化 axios-mock-adapter
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    // 重置每个测试后的 mock
    mock.reset();
  });

  test('should login successfully and store token', async () => {
    const mockData = {
      user: { email: 'test@example.com' },
      token: 'mocked-jwt-token',
    };

    // 模拟 axios 的 POST 请求
    mock.onPost(`${BASE_URL}/login`).reply(200, mockData);

    // Mock localStorage
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
          store[key] = value;
        },
        clear: () => {
          store = {};
        },
      };
    })();
    global.localStorage = localStorageMock;

    // 调用 userService 的 login 函数
    await userService.userLogin('test@example.com', 'password');

    // 验证 token 是否被存储在 localStorage 中
    expect(localStorage.getItem('token')).toBe('mocked-jwt-token');
  });

  test('should register a new user successfully', async () => {
    const mockResponse = {
      status: 201,
      data: {
        user: { email: 'newuser@example.com' },
      },
    };

    // 模拟 axios 的 POST 请求
    mock.onPost(`${BASE_URL}/regist`).reply(201, mockResponse);

    // 调用 userService 的 userRegist 函数
    const result = await userService.userRegist('John', 'Doe', 'newuser@example.com', 'password', 'category');

    // 验证返回状态
    expect(result.status).toBe(201);
    expect(result.data.user.email).toBe('newuser@example.com');
  });

  test('should get user with valid token', async () => {
    const mockUser = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
    };

    const token = 'mocked-jwt-token';

    // 模拟 axios 的 GET 请求
    mock.onGet(BASE_URL).reply(200, mockUser);

    // Mock localStorage
    const localStorageMock = (() => {
      let store = { token };
      return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
          store[key] = value;
        },
        clear: () => {
          store = {};
        },
      };
    })();
    global.localStorage = localStorageMock;

    // 调用 userService 的 getUser 函数
    const result = await userService.getUser();

    // 验证返回的数据
    expect(result.status).toBe(200);
    expect(result.data.email).toBe(mockUser.email);
  });
});
