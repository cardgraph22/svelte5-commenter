import { User } from "/src/hooks.server";
import { fail } from '@sveltejs/kit';
import { z } from 'zod';

const loginSchema = z.object({
	username:
	 z.string({required_error: 'Username is required',
		         invalid_type_error: 'username must be a string'})
	  .min(3, {message: 'Username  must be at least 3 characters'})
	  .trim(),
	password: z.string({
		  required_error: 'Password is required',
		  invalid_type_error: 'Password must be a string'
	  })
	  .min(3, {message: 'Password must be at least 3 characters'}),
})

export const actions = {
	login: async ({request}) => {
		const formData = Object.fromEntries(await request.formData());

		let username = formData.username;
		let password = formData.password;
		let newuser  = formData.newuser;

		//  check for input errors (validation (zod))
		try {
			const result = loginSchema.parse(formData);
			//console.log('zod SUCCESS, result', result)
		} catch (err) {
			//console.log('err bef flatten', err)
      console.log('ERROR', err.flatten())

			//  pull fieldErrors out of err object
			//  rename fieldErrors to errors
			const { fieldErrors: errors } = err.flatten();
			//  rip out the password
			//  return values they had before (with updated error messages)
			const { password, ...rest} = formData;
			console.log('rest:', rest, 'errors:', errors)

			return fail(400, {
				type: 'failure',
				data: rest,
				errors
			})
		}
		
		//  passed validation, check if user exists
		let result = await User.find({username: username, password: password})

		//  check for mongoDB errors (user not found)
		if(result.length > 0){
      return  {
        success: true,
        message: 'User Logged In',
        _id: result[0]._id.toString(),
        username: result[0].username,
        imagename: result[0].imagename
      }
		}
		else {
			//  user not found, check if newuser box checked
			if(newuser==='newuser'){
				//console.log('server side add new user here')
				// add user to database
		    const user = new User({
          username,
          password,
          imagename: 'icon.png'
        })
		    let newuser = await user.save();

				//  check for failure?
				return  {
					success: true,
					message: 'New User added',
					_id: newuser._id.toString(),
					username,
					newuser: newuser.imagename
				}

      // user not found and new user box not checked, issue error
			}
			return fail(400, {
				error: true,
				message: 'User not found',
				username
			})
    }
  }
}