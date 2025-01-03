import { useForm } from "react-hook-form";
import { useState } from "react";

export default function SignIn({ handleAuthentication }) {
  const { register, handleSubmit } = useForm();
  const [alertVisibility, setAlertVisibility] = useState(false);

  const onSubmit = (data) => {
    if ((data.username === "incard" && data.password) === "incard") {
      handleAuthentication(true);
    } else {
      handleAlertVisbility(true);
    }
  };

  const handleAlertVisbility = (isVisible) => {
    setAlertVisibility(isVisible);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group m-2">
        <label>
          Username:{" "}
          <input
            name="username"
            {...register("username")}
            className="form-control"
          />
        </label>
      </div>
      <div className="form-group m-2">
        <label>
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
          Login failed
          <button onClick={() => handleAlertVisbility(false)}>
            <span>&times;</span>
          </button>
        </div>
      )}
    </form>
  );
}
