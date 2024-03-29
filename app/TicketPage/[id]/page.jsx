import TicketForm from "@/app/(components)/TicketForm";

const getTicketById = async (id) => {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const endpoint = `${baseUrl}/api/Tickets/${id}`;

  try {
    // const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
    const res = await fetch(endpoint, {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to get Ticket by Id");
    }
    return res.json();
  } catch (error) {
    console.error("Failed to get Ticket by Id", error);
  }
};

const TicketPage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;
  let updateTicketData = {};

  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = {
      _id: "new",
    };
  }

  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
