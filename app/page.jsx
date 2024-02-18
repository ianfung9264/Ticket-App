import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const endpoint = `${baseUrl}/api/Tickets`;

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.error("Failed to get Tickets", error);
  }
};

const Dashboard = async () => {
  const { tickets } = await getTickets();

  const uniqueCategories = Array.from(
    new Set(tickets.map((ticket) => ticket.category))
  );

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
