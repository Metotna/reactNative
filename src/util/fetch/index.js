'use strict'

import qs from 'query-string'
/* 检查状态码 */
function checkStatus(response) {
  return response.json()
}
/* 检查返回自定义 状态码 */
function checkCode(response) {
  return response
}

export default {
  get(url, params) {
    if (params) {
      url += qs.stringify(params)
    }
    return fetch(url)
      .then(response => checkStatus(response))
      .then(res => checkCode(res))
  },
  post(url, data) {
    var options = Object.assign({
      body: qs.stringify(data),
    }, {
        method: 'POST',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
      })
    return fetch(url, options)
      .then(response => checkStatus(response))
      .then(res => checkCode(res))
  },
  postForm(url, data) {
    var body = new FormData();
    for (var key in data) {
      body.append(key, data[key])
    }
    return fetch(url, {
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
