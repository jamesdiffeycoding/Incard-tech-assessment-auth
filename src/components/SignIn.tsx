import Image from "next/image";
import { checkCredentialsValidity, TCredentials } from "@/utils";
import { useAuthContext } from "../app/context/AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleValidLoginAndRedirect } = useAuthContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<TCredentials>();

  function onSubmit(data: TCredentials) {
    if (checkCredentialsValidity(data)) {
      handleValidLoginAndRedirect();
    } else {
      setError("username", {
        type: "string",
        message: "- incorrect login combination",
      });
      setError("password", {
        type: "string",
        message: "",
      });
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
        {errors.username && (
          <span className="text-red-400">{errors.username.message}</span>
        )}
        <input
          {...register("username", {
            required: true,
            minLength: {
              value: 5,
              message: "- must be 5+ chars long",
            },
          })}
          aria-label="username"
          autoCorrect="off"
          className={`w-full px-2 py-1 block rounded bg-black focus:bg-slate-900 outline-none text-white border-2 ${
            errors.username
              ? "border-red-300"
              : "border-slate-400 hover:border-slate-200 focus:border-lime-400"
          } `}
          required={true}
          spellCheck="false"
        />
      </label>
      <label className="text-left">
        Password{" "}
        {errors.password && (
          <span className="text-red-400">{errors.password.message}</span>
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
            minLength: { value: 5, message: "- must be 5+ chars long" },
          })}
          aria-label="password"
          autoCorrect="off"
          className={`w-full px-2 py-1 block rounded bg-black focus:bg-slate-900 outline-none text-white border-2 ${
            errors.password
              ? "border-red-300"
              : "border-slate-400 hover:border-slate-200 focus:border-lime-400"
          } `}
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
