import request from "./request";
import { config } from "../constant/config";
let apiURL = config.apiURL
let path = "product";

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

