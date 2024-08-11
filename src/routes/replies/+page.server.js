
import { Blog } from "/src/hooks.server";

export const actions = {
	addReply: async ( {request} ) => {
		const fromClient = await request.json()
		let blogItemTop = JSON.parse(fromClient.blogItemTop);
		await Blog.findByIdAndUpdate({_id: blogItemTop._id}, {replies: blogItemTop.replies}, {new: true})
	},
	delReply: async ({request}) => {
		const fromClient = await request.json()
		await Blog.findByIdAndUpdate({_id: fromClient._id}, {replies: fromClient.replies}, {new: true})
  }
};