import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobInfoTab from '../../Components/Employee/ProfileSections/JobInfoTab';
import CompensationAndBenefitsTab from '../../Components/Employee/ProfileSections/CompensationAndBenefitsTab';
import LegalDocTab from '../../Components/Employee/ProfileSections/LegalDocTab';
import ExperienceTab from '../../Components/Employee/ProfileSections/ExperienceTab';
import EmergencyTab from '../../Components/Employee/ProfileSections/EmergencyTab';
import PersonalTab from '../../Components/Employee/ProfileSections/PersonalTab';
import EmployeeHeader from '../../Components/Employee/EmployeeHeader';
import EmployeeTabs from '../../Components/Employee/EmployeeTabs'; import AssociatedCandidates from '../../Components/Employee/ProfileSections/AssociatedCandidates';
import { useParams } from 'react-router-dom';
import Loader from '../../Components/Loader'



const EmployeeProfileCard = () => {
  const [mainTab, setMainTab] = useState('Information');
  const [subTab, setSubTab] = useState('Personal');
  const [employeeData, setEmployeeData] = useState(null);
  const [associatedCandidates, setAssociatedCandidates] = useState([]);
  const [candidatesLoading, setCandidatesLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();


  useEffect(() => {
    const token = localStorage.getItem('access_token');

    const fetchEmployeeData = async () => {
      try {
        const employeeRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/employee/${id}/details`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (employeeRes.data.status) {
          setEmployeeData(employeeRes.data.data);
        } else {
          setError('Failed to fetch employee details');
        }
      } catch (err) {
        setError('Error fetching employee details: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchAssociatedCandidates = async () => {
      try {
        setCandidatesLoading(true);
        const candidatesRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/employee/${id}/assignments`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (candidatesRes.data.status) {
          setAssociatedCandidates(candidatesRes.data.data);
        }
      } catch (err) {
        console.error('Error fetching associated candidates:', err);
      } finally {
        setCandidatesLoading(false);
      }
    };

    fetchEmployeeData().then(() => {
      fetchAssociatedCandidates();
    });

  }, [id]);



  const renderSubTabContent = () => {
    if (mainTab === 'Associated Candidates') {
      return <AssociatedCandidates candidates={associatedCandidates} loading={candidatesLoading} />;
    }
    if (mainTab === 'Information' && subTab === 'Personal') {
      return <PersonalTab employee={employeeData} />
    }
    else if (mainTab === 'Information' && subTab === 'Job') {
      return <JobInfoTab job={employeeData?.job_detail} />;
    }
    else if (mainTab === "Information" && subTab === "Compensation & Benefits") {
      return <CompensationAndBenefitsTab compensationData={employeeData?.compensation_detail} />
    }
    else if (mainTab === "Information" && subTab === "Legal Documents") {
      return <LegalDocTab legalDocument={employeeData?.legal_document} />
    }
    else if (mainTab === 'Information' && subTab === 'Experience') {
      return <ExperienceTab experience={employeeData?.experience_detail} />
    }
    else if (mainTab === 'Information' && subTab === 'Emergency') {
      return <EmergencyTab emergency={employeeData?.emergency_contact} />
    }
    else {
      return null
    }
  }

  if (loading) {
  return <Loader message="Getting employee details..." />;
}

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <EmployeeHeader employee={employeeData} />

        {/* Tabs and Content */}
        <div className="bg-white shadow-md rounded-xl">
          <EmployeeTabs
            mainTab={mainTab}
            setMainTab={setMainTab}
            subTab={subTab}
            setSubTab={setSubTab}
          />
          {renderSubTabContent() || (
            <div className="p-6 text-gray-400 text-sm">No data available for "{subTab}" under "{mainTab}"</div>
          )}
        </div>

      </div>
    </div>
  );

};

export default EmployeeProfileCard;
