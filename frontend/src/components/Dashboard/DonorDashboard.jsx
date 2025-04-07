const DonorDashboard = ({ data }) => {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Welcome, {data.name}</h2>
        <h3 className="text-lg mb-2">Your Donations</h3>
        <ul className="space-y-2">
          {data.donations.map((d) => (
            <li key={d._id} className="p-3 bg-gray-100 rounded">
              {d.type === 'blood' ? '🩸 Blood' : '🎁 General'} — Status: {d.status}
            </li>
          ))}
        </ul>
  
        <h3 className="text-lg mt-4 mb-2">Requests from Recipients</h3>
        <ul className="space-y-2">
          {data.requests.map((r) => (
            <li key={r._id} className="p-3 bg-yellow-100 rounded">
              {r.recipientName} requested: {r.item}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default DonorDashboard;
  