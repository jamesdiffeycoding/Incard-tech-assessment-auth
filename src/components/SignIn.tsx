import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuthContext } from "../app/context/AuthContext";
import { redirect } from "next/navigation";
import { CredentialsInterface } from "@/utils";

export default function SignIn() {
  const { handleSuccessfulLogin, isCredentialsCorrect } = useAuthContext();
  const { register, handleSubmit } = useForm<CredentialsInterface>();
  const [alertVisible, setAlertVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleAlertVisible(isVisible: boolean) {
    setAlertVisible(isVisible);
  }

  function onSubmit(data: CredentialsInterface) {
    if (isCredentialsCorrect(data)) {
      handleSuccessfulLogin();
      redirect("/home");
    } else {
      handleAlertVisible(true);
    }
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
        <input
          {...register("username")}
          aria-label="username"
          className="w-full px-2 py-1 block rounded bg-black outline-none text-white border-2 border-slate-400 hover:border-slate-200 focus:border-lime-400"
          autoCorrect="off"
          spellCheck="false"
        />
      </label>
      <label className="text-left">
        Password
        <div className="w-full relative">
          <img
            src={
              showPassword
                ? "./showPasswordIconHidden.svg"
                : "./showPasswordIcon.svg"
            }
            className="text-white m-[0.7rem] absolute right-0 hover:cursor-pointer"
            onClick={toggleShowPassword}
            alt="Show password icon"
            width={16}
            height={16}
          />
        </div>
        <input
          {...register("password")}
          aria-label="password"
          className="w-full px-2 py-1 block rounded bg-black outline-none text-white border-2 border-slate-400 hover:border-slate-200 focus:border-lime-400"
          type={showPassword ? "text" : "password"}
          autoCorrect="off"
          spellCheck="false"
        ></input>
      </label>
      <div className="flex justify-center mt-3">
        <input
          type="submit"
          value="Log in"
          className="px-4 py-2 rounded-lg bg-lime-400 focus:bg-lime-500 hover:bg-lime-500 text-black"
        />
      </div>
      {alertVisible && (
        <div className="alert alert-warning flex justify-between m-2">
          Username and password are incorrect.
          <button onClick={() => handleAlertVisible(false)}>
            <span>&times;</span>
          </button>
        </div>
      )}
    </form>
  );
}
