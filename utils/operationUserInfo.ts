/**********************************
 * get use profile from Auth
 **********************************/
const userName = ref<string>("");
const userEmail = ref<string>("");
const userImage = ref<string>("");

export const getUserInfoOfGoogle = async (supabaseClient: any) => {
  await supabaseClient.auth.getUser().then((user: any) => {
    userName.value = user.data.user?.user_metadata.full_name as string;
    userEmail.value = user.data.user?.email as string;
    userImage.value = user.data.user?.user_metadata.avatar_url as string;
  });

  return {
    userName,
    userEmail,
    userImage,
  };
};

/**********************************
 * get userInfo from supabase
 **********************************/
export const getUserInfo = async (supabaseClient: any) => {
  let { data: userInfo, error } = await supabaseClient
    .from("userInfo")
    .select("*");
  return userInfo;
};

/**********************************
 * post userInfo to supabase
 **********************************/
export const addUserInfo = async (
  supabaseClient: any,
  name: unknown | string,
  email: unknown | string
) => {
  const { data, error } = await supabaseClient
    .from("userInfo")
    .insert([{ user_name: name, user_email: email }])
    .select();
};

/**********************************
 * delete userInfo to supabase
 **********************************/
export const deleteUserInfo = async (
  supabaseClient: any,
  id: unknown | number
) => {
  const { error } = await supabaseClient.from("userInfo").delete().eq("id", id);
};
