import supabase from "../util/supabase";

export async function inserComment(comment) {
  const { data, error } = await supabase
    .from("comments")
    .insert([comment])
    .select();

  if (error) {
    console.log(error.message);
  }

  return data;
}

export async function getCommentTour(idTour, sortBy) {
  let query = supabase
    .from("comments")
    .select("*, users(*)", { count: "exact" })
    .eq("idTour", idTour);

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  const { data: comments, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return { comments, count };
}
