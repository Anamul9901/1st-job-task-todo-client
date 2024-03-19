"use client";
import Link from "next/link";
import axios from "axios";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const Tasks = () => {
  const [allTask, setAllTask] = useState([]);
  const [user] = useAuthState(auth);
  console.log(user?.email);

//   useEffect(() => {
//     axios
//       .get("https://job-task-xi.vercel.app/todo")
//       .then((res) => {
//         // console.log(res?.data);
//         setAllTask(res?.data);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, []);
  const { data, refetch } = useQuery({
    queryKey: ["todo"],
    queryFn: async () => {
      const res = await axios
        .get("https://job-task-xi.vercel.app/todo")
        .then((res) => {
          // console.log(res?.data);
          setAllTask(res?.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  });
//   console.log(allTask);
  const filterTasks = allTask?.filter((task) => task?.author == user?.email);
  console.log(filterTasks);

  //  function of add task button
  const handleAddTask = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const title = form.title.value;
    const dadline = form.dadline.value;
    const description = form.description.value;
    const position = "to-do";
    const author = user?.email;
    form.reset();
    // console.log(name, title, dadline, description);
    const updateData = { name, title, dadline, description, position, author };
    console.log(updateData);
    const res = await axios
      .post("https://job-task-xi.vercel.app/todo", updateData)
      .then((res) => {
        console.log(res?.data);
        refetch()
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //  update position
  const handleOngoing = (id) => {
    console.log(id);
    const position = "ongoing";
    const newData = { position };
    axios
      .patch(`https://job-task-xi.vercel.app/todo/${id}`, newData)
      .then((res) => {
        console.log(res.data);
        refetch();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCompleted = (id) => {
    console.log(id);
    const position = "completed";
    const newData = { position };
    axios
      .patch(`https://job-task-xi.vercel.app/todo/${id}`, newData)
      .then((res) => {
        console.log(res.data);
        refetch();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`https://job-task-xi.vercel.app/todo/${id}`)
      .then((res) => {
        console.log(res?.data);
        refetch();
      })
      .catch(() => {});
  };

  return (
    <div className="">
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <div>
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          open modal
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg text-center">Add you task!</h3>

            <form method="dialog" onSubmit={handleAddTask}>
              <div className="">
                <div className="md:flex gap-5 mb-5">
                  <div className="w-full">
                    <h2>Name</h2>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      required
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="w-full">
                    <h2>Title</h2>
                    <input
                      type="img"
                      name="title"
                      placeholder="Tite"
                      required
                      className="input input-bordered  w-full"
                    />
                  </div>
                </div>

                <div className="md:flex gap-5  mb-5">
                  <div className="w-full">
                    <h2>Description</h2>
                    <input
                      type="text"
                      name="description"
                      placeholder="Description"
                      required
                      className="input input-bordered w-full "
                    />
                  </div>
                  <div className="w-full">
                    <h2>Dadline</h2>
                    <input
                      type="date"
                      name="dadline"
                      required
                      placeholder="Author Name"
                      className="input input-bordered w-full  "
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn glass w-full bg-pink-500 font-bold hover:text-[#EC7755]"
                >
                  S u b m i t
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>

      <div className="md:flex justify-between pt-10 text-black">
        <div className="bg-red-300 flex-1 ">
          <h2 className="text-center text-xl font-bold pb-2">To-Do</h2>
          <hr />
          <div>
            <div className="overflow-x-auto">
              <table className="table ">
                {/* head */}
                <thead>
                  <tr className="text-black">
                    <th>No.</th>
                    <th>Name</th>
                    <th>Dadline</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filterTasks
                    ?.filter((task) => task?.position === "to-do")
                    .map((task, ind) => (
                      <tr key={task?._id}>
                        <th>{ind + 1}</th>
                        <td>{task?.name}</td>
                        <td>{task?.dadline}</td>
                        <td>
                          <div className="flex">
                            <div>
                              <button className="text-xl text-red-600">
                                {/* <AiFillDelete /> */}
                              </button>
                              <Link
                                href={`/dashboard/update-task/`}
                                className="text-xl ml-2 text-green-600"
                              >
                                {/* <FaEdit /> */}
                              </Link>
                            </div>

                            <div>
                              <div className="pb-2">
                                <button
                                  onClick={() => handleOngoing(task._id)}
                                  className="bg-yellow-600 rounded-md font-bold text-white px-1"
                                >
                                  Ongoing
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-yellow-300 flex-1 mt-6 md:mt-0">
          <h2 className="text-center text-xl font-bold pb-2">Ongoing</h2>
          <hr />
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Dadline</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* --------- */}
                  {filterTasks
                    ?.filter((task) => task?.position === "ongoing")
                    .map((task, ind) => (
                      <tr key={task?._id}>
                        <th>{ind + 1}</th>
                        <td>{task.name}</td>
                        <td>{task.dadline}</td>
                        <td>
                          <div className="flex">
                            <div>
                              <button className=" text-xl text-red-600">
                                {/* <AiFillDelete /> */}
                              </button>
                              <Link
                                href={`/dashboard/update-task/`}
                                className=" text-xl ml-2 text-green-600"
                              >
                                {/* <FaEdit /> */}
                              </Link>
                            </div>

                            <div>
                              <div>
                                <button
                                  className="bg-green-600   rounded-md font-bold text-white px-1"
                                  onClick={() => handleCompleted(task._id)}
                                >
                                  Completed
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-green-300 flex-1 mt-6 md:mt-0">
          <h2 className="text-center text-xl font-bold pb-2">Completed</h2>
          <hr />
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Dadline</th>
                    <th>Favorite Color</th>
                  </tr>
                </thead>
                <tbody>
                  {filterTasks
                    ?.filter((task) => task?.position === "completed")
                    .map((task, ind) => (
                      <tr key={task?._id}>
                        <th>{ind + 1}</th>
                        <td>{task.name}</td>
                        <td>{task.dadline}</td>
                        <td>
                          <div className="flex">
                            <div>
                              <button className=" text-xl text-red-600">
                                {/* <AiFillDelete /> */}
                              </button>
                              <Link
                                href={`/dashboard/update-task/`}
                                className=" text-xl ml-2 text-green-600"
                              >
                                {/* <FaEdit /> */}
                              </Link>
                            </div>

                            <div>
                              <div className="pb-2">
                                <button
                                  className="bg-red-600   rounded-md font-bold text-white px-1"
                                  onClick={() => handleDelete(task._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
