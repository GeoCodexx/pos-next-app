import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <>
      <div className="w-full bg-slate-300">
        <h2>Login Page</h2>
        <Link href="/dashboard">
          <button className="bg-blue-500 text-white p-3">Ingresar</button>
        </Link>
      </div>
    </>
  );
};

export default Login;
