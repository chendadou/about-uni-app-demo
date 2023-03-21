<template>
	<view class="content">
		<input type="text" class="input" v-model="state.content" placeholder="请输入">
		<button type="primary" @click="publish()" size="mini">发布</button>
	</view>
	<view v-for="item in state.list" :key="item._id">
		<view class="box">
			<view>{{item.content}}</view>
			<button type="warn" size="mini" @click="remove(item._id)" class="remove-btn">删除</button>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		onMounted
	} from 'vue';

	const state = reactive({
		content: '',
		list: [],
	});

	onMounted(() => {
		getMessage();
		uni.showModal({
			title: '用户需知',
			content: '测试一下',
			success: (confirm, cancel) => {
				if (confirm) {
					uni.getSetting({
						success: res => {
							console.log('res.authSetting', res.authSetting)
						}
					})
				}
				if (cancel) {

				}
			}
		});
	})

	function getMessage() {
		uniCloud.callFunction({
			name: 'fun',
			data: {
				api: 'getMessage',
			},
		}).then(res => {
			state.list = res.result.data.reverse();
		});
	}

	function publish() {
		if (state.content) {
			uni.showLoading({
				title: '留言上传中...'
			});
			uniCloud.callFunction({
				name: 'fun',
				data: {
					api: 'publish',
					content: state.content
				}
			}).then(res => {
				console.log('publish', res);
				getMessage();
				uni.showToast({
					title: '留言成功！',
					icon: 'success'
				});
				state.content = '';
			});
		} else {
			uni.showToast({
				title: '请输入留言内容！',
				icon: 'none'
			});
		}
	}

	function remove(id) {
		uni.showLoading({
			title: '删除中...'
		});
		uniCloud.callFunction({
			name: 'fun',
			data: {
				api: 'remove',
				_id: id
			}
		}).then(res => {
			getMessage();
			uni.showToast({
				title: '删除成功！',
				icon: 'success'
			});
			console.log('remove', res);
		});
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		align-items: center;
		margin: 40rpx;
	}

	.input {
		border-bottom: 1px solid #ccc;
		padding: 6rpx;
		flex: 1;
	}

	.box {
		margin: 40rpx;
		border-bottom: 1px solid #ccc;
		padding: 10rpx 0;

		.remove-btn {
			margin-top: 10rpx;
		}
	}
</style>
