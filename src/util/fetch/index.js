'use strict'

import qs from 'query-string'
import Storage from '../asyncStorage/'
import BASE from './config'
import { NavigationActions } from 'react-navigation';
import NavigationService from './NavigationService'
/* Intranet 测试  Internet 线上 */
const networkEnvironment = BASE.Intranet.url;
/* 检查状态码 */
function checkStatus(response) {
  return response.json()
}
/* 检查返回自定义 状态码 */
function checkCode(response) {
  if (response.status==501) {
    NavigationService.navigate("login")
    return false
  }
  return response
}
global.http = {
  get(url, params) {
    if (params) { url += qs.stringify(params) }
    return fetch(networkEnvironment + url)
      .then(response => checkStatus(response))
      .then(res => checkCode(res))
  },
  async loadingPost(url, data, flag) {
    if (!flag) {
      const token = await Storage.get('token')
      data.token = token;
    }
    var options = Object.assign({
      body: qs.stringify(data),
    }, {
        method: 'POST',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
      })
    // console.log(networkEnvironment + url, options)
    showLoading()
    return fetch(networkEnvironment + url, options)
      .then(response => checkStatus(response))
      .then(res => {
        closeLoading()
        return checkCode(res)
      })
      .catch(err => {
        closeLoading()
      })
  },
  async post(url, data, flag) {
    if (!flag) {
      const token = await Storage.get('token')
      data.token = token;
    }
    var options = Object.assign({
      body: qs.stringify(data),
    }, {
        method: 'POST',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
      })
    // console.log(networkEnvironment + url, options)
    return fetch(networkEnvironment + url, options)
      .then(response => checkStatus(response))
      .then(res => {
        // NavigationService.navigate('login', { userName: 'Lucy' });
        return checkCode(res)
      })
      .catch(err => {
      })
  },
  postForm(url, data) {
    var body = new FormData();
    for (var key in data) {
      body.append(key, data[key])
    }
    return fetch(networkEnvironment + url, {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body
    })
      .then(response => checkStatus(response))
      .then(res => checkCode(res))
  },
}