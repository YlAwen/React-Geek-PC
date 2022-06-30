// 封装localStorage操作

const TOKEN_KEY = "geekPcToken";

/**
 * 保存token
 * @param {*} token
 * @returns
 */
export const setToken = (token) => {
  return localStorage.setItem(TOKEN_KEY, token);
};

/**
 * 获取token
 * @returns token
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * 清除token
 * @returns
 */
export const removeToken = () => {
  return localStorage.removeItem(TOKEN_KEY);
};

/**
 * 判断是否有token
 * @returns 布尔值
 */
export const hasToken = () => {
  return !!getToken();
};
