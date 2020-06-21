/*
 * @Author: Tang Jiandong
 * @Date:   2020-06-21 14:00:33
 * @Last Modified by:   tang
 * @Last Modified time: 2020-06-21 18:37:20
 */

 import { Message } from 'element-ui';


function number_validator(rule, value, callback) {
  var num2 = /^([1-9][\d]{0,}|0)(\.\d{1,2})?$/
  value = '' + value
  if (isNaN(value) || !(num2.test(value))) {
    callback(new Error('请输入数字, 保留2位小数'));
  } else {
    callback();
  }
};

const numValidator = (rule, value, callback) => number_validator(rule, value, callback);

export function incomeDetailRule(client_id_rule) {
  var rule = {
    goods: [
      { required: true, message: "请输入商品", trigger: "blur" }
    ],
    quantity: [
      { required: true, message: "请输入数量", trigger: "blur" },
      {
        validator: numValidator,
        trigger: 'blur'
      }
    ],
    unit: [
      { required: true, message: "请输入单位", trigger: "blur" }
    ],
    unit_price: [
      { required: true, message: "请输入单价", trigger: "blur" },
      {
        validator: numValidator,
        trigger: 'blur'
      }
    ],
  };
  if (client_id_rule) {
    rule.client_id = [
      { required: true, message: "请输入姓名", trigger: "blur" }
    ]
  };
  return rule
};


export const success = (message) => {
    return Message.success(message)
};

export const fail = (message) => {
    return Message.error(message)
};