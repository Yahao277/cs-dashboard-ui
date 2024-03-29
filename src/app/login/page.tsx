'use client';

import classes from './style.module.css';
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {UserAuthForm} from "@/components/templates/user-auth-form";



export default function LoginPage() {

    return (
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Iniciar sesión
            </h1>

          </div>
          <UserAuthForm/>

        </div>
      </div>
    )
  }