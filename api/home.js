import request from "./request";
import apiCaller from "./axois.service";
import { config } from "../constant/config";
let path = "product";
let publicUrl = "/public";
let apiURL = config.apiURL

export const getApiData = (params) => {
	return request({
		url:`https://dummyjson.com/${path}`,
		// method:"GET",
		// params
	})
}

export const getApiData2 = (params) => {
	return request({
		url:`${apiURL}/public/getTop10Token`,
		method:"POST",
		// params
	})
}

