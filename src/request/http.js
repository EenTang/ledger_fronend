/*
* @Author: Tang Jiandong
* @Date:   2020-06-09 23:22:48
* @Last Modified by:   tang
* @Last Modified time: 2020-06-14 23:15:47
*/
import axios from "axios";
import { Message } from 'element-ui';
import qs from 'qs';

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://127.0.0.1:5000/';}
else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = 'https://www.ceshi.com';
}
else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'https://www.production.com';
}

axios.defaults.timeout = 10000;


// axios.interceptors.request.use((config) => {
//   if(config.method  === 'post'){
//     config.data = qs.stringify(config.data);
//   }
//   return config;
// },(error) =>{
//   return Promise.reject(error);
// });


export function get(url, params){
    return new Promise((resolve, reject) => {
        axios.get(url, {
          params: params
        }).then(response => resolve(response))
        .catch(error => console.log(error))
    })
};


export function post(url, params){
    return new Promise((resolve, reject) => {
        axios.post(url, {data: params})
        .then(response => resolve(response))
        .catch(error => console.log(error))
    })
};


// 因为 js 不能使用 delete 作为函数名，所以用 remove
export function remove(url, params){
    return new Promise((resolve, reject) => {
        axios.delete(url, {params: params})
        .then(response => resolve(response))
        .catch(error => console.log(error))
    })
};


export function update(url, params){
    return new Promise((resolve, reject) => {
        axios.put(url, {data: params})
        .then(response => resolve(response))
        .catch(error => console.log(error))
    })
};