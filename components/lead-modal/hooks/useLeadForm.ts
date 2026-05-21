"use client";

//lead form
import { useState } from "react";

//form logic
export function useLeadForm(
  onSubmit:any,
  onClose:()=>void
){

  const [email,setEmail] =
    useState("");

  const [company,setCompany] =
    useState("");

  const [role,setRole] =
    useState("");

  const [loading,setLoading] =
    useState(false);

  const [success,setSuccess] =
    useState(false);

  //submit form
  const handleSubmit = async(
    e:React.FormEvent,
    teamSize:number
  ) => {

    e.preventDefault();

    try{

      setLoading(true);

      await onSubmit({
        email,
        company,
        role,
        teamSize:
          Number(teamSize) || 1,
      });

      setSuccess(true);

      setTimeout(()=>{
        onClose();
      },1800);

    }catch(err){

      console.error(err);

    }finally{

      setLoading(false);
    }
  };

  return {

    email,
    setEmail,

    company,
    setCompany,

    role,
    setRole,

    loading,
    success,

    handleSubmit,
  };
}