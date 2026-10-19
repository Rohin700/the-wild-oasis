import supabase, { supabaseUrl } from "./supabase";

export async function doSignUp({ fullName, email, password }) {
  /* these are the things this function can receive and to pass the details of the data we have the option parameter which receives an object*/
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function doLogin({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error("Error while getting the current user");

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error);
}

export async function doUpdateCurrUser({ password, fullName, avatar }) {
  let updateData = "";

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  //1. since we have password and the fullName stored in diff tables so we cannot update them altogether
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error("Error while updating the user info");
    console.error(error.message);
  }

  if (!avatar) return data;

  //2. Upload the avata image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatar")
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error("Error while uploading the user avatar");
    console.log(storageError.message);
  }

  //3. Update the avatar in the user Itself;
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatar/${fileName}`,
    },
  });
  if (error2) {
    throw new Error("Error while updating the user avatar");
    console.log(error2.message);
  }
  return updatedUser;
}
