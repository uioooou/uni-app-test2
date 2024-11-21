function request(options){
	let defaultHeader = {
		'token' :uni.getStorageSync('token')
	}
	
	if(options.params) {
		options.data = option.params;
		defaultHeader['Content-Type'] = 'application/x-www-form-urlencoded'
	}
	
	return new Promise((resolve,reject)=>{
		uni.request({
			url:options.url,
			data:options.data,
			method:options.method || "GET",
			header:{
				...options.header
			},
			success: (res) => {
				if(res.statusCode && res.statusCode !== 200){
					uni.showToast({
						icon:"error",
						title: "API error" + res.errMsg
					})
				}else{
					resolve(res.data)
				}
			},
			fail:(err) => {
				uni.showToast({
					icon:"error",
					title:"API fail" + err
				})
				reject(err)
			} 
		})
	})
	
}

export default request;