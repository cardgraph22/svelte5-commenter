import { User } from "/src/hooks.server";

export async function load() {
  let users = await(User.find())
  //  !!! use the following for production (do not return password)
  //users = JSON.parse(JSON.stringify(users,['_id', 'username', 'imagename']));
  users = JSON.parse(JSON.stringify(users));
  return {users};
}

// delete user
export const actions = {
	default: async ({request}) => {
    const formData = Object.fromEntries(await request.formData());
    let userid = formData.userid
    const result = await User.findByIdAndDelete(userid);
	}
};