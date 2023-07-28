// Date: 09/08/2021
// Description: This is the main page for the Add page. It will display the header, the form, and the bottom navigation bar.
// Created by Georgina Alacaraz

import React from "react"
import { useForm, Resolver } from "react-hook-form"
import { User } from "../";

type FormValues = {
  firstName: string
  lastName: string
}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.firstName ? values : {},
    errors: !values.firstName
      ? {
          firstName: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  }
}t

export default function Add() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormValues>({ resolver })
    const onSubmit = handleSubmit((data) => console.log(data))
  
  
    return (
      <form onSubmit={onSubmit}>
        <input {...register("firstName")} placeholder="Bill" />
        {errors?.firstName && <p>{errors.firstName.message}</p>}
  
  
        <input {...register("lastName")} placeholder="Luo" />
  
  
        <input type="submit" />
      </form>
    )
}
