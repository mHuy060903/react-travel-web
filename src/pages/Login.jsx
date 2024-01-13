import { BiArrowBack } from "react-icons/bi";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { useSingup } from "../features/auth/useSignup";
import Loading from "../ui/Loading";

import { useLogin } from "../features/auth/useLogin";
import { UserContext } from "../context/useContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { signup, isLoading: isLoading1 } = useSingup();
  const { login, isLoading: isLoading2 } = useLogin();
  const { login: loginContext, user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) return navigate("/");
    console.log(1);
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (isLogin) {
      login(data, {
        onSettled: () => reset(),
        onSuccess: (user) => loginContext(user),
      });
    } else {
      signup(data, {
        onSettled: () => reset(),
      });
    }
  };
  return (
    <div className="h-[100vh] w-full grid grid-cols-3">
      <div
        className="col-span-2 bg-right bg-cover relative"
        style={{ backgroundImage: "url(travel-login.jpeg)" }}
      >
        <div>
          <button
            onClick={() => navigate("/")}
            className="hover:cursor-pointer hover:bg-slate-500/50  rounded-full p-4"
          >
            <BiArrowBack size={28} color="white" />
          </button>
        </div>
        <div className="flex flex-col text-white gap-5 left-10 top-[60%]  absolute">
          <h1 className="font-bold text-5xl">
            Travel memories you'll nerver forget
          </h1>
          <h3 className="font-semibold text-2xl">
            Ultimate Madeira overnight hiking experience
          </h3>
          <button className="bg-white text-blue-700 rounded-md text-xl font-semibold py-2">
            Lear more
          </button>
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col justify-start gap-3 flex-1 px-4">
            <h1 className="text-3xl font-semibold">
              {isLogin ? "Login" : "Register"}
            </h1>
            <h2 className="text-xl ">
              {isLogin
                ? "Welcome back, Please login to your account"
                : "Create an account for you in website"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div className="flex flex-col gap-8 py-4">
                {!isLogin && (
                  <Input
                    disabled={isLoading1 || isLoading2}
                    id="fullName"
                    label="Full Name"
                    type="text"
                    required={true}
                    register={register}
                    errors={errors}
                  />
                )}
                <Input
                  disabled={isLoading1 || isLoading2}
                  id="email"
                  label="Email"
                  type="text"
                  required={true}
                  register={register}
                  errors={errors}
                />
                <Input
                  disabled={isLoading1 || isLoading2}
                  id="password"
                  type="password"
                  label="Password"
                  required={true}
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="flex justify-center mt-4">
                <button
                  disabled={isLoading1 || isLoading2}
                  type="submit"
                  className="bg-orange-400 px-5 py-3 text-lg text-white hover:bg-orange-600 font-semibold flex gap-2 items-center   rounded-md"
                >
                  {(isLoading1 || isLoading2) && (
                    <Loading type="spinningBubbles" color="white" />
                  )}

                  {isLogin ? "Login" : "Register"}
                </button>
              </div>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div
                  className="
                absolute 
                inset-0 
                flex 
                items-center
              "
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-2">
              <p>
                {isLogin ? "You have an account?" : `Don't have an account?`}
              </p>
              <span
                className="text-blue-600 font-semibold cursor-pointer hover:text-blue-900"
                onClick={() => {
                  setIsLogin((cur) => !cur);

                  reset();
                }}
              >
                {isLogin ? "Sign up" : "Sign in"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
