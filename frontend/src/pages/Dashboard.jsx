import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../store/actions/dashboardActions';
import DonorDashboard from '../components/Dashboard/DonorDashboard';
import RecipientDashboard from '../components/Dashboard/RecipientDashboard';

const Dashboard = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const { donorData, recipientData, adminData, role } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (user?.role) {
      dispatch(fetchDashboardData(user.role));
    }
  }, [dispatch, user?.role]);

  if (!role) return <p>Loading dashboard...</p>;

  return (
    <>
      {role === 'donor' && <DonorDashboard data={donorData} />}
      {role === 'recipient' && <RecipientDashboard data={recipientData} />}
      {role === 'admin' && <div>Admin dashboard (coming soon)</div>}
    </>
  );
};

export default Dashboard;
