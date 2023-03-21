let db = uniCloud.database({
	throwOnNotFound: false,
})
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	if (event.api === 'publish') {
		return await db.collection('message').add({
			content: event.content,
			publish: true
		})
	}

	if (event.api === 'getMessage') {
		return await db.collection('message').where({
			publish: true
		}).get();
	}

	if (event.api === 'remove') {
		return await db.collection('message').doc(event._id).remove();
	}

	//返回数据给客户端
	return '新消息提醒'
};
