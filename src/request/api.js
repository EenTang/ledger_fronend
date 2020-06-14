/*
* @Author: Tang Jiandong
* @Date:   2020-06-09 23:12:41
* @Last Modified by:   tang
* @Last Modified time: 2020-06-14 23:27:23
*/
import {get, post, remove, update} from '@/request/http';

export const getClientInfo = params => get('api/v1/client-info', params);

// income details
const income_details = 'api/v1/income/details/'
export const getIncomeDetails = params => get(income_details, params);
export const addIncomeDetails = params => post(income_details, params);
export const deleteIncomeDetail = params => remove(income_details, params);
export const updateIncomeDetail = params => update(income_details, params);