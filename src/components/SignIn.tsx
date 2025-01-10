import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuthContext } from "../app/context/AuthContext";
import { redirect } from "next/navigation";
import { CredentialsInterface } from "@/utils/helpers";

export default function SignIn() {
  const { handleSuccessfulLogin, isCredentialsCorrect } = useAuthContext();
  const { register, handleSubmit } = useForm<CredentialsInterface>();
  const [alertVisible, setAlertVisible] = useState(false);

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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center align-center text-center"
    >
      <div className="form-group m-2">
        <label className="text-left">
          Username: <input {...register("username")} className="form-control" />
        </label>
      </div>
      <div className="form-group">
        <label className="text-left">
          Password:
          <input
            {...register("password")}
            className="form-control"
            id="input-username"
          />
        </label>
      </div>
      <div className="flex justify-center mt-3">
        <input
          type="submit"
          value="submit"
          className="btn btn-primary"
          id="input-password"
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
