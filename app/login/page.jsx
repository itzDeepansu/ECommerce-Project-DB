"use client";
import React , {useEffect} from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
const page = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors ,isSubmitSuccessful  },
  } = useForm();
  const router = useRouter();
  const onSubmit = (data) => {
    signIn("credentials", {
      ...data , redirect:false
    }).then(()=>{
      router.push("/")
    }).catch((error)=>{
      console.log(error)
    })
  };
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful])
  return (
    <div className="bgclr h-screen flex items-center justify-center bgclr3">
      <div className="flex items-center justify-center bg-transparent h-[500px] w-[1120px] gap-6">
        <div className="py-10 px-16 flex flex-col gap-3 glass bgimg rounded-sm">
          <div className=" text-4xl text-center mb-5">Log In</div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <input
              type="email"
              {...register("email", {
                required: { value: true, message: "This Field is Mandatory" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter valid email address",
                },
              })}
              className="h-12 placeholder-black border-b-2 border-b-slate-200 outline-none bg-transparent focus:border-b-black focus:border-b-2 focus:placeholder:text-sm focus:placeholder:-translate-y-4 focus:placeholder:transition-all focus:placeholder:duration-400"
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}

            <input
              type="password"
              {...register("password", {
                required: { value: true, message: "This Field is Mandatory" },
              })}
              className="h-12 placeholder-black border-b-2 border-b-slate-200 outline-none bg-transparent focus:border-b-black focus:border-b-2 focus:placeholder:text-sm focus:placeholder:-translate-y-4 focus:placeholder:transition-all focus:placeholder:duration-400"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
            <input
              type="submit"
              value="Log In"
              className="my-4 rounded-full bg-blue-500 m-auto py-3 px-6 cursor-pointer text-white h-9"
            />
          </form>
          <div className="m-auto">
            Don't have an account?{" "}
            <Link href="/signup" className="text-gray-400 underline">
              Sign Up
            </Link>
          </div>
        </div>
        <img src="/bg_r.avif" alt="" />
      </div>
    </div>
  );
};

export default page;
