<template>
	<view>
		<web-view v-if="url" :src="url"></web-view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		ref
	} from "vue";
	const url = ref("");
	onLoad((options) => {
		url.value = options.url;

	});
</script>

<style lang="scss">
</style>