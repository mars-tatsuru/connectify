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

export const getOtherUserInfo = async (supabaseClient: any) => {
  const { data, error } = await supabaseClient.from("users").select("*");

  return { data };
};
