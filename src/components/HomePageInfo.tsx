import { TAuthContext } from "@/utils";

export default function HomePageInfo({
  checkLoginExpired,
  loginExpiryTime,
  handleLogoutAndRedirect,
}: TAuthContext) {
  return (
    <section className="grid gap-6 grid-cols-1 w-full">
      {checkLoginExpired(loginExpiryTime) ? (
        <>
          <h1 className="text-2xl p-0 m-0">Welcome Back!</h1>
          <h2>Please log in. You will now be redirected to the login page.</h2>
        </>
      ) : (
        <>
          <h1 className="text-2xl p-0 m-0">Welcome Back!</h1>
          <h2>
            At{" "}
            <span className="text-lime-300 font-bold">
              {loginExpiryTime.slice(16, 24)}{" "}
            </span>{" "}
            GMT you will be redirected to login again.
          </h2>
        </>
      )}
      <button
        className="mt-3 px-4 py-2 max-w-[140px] cursor-pointer rounded-lg bg-orange-300 focus:bg-orange-400 hover:bg-orange-400 text-black"
        onClick={() => handleLogoutAndRedirect()}
      >
        {" "}
        Log out early
      </button>
    </section>
  );
}
