/*
* @Author: Tang Jiandong
* @Date:   2020-06-09 23:12:41
* @Last Modified by:   tang
* @Last Modified time: 2020-06-21 17:04:59
*/
import {get, post, remove, update, patch} from '@/request/http';

export const getClientInfo = params => get('api/v1/client-info', params);

// income details
const income_details_url = 'api/v1/income/details/';
export const getIncomeDetails = params => get(income_details_url, params);
export const addIncomeDetails = params => post(income_details_url, params);
export const deleteIncomeDetail = params => remove(income_details_url, params);
export const updateIncomeDetail = params => update(income_details_url, params);
export const hasPayed = params => patch(income_details_url, params);

// income general
const income_general_url = 'api/v1/income/general/';
export const getIncomeGeneral = params => get(income_general_url, params);
export const addIncomeGeneral = params => post(income_general_url, params);
export const updateIncomeGeneral = params => update(income_general_url, params);
export const deleteIncomeGeneral = params => remove(income_general_url, params);