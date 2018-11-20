import { createStore, applyMiddleware } from 'redux';
// import promiseMiddleware from 'redux-promise';

import getReducers from '../reducer';
//promiseMiddleware 是异步action的一个中间件，本例子中暂时没有使用
export default function getStore(navReducer) {
    return createStore(
        getReducers(navReducer),
        undefined,
        applyMiddleware()
    );
}

// 作者：寻梦米探长
// 链接：https://www.jianshu.com/p/8063ba79d08f
// 來源：简书
// 简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。