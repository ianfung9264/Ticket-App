"use client";

import { useRouter } from "next/navigation"; //the default is next/router, which is incorrect
import React, { useState } from "react";

const TicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id === "new" ? false : true;

  const router = useRouter();

  const startingTicketData = {
    title: "",
    description: "",
    category: "Hardware Problem",
    priority: 1,
    progress: 0,
    status: "not started",
  };

  if (EDITMODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["category"] = ticket.category;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["progress"] = ticket.progress;
    startingTicketData["status"] = ticket.status;
  }

  const [formData, setFormData] = useState(startingTicketData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to update ticket");
      }
      router.push("/");
      router.refresh();
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create ticket");
      }
      router.push("/");
      router.refresh();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? "Update Ticket" : "Create Ticket"}</h3>
        <label>Title</label>
        <input
          type="text"
          onChange={handleChange}
          id="title"
          name="title"
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          onChange={handleChange}
          id="description"
          name="description"
          required={true}
          value={formData.description}
          rows="5"
        />
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="Software Problem">Software Problem</option>
          <option value="Project">Project</option>
        </select>

        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            value={1}
            type="radio"
            onChange={handleChange}
            checked={formData.priority == 1}
          />
          <label htmlFor="priority-1">1</label>
          <input
            id="priority-2"
            name="priority"
            value={2}
            type="radio"
            onChange={handleChange}
            checked={formData.priority == 2}
          />
          <label htmlFor="priority-2">2</label>
          <input
            id="priority-3"
            name="priority"
            value={3}
            type="radio"
            onChange={handleChange}
            checked={formData.priority == 3}
          />
          <label htmlFor="priority-3">3</label>
          <input
            id="priority-4"
            name="priority"
            value={4}
            type="radio"
            onChange={handleChange}
            checked={formData.priority == 4}
          />
          <label htmlFor="priority-4">4</label>
          <input
            id="priority-5"
            name="priority"
            value={5}
            type="radio"
            onChange={handleChange}
            checked={formData.priority == 5}
          />
          <label htmlFor="priority-5">5</label>
        </div>
        <label htmlFor="progress">Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>

        <div className="flex justify-center">
          <input
            type="submit"
            className="btn max-w-xs"
            value={EDITMODE ? "Update Ticket" : "Create Ticket"}
          />
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
