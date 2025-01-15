import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuthContext } from "../app/context/AuthContext";
import { redirect } from "next/navigation";
import { TCredentials } from "@/utils";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSuccessfulLogin, isCredentialsCorrect } = useAuthContext();
  const [wrongCredentialsDisplay, setWrongCredentialsDisplay] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TCredentials>();

  function onSubmit(data: TCredentials) {
    if (isCredentialsCorrect(data)) {
      handleSuccessfulLogin();
      redirect("/home");
    } else {
      changeWrongCredentialsDisplay(true);
    }
  }

  function changeWrongCredentialsDisplay(value: boolean) {
    setWrongCredentialsDisplay(value);
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-6 grid-cols-1 w-full"
    >
      <h1 className="text-2xl p-0 m=0">Hello!</h1>
      <h2 className="">Log in to your Incard account.</h2>
      <label className="text-left">
        Username{" "}
        {errors.username && <span className="text-red-400">- too short</span>}
        <input
          {...register("username", {
            required: true,
            minLength: 5,
          })}
          aria-label="username"
          autoCorrect="off"
          className="w-full px-2 py-1 block rounded bg-black outline-none text-white border-2 border-slate-400 hover:border-slate-200 focus:border-lime-400"
          onFocus={() => changeWrongCredentialsDisplay(false)}
          spellCheck="false"
        />
      </label>
      <label className="text-left">
        Password{" "}
        {errors.password && <span className="text-red-400">- too short</span>}
        <div className="w-full relative">
          <img
            alt="Show password icon"
            className="text-white m-[0.7rem] absolute right-0 hover:cursor-pointer"
            onClick={toggleShowPassword}
            height={16}
            src={
              showPassword
                ? "./showPasswordIconHidden.svg"
                : "./showPasswordIcon.svg"
            }
            width={16}
          />
        </div>
        <input
          {...register("password", {
            required: true,
            minLength: 5,
          })}
          aria-label="password"
          autoCorrect="off"
          className="w-full px-2 py-1 block rounded bg-black outline-none text-white border-2 border-slate-400 hover:border-slate-200 focus:border-lime-400"
          onFocus={() => changeWrongCredentialsDisplay(false)}
          spellCheck="false"
          type={showPassword ? "text" : "password"}
        ></input>
      </label>
      <div className="flex flex-col mt-3 align-center">
        <input
          className="py-2 cursor-pointer rounded-lg bg-lime-400 focus:bg-lime-500 hover:bg-lime-500 text-black"
          type="submit"
          value="Log in"
        />
      </div>
      {wrongCredentialsDisplay && (
        <button
          className="text-red-500 text-center"
          onClick={() => changeWrongCredentialsDisplay(false)}
          onFocus={() => changeWrongCredentialsDisplay(false)}
        >
          Either username or password incorrect.
        </button>
      )}
    </form>
  );
}
