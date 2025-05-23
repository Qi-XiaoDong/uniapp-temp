<script>
	export default {
		methods: {
			convertLocalFileSystemURL(url){
				let _url = url
				// #ifdef APP
				_url = plus.io.convertLocalFileSystemURL(url);
				// #endif
				return `url(${_url})`
			},
			
			// 加载标题字体
			loadHeadingFont() {
				uni.loadFontFace({
					global: true,
					family: 'SourceHanSansSC-Bold',
					source: this.convertLocalFileSystemURL("/static/font/SourceHanSansSC-Bold.ttf"),
				});
				uni.loadFontFace({
					global: true,
					family: 'SourceHanSansSC-Normal',
					source: this.convertLocalFileSystemURL("/static/font/SourceHanSansSC-Normal.ttf"),
				});
			},
		},
		onLaunch: function() {
			this.loadHeadingFont()
			console.log('App launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			text: '全局变量',
			userInfo: {},
		}
	}
</script>

<style lang="scss">
	// /*每个页面公共css */
	@import "./style/index.css";
	page{
		// font-family: SourceHanSansSC-Normal;
	}
</style>