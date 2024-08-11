import { Blog } from "/src/hooks.server";
import { fail } from '@sveltejs/kit';
import { z } from 'zod';

const entrySchema = z.object({
	title:
	 z.string({required_error: 'title is required',
		         invalid_type_error: 'title must be a string'})
	  .min(3, {message: 'title must be at least 3 characters'})
	  .trim(),
	entry: z.string({
		  required_error: 'entry is required',
		  invalid_type_error: 'entry must be a string'
	  })
	  .min(3, {message: 'entry must be at least 3 characters'}),
})

export async function load() {
	let blogs = await(Blog.find())
	blogs = JSON.parse(JSON.stringify(blogs));
  return {blogs};
}

export const actions = {
	delblog: async ({request}) => {
		const body = await request.json()
    console.log('server, delblog', body)
		let res = await Blog.deleteOne({ _id: body._id });
		console.log('res', res)
	},
	addblog: async ({request}) => {
		const data = Object.fromEntries(await request.formData());

		let username = data.username;
		let userid   = data.userid;
		let title    = data.title;
		let entry    = data.entry;


try {
			const result = entrySchema.parse(data);
			//console.log('zod SUCCESS, result', result)
		} catch (err) {
      //console.log('ERROR', err.flatten())
			const { fieldErrors: errors } = err.flatten();
			const { password, ...rest} = data;
			//console.log('rest:', rest, 'errors:', errors)

			return fail(400, {
				type: 'failure',
				data: rest,
				errors
			})
		}

		// add to database here
		const blog = new Blog({
      username: username,
			userid: userid,
      title: title,
      entry: entry,
      likes: 0,
			dislikes: 0,
      replies: []
    })

		//blogs.push(blog)

		await blog.save();

		//console.log('blog added', blog)
		return { 
			status: 200,
			success: true,
			blog: JSON.stringify(blog),
			title: title,
			entry: entry
		}
	}
};