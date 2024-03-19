/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { auth } from "@/app/firebase/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import axios from "axios";

const SignUp = () => {
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.image.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password, photo);
    const user = { name, email, photo };

    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      router.push("/");
      axios
        .post("https://job-task-xi.vercel.app/user", user)
        .then(() => {
          console.log(data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="styleSign h-[100vh] bg-indigo-100">
      <div className="flex justify-center h-[80vh] items-center">
        <div className="relative flex w-96 flex-col rounded-xl bg-indigo-200 glass bg-clip-border text-gray-700 shadow-md">
          <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-200 bg-clip-border text-white shadow-lg shadow-indigo-500/40">
            <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
              Sign Up
            </h3>
          </div>
          <form onSubmit={handleRegister}>
            <div className="flex flex-col gap-4 p-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  name="name"
                  type="text"
                  required
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Name
                </label>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  name="image"
                  type="text"
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Image URL
                </label>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  required
                  name="email"
                  type="email"
                  className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Email
                </label>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  required
                  name="password"
                  type="password"
                  className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Password
                </label>
              </div>
              <div className="-ml-2.5"></div>
              <button
                className="btn btn-sm glass bg-indigo-500 hover:text-[#EC7755] text-white font-bold"
                type="submit"
                data-ripple-light="true"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="p-6 pt-0">
            <div>{/* <DirectLogIn /> */}</div>
            <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
              Already have an account?
              <Link href="/login">
                <button
                  href="#signup"
                  className="ml-1 block font-sans text-sm font-bold leading-normal text-indigo-500 antialiased "
                >
                  Sign in
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
