const RecipientDashboard = ({ data }) => {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Welcome, {data.name}</h2>
        <h3 className="text-lg mb-2">Received Donations</h3>
        <p>{data.receivedCount}</p>
  
        <h3 className="text-lg mt-4 mb-2">Your Requests</h3>
        <ul className="space-y-2">
          {data.requests.map((r) => (
            <li key={r._id} className="p-3 bg-blue-100 rounded">
              {r.item} — Status: {r.status}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default RecipientDashboard;
  