import { PAGE_SIZE } from "../util/Constants";
import { getToday } from "../util/Helper";
import supabase from "../util/supabase";

export async function insertBooking(booking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([booking])
    .select();

  if (error) {
    console.log(error.message);
  }

  return data;
}

export async function getAllBookingInCart(idUser) {
  let { data: bookings, error } = await supabase
    .from("bookings")
    .select("*, tours(*)")
    .eq("idUser", idUser)
    .eq("status", "in-cart");

  if (error) {
    console.log(error.message);
  }

  return bookings;
}

export async function deleteBooking(id) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.log(error.message);
  }
}

export async function updateBookingCheckout(id) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ status: "is-process" })
    .eq("id", id)
    .select();

  if (error) {
    console.log(error.message);
  }

  return data;
}

export async function updateBookingCheckoutSuccess(id) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ status: "success" })
    .eq("id", id)
    .select();

  if (error) {
    console.log(error.message);
  }

  return data;
}

export async function getAllBooking(filter, sortBy, page) {
  let query = supabase
    .from("bookings")
    .select("*, users(email), tours(name)", { count: "exact" });

  if (filter) {
    query = query.eq("status", filter);
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

  const { data: bookings, error, count } = await query;

  if (error) {
    console.log(error.message);
  }

  return { bookings, count };
}

export async function getBookingAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("status", "success")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.log(error.message);
  }

  return data;
}

export async function getBookingSuccess(idUser) {
  console.log(idUser);
  let { data: bookings, error } = await supabase
    .from("bookings")
    .select("*, tours(*)")
    .eq("status", "success")
    .eq("idUser", idUser);

  if (error) {
    console.log(error.message);
  }

  return bookings;
}
