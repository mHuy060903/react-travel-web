import { PAGE_SIZE } from "../util/Constants";
import supabase from "../util/supabase";

export async function getAllUser({ searchValue, sortBy, page }) {
  let query = supabase.from("users").select("*", { count: "exact" });

  if (searchValue) {
    query = query.like("email", `%${searchValue}%`);
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }
  return { data, count };
}

export async function favoriteTour({ idUser, idTour }) {
  if (!idUser || !idTour) {
    return null;
  }

  let { data: userBefore, error: error1 } = await supabase
    .from("users")
    .select("*")
    .eq("id", idUser)
    .single();

  if (error1) {
    throw new Error(error1.message);
  }

  let arrayfavorite = userBefore.favoriteTours;
  if (arrayfavorite.includes(idTour)) {
    arrayfavorite = arrayfavorite.filter((id) => id !== idTour);
  } else {
    arrayfavorite.push(idTour);
  }

  const { data: userAfter, error } = await supabase
    .from("users")
    .update({ favoriteTours: arrayfavorite })
    .eq("id", idUser)
    .select()
    .single();

  console.log(userAfter);

  if (error) {
    throw new Error(error.message);
  }

  return userAfter;
}

export async function getAllFavorite(tourFavorite) {
  let { data: tours, error } = await supabase
    .from("tours")
    .select("*")
    .in("id", tourFavorite);
  if (error) {
    throw new Error(error.message);
  }

  return tours;
}
