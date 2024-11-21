<script>
	export default {
		//when the app is first initialized or launched
		onLaunch: function() {
			console.log('App Launch')
		},
		//when the app become visible 
		//place to put refresh function when app is show
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	@import url("style/style.scss");
</style>