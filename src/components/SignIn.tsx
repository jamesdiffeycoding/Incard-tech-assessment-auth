import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuthContext } from "../app/context/AuthContext";
import { redirect } from "next/navigation";

interface Credentials {
  username: string;
  password: string;
}

export default function SignIn() {
  const { register, handleSubmit } = useForm<Credentials>();
  const [alertVisible, setAlertVisible] = useState(false);
  function handleAlertVisible(isVisible: boolean) {
    setAlertVisible(isVisible);
  }

  const { handleSuccessfulLogin, isCredentialsCorrect } = useAuthContext();

  function onSubmit(data: Credentials) {
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
      className="flex flex-col justify-center align-center text-center mt-4"
    >
      <div className="form-group m-2">
        <label className="text-left">
          Username: <input {...register("username")} className="form-control" />
        </label>
      </div>
      <div className="form-group m-2">
        <label className="text-left">
          Password:
          <input {...register("password")} className="form-control" />
        </label>
      </div>
      <div className="flex justify-center m-2">
        <input type="submit" value="submit" className="btn btn-primary" />
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
