import { createToken } from "../util/Helper";
import supabase from "../util/supabase";
import bcrypt from "bcryptjs";

export async function singup({ email, password, fullName }) {
  const hashPassword = await bcrypt.hash(password, 16);

  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password: hashPassword, fullName, favoriteTours: [] }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  console.log(data);

  return data;
}

export async function signin({ email, password }) {
  let { data, error1 } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!data) {
    throw new Error("Email does not exsit");
  }

  if (error1) {
    throw new Error(error.message);
  }

  const isTruePassword = await bcrypt.compare(password, data.password);

  if (!isTruePassword) {
    throw new Error("Password is wrong");
  }

  const token = createToken();

  const { data: users, error } = await supabase
    .from("users")
    .update({ accessToken: token })
    .eq("email", email)
    .select()
    .single();

  if (!error) {
    localStorage.setItem("token", token);
  }

  return users;
}

export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  if (token === null) {
    console.log(1);
    return null;
  }

  let { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("accessToken", token)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    return null;
  }

  return user;
}
