import { useForm } from "react-hook-form";
import { useState } from "react";

export default function SignIn({ handleSuccessfulLogin }) {
  const { register, handleSubmit } = useForm();

  function isLoginValid(credentails) {
    return (
      credentails.username === "incard" && credentails.password === "incard"
    );
  }

  function onSubmit(credentails) {
    if (isLoginValid(credentails)) {
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + 5);
      handleSuccessfulLogin(expiryDate.toString());
    } else {
      handleAlertVisbility(true);
    }
  }

  const [alertVisibility, setAlertVisibility] = useState(false);
  const handleAlertVisbility = (isVisible) => {
    setAlertVisibility(isVisible);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center align-center text-center"
    >
      <div className="form-group m-2">
        <label className="text-left">
          Username:{" "}
          <input
            name="username"
            {...register("username")}
            className="form-control"
          />
        </label>
      </div>
      <div className="form-group m-2">
        <label className="text-left">
          Password:
          <input
            name="password"
            {...register("password")}
            className="form-control"
          />
        </label>
      </div>
      <div className="flex justify-center m-2">
        <input type="submit" value="submit" className="btn btn-primary" />
      </div>
      {alertVisibility && (
        <div className="alert alert-warning flex justify-between m-2">
          Username and password are incorrect.
          <button onClick={() => handleAlertVisbility(false)}>
            <span>&times;</span>
          </button>
        </div>
      )}
    </form>
  );
}
