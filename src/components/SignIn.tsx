import Image from "next/image";
import { isCredentialsCorrect, TCredentials } from "@/utils";
import { useAuthContext } from "../app/context/AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { setExpiryInFutureAndRedirect } = useAuthContext();
  const [wrongCredentialsDisplay, setWrongCredentialsDisplay] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TCredentials>();

  function onSubmit(data: TCredentials) {
    if (
      setExpiryInFutureAndRedirect === undefined ||
      isCredentialsCorrect === undefined
    )
      return;
    if (isCredentialsCorrect(data)) {
      setExpiryInFutureAndRedirect();
    } else {
      setWrongCredentialsDisplay(true);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-6 grid-cols-1 w-full"
      method="post"
    >
      <h1 className="text-2xl p-0 m-0">Hello!</h1>
      <h2 className="">Log in to your Incard account.</h2>
      <label className="text-left">
        Username{" "}
        {wrongCredentialsDisplay ? (
          <span className="text-red-500 text-center">
            - username or password incorrect.
          </span>
        ) : (
          errors.username && (
            <span className="text-red-400">- min 5 characters </span>
          )
        )}
        <input
          {...register("username", {
            required: true,
            minLength: 5,
            onChange: () => setWrongCredentialsDisplay(false),
          })}
          aria-label="username"
          autoCorrect="off"
          className={`w-full px-2 py-1 block rounded bg-black focus:bg-slate-900 outline-none text-white border-2 ${
            wrongCredentialsDisplay || errors.username
              ? "border-red-300"
              : "border-slate-400 hover:border-slate-200 focus:border-lime-400"
          } `}
          required={true}
          spellCheck="false"
        />
      </label>
      <label className="text-left">
        Password{" "}
        {wrongCredentialsDisplay
          ? ""
          : errors.password && (
              <span className="text-red-400">- min 5 characters </span>
            )}
        <div className="w-full relative">
          <Image
            alt="Show password icon"
            className="text-white m-[0.7rem] absolute right-0 hover:cursor-pointer"
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
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
            onChange: () => setWrongCredentialsDisplay(false),
          })}
          aria-label="password"
          autoCorrect="off"
          className={`w-full px-2 py-1 block rounded bg-black focus:bg-slate-900 outline-none text-white border-2 ${
            wrongCredentialsDisplay || errors.password
              ? "border-red-300"
              : "border-slate-400 hover:border-slate-200 focus:border-lime-400"
          } `}
          onFocus={() => setWrongCredentialsDisplay(false)}
          required={true}
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
    </form>
  );
}
