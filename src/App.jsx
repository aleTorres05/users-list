import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    reset,
  } = useForm();

  function removeUser(idxToRemove) {
    const newUsers = users.filter((_, idx) => idx !== idxToRemove);
    setUsers(newUsers);
  }

  function onSubmit(data) {
    setUsers([...users, data]);
    reset();
  }

  return (
    <main>
      <h1 className="text-center font-bold text-teal-300 text-4xl p-6">
        Users Dashboard
      </h1>
      <form
        className="flex flex-row gap-2 justify-center "
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Firstname"
          className={clsx("border rounded p-2 max-w-screen-sm", {
            "border-2 border-red-500 bg-red-300": errors.user,
          })}
          required
          {...register("firstname", {
            required: { value: true, message: "Campo Requerido" },
            minLength: { value: 2, message: "Minimun 2 caraters" },
          })}
        />
        <input
          type="text"
          placeholder="Lastname"
          className={clsx("border rounded p-2 max-w-screen-sm", {
            "border-2 border-red-500 bg-red-300": errors.user,
          })}
          required
          {...register("lastname", {
            required: { value: true, message: "Campo Requerido" },
            minLength: { value: 2, message: "Minimun 2 caraters" },
          })}
        />
        <input
          type="email"
          placeholder="email"
          className={clsx("border rounded p-2 max-w-screen-sm", {
            "border-2 border-red-500 bg-red-300": errors.user,
          })}
          required
          {...register("email", {
            required: { value: true, message: "Campo Requerido" },
            minLength: { value: 2, message: "Minimun 2 caraters" },
          })}
        />
        <button
          className="border rounded text-white bg-teal-600 w-[10%] font-semibold disabled:bg-stone-400"
          disabled={isSubmitted ? !isValid : false}
        >
          Create User
        </button>
      </form>
      {errors.user && (
        <p className="text-red-500 text-center text-sm  font-semibold">
          {errors.user?.message}
        </p>
      )}
      <div className="max-w-screen-sm w-full mx-auto p-5 flex flex-col gap-1">
        {users.length == 0 && (
          <p className="text-white/50">No users registered 🤷🏽</p>
        )}
        {users.length > 0 && (
          <div className="flex flex-row text-white justify-between">
            <h2 className=" justify-self-start">Full Name: </h2>
            <h2 className=" justify-self-end">Email:</h2>
            <h2 className=" justify-self-end">Delete User</h2>
          </div>
        )}
        {users.map((user, idx) => {
          return (
            <div
              key={`user-${idx}`}
              className=" bg-white/10 rounded p-4 flex flex-row justify-between text-white"
            >
              <span>
                {user.firstname} {user.lastname}
              </span>
              <span>{user.email}</span>
              <span
                onClick={() => removeUser(idx)}
                className="text-red-500 rounded-full p-1 size-4"
              >
                X
              </span>
            </div>
          );
        })}
      </div>
    </main>
  );
}
