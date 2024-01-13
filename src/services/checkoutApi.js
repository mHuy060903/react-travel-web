import supabase from "../util/supabase";

export async function insertCheck(checkout) {
  const { data, error } = await supabase
    .from("checkout")
    .insert([checkout])
    .select();

  if (error) {
    console.log(error.message);
  }

  return data;
}

export async function readAllCheckout() {
  let {
    data: checkouts,
    error,
    count,
  } = await supabase
    .from("checkout")
    .select("*, users(email)", { count: "exact" })
    .eq("checkout", "is-process");

  if (error) {
    console.log(error.message);
  }

  return { checkouts, count };
}

export async function deleteCheckoutId(id) {
  const { error } = await supabase.from("checkout").delete().eq("id", id);

  if (error) {
    console.log(error.message);
  }
}

export async function updateSuccessCheckout(id) {
  const { data, error } = await supabase
    .from("checkout")
    .update({ checkout: "success" })
    .eq("id", id)
    .select();

  if (error) {
    console.log(error.message);
  }

  return data;
}
