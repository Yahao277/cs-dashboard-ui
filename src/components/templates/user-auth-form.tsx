"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import { Icons } from "@/components/atoms/icons";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useAdminLogin} from "medusa-react";

type FormValues = {
  email: string;
  password: string;
}

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }, } = useForm<FormValues>();

  const router = useRouter();

  const { mutate, isLoading } = useAdminLogin();
  const onSubmit = (values: FormValues) => {
    mutate(values, {
      onSuccess: () => {
        router.replace("/a")
      },
      onError: () => {
        setError(
          "password",
          {
            type: "manual",
            message: "These credentials do not match our records.",
          },
          {
            shouldFocus: true,
          }
        )
        console.log("These credentials do not match our records.");
      },
    })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              {...register('email')}
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              {...register('password')}
              type="password"
              disabled={isLoading}
            />
          </div>
          {errors.password && (<p>{errors.password.message}</p>)}
          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        {/*<div className="relative flex justify-center text-xs uppercase">*/}
        {/*  <span className="bg-background px-2 text-muted-foreground">*/}
        {/*    Or continue with*/}
        {/*  </span>*/}
        {/*</div>*/}
      </div>
      {/*<Button variant="outline" type="button" disabled={isLoading}>*/}
      {/*  {isLoading ? (*/}
      {/*    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />*/}
      {/*  ) : (*/}
      {/*    <Icons.gitHub className="mr-2 h-4 w-4" />*/}
      {/*  )}{" "}*/}
      {/*  Github (WIP Don't use)*/}
      {/*</Button>*/}
    </div>
  )
}
