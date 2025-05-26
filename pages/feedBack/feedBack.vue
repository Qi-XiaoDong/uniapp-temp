<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
			<view>14.vue</view>
		<!-- #endif -->
		<button @click="handleClick">打开外部链接地址</button>
		<my-head></my-head>
	</view>
</template>

<script setup>

	import { onLoad, onReady, onShow } from '@dcloudio/uni-app'
	import { onMounted } from 'vue'
	onLoad(() => {
		console.log('14.vue', 'onLoad')
	})
	onReady(() => {
		console.log('14.vue', 'onReady')
	})
	onShow(() => {
		console.log('14.vue', 'onShow')
	})
	onMounted(() => {
		console.log('14.vue', 'onMounted')
	})
	
	const handleClick = () => {
		uni.navigateTo({
			url: '/pages/webView/webView?url=https://www.dcloud.io/&title=DCLOUD官网'
			//url: '/pages/webview?url=/static/html/index.html&title=本地测试'
			// url: '/pages/webView/webView?url=https://m.toutiao.com&title=头条新闻'
		})
	}

	
	
</script>

<style>
	/* #ifdef H5 */
	.box {
		background-color: red;
	}
	/* #endif */
</style>
