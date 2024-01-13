import { PAGE_SIZE } from "../util/Constants";
import supabase, { supabaseUrl } from "../util/supabase";

export async function createTour({ image, isEdit, id, ...data }) {
  let file_name, file_path;
  const hasChangeImage = !image?.startsWith?.(supabaseUrl);
  file_name = `${new Date().getTime()}_${image[0].name}`;
  file_path = `${supabaseUrl}/storage/v1/object/public/images/${file_name}`;
  let query = supabase.from("tours");
  if (!isEdit) {
    query = query.insert([{ ...data, image: file_path }]).select();
  } else if (isEdit && hasChangeImage) {
    query = query.update({ ...data, image: file_path }).eq("id", id);
  } else {
    query = query.update({ ...data }).eq("id", id);
  }
  const { data: newTour, error } = await query.select().single();

  if (error) {
    throw new Error(error.message);
  }

  if (hasChangeImage) {
    await supabase.storage.from("images").upload(file_name, image[0]);
  }

  return newTour;
}

export async function getAllTours({
  filter,
  sortBy,
  page,
  isHomePage = false,
}) {
  let query = supabase
    .from("tours")
    .select("*, typeTour(name)", { count: "exact" });

  if (filter) {
    query = query.eq("type", filter);
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  if (page && !isHomePage) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  if (isHomePage) {
    query = query.range(0, 7);
  }

  const { data: tours, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return { tours, count };
}

export async function deleteTour(id) {
  const { error } = await supabase.from("tours").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getFourTours(idCurrentTour) {
  const { data: tours, error } = await supabase
    .from("tours")
    .select("*")
    .range(0, 3)
    .neq("id", idCurrentTour);

  if (error) {
    throw new Error(error.message);
  }

  return tours;
}

export async function getTourById(id) {
  const { data, error } = await supabase
    .from("tours")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
