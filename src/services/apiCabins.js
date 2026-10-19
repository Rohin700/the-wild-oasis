import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin count not be deleted");
  }

  return data;
};

export const createEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. Create/edit Cabin
  let query = supabase.from("cabins"); //name of the client

  // 1.A Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // 1.B Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error.message);
    throw new Error("Failed to insert the cabin");
  }

  // 2.Uploading Image to bucket

  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images") //bucket-name
    .upload(imageName, newCabin.image);

  // 3. Deleting the newly cabin in case of error while uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "cabin image could not be uploaded and cabin was not created",
    );
  }

  return data;
};
