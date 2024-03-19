"use client";
import Link from "next/link";
import LogOut from "../LogOut/LogOut";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

const Navber = () => {
  const [allUser, setAllUser] = useState([]);
  const [user] = useAuthState(auth);
  console.log("_user", user?.email);
  const navitem = (
    <>
      <li>
        <Link href={"/"}>Home</Link>
      </li>
      <li>
        <Link href={"/tasks"}>Tasks</Link>
      </li>
    </>
  );

  const { data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios
        .get("https://job-task-xi.vercel.app/user")
        .then((res) => {
          // console.log(res?.data);
          setAllUser(res?.data);
          refetch();
        })
        .catch((err) => {
          console.error(err);
        });
    },
  });
  console.log(allUser);
  const findUser = allUser?.find((users) => users?.email == user?.email);
  console.log(findUser);
  

  return (
    <div className="bg-[#0b4a6cde] text-white">
      <div className="max-w-[1300px] mx-auto w-full">
        <div className="navbar   ">
          <div className="navbar-start ">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navitem}
              </ul>
            </div>
            <Link href={"/"}>
              <div className="flex items-center">
                <h2 className="font-bold md:text-xl uppercase">Taskmaster</h2>
              </div>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navitem}</ul>
          </div>
          <div className="navbar-end">
            <div className="flex items-center">
              <div className="flex flex-row-reverse items-center">
                <div>
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      {/* <img src={user?.photoURL} /> */}
                      <Image
                        src={
                          findUser?.photo ||
                          "https://i.ibb.co/bd741Kc/pngwing-com-46.png"
                        }
                        alt="alt"
                        width={150}
                        height={150}
                      />
                    </div>
                  </label>
                </div>
                <div className="">
                  <span className="text-xs md:text-lg font-bold">
                    {findUser?.name}
                  </span>
                </div>
              </div>
              <button className=" ">
                {/* <LuLogOut className="text-2xl" /> */}
              </button>
            </div>
            {user ? (
              <div>
                <LogOut />
              </div>
            ) : (
              <Link href="/login">
                <button className="btn btn-sm bg-white hover:text-[#080403] text-black font-bold">
                  Log In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navber;
