"use client";
import React , {useEffect} from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios"
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors ,isSubmitSuccessful },
  } = useForm();
  const onSubmit = (data) => {
    axios.post("api/register",data)
    .then((res)=>{
      router.push("/login")
    })
  }
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful])
  return (
    <div className="bgclr3 h-screen flex items-center justify-center text-white">
      <div className="flex md:flex-row flex-col-reverse items-center justify-center bg-transparent h-[630px] w-[1150px] gap-6">
        <div className="py-10 px-16 flex flex-col gap-3 backdrop-blur-md bg-white/10 shadow-md bgimg rounded-xl">
          <div className=" text-4xl text-center mb-5">Sign Up</div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <input
              type="text"
              {...register("name", {
                required: { value: true, message: "This Field is mandatory" },
              })}
              className="h-12 placeholder-white border-b-2 border-b-slate-200 outline-none bg-transparent focus:border-b-black focus:border-b-2 focus:placeholder:text-sm focus:placeholder:-translate-y-4 focus:placeholder:transition-all focus:placeholder:duration-400"
              placeholder="Name"
            />
            {errors.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
            <input
              type="email"
              {...register("email", {
                required: { value: true, message: "This Field is Mandatory" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter valid email address",
                },
              })}
              className="h-12 placeholder-white border-b-2 border-b-slate-200 outline-none bg-transparent focus:border-b-black focus:border-b-2 focus:placeholder:text-sm focus:placeholder:-translate-y-4 focus:placeholder:transition-all focus:placeholder:duration-400"
              placeholder="Email"
            />
            {errors.email && (<span className="text-red-600">{errors.email.message}</span>)}
        
            <input
              type="password"
              {...register("password",{
                required: {value:true , message : "This Field is Mandatory"}
              })}
              className="h-12 placeholder-white border-b-2 border-b-slate-200 outline-none bg-transparent focus:border-b-black focus:border-b-2 focus:placeholder:text-sm focus:placeholder:-translate-y-4 focus:placeholder:transition-all focus:placeholder:duration-400"
              placeholder="Password"
            />
            {errors.password && (<span className="text-red-600">{errors.password.message}</span>)}
            <input
              type="submit"
              value="Create Account"
              className="my-4 rounded-full bg-blue-500 m-auto px-6 cursor-pointer text-white h-9"
            />
          </form>
          <div className="m-auto">
            Already have an account?{" "}
            <Link href="/login" className="text-slate-300 underline">
              Log In
            </Link>
          </div>
        </div>
        <img src="/logo2.png" alt="" className="h-48 md:h-96"/>
      </div>
    </div>
  );
};

export default Page;
