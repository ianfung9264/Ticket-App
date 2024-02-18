"use client";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteBlock = ({ id }) => {
  const router = useRouter();

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const endpoint = `${baseUrl}/api/Tickets/${id}`;

  const handleDelete = async () => {
    const res = await fetch(endpoint, {
      // const res = await fetch(`/api/Tickets/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <FontAwesomeIcon
      icon={faX}
      className="text-red-400 hover:cursor-pointer hover:text-red-200"
      onClick={handleDelete}
    />
  );
};

export default DeleteBlock;
