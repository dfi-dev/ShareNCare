// Dashboard/Components/Employee/EmployeeTabs.jsx
const EmployeeTabs = ({ mainTab, setMainTab, subTab, setSubTab }) => {
  const tabs = ['Information', 'Associated Candidates'];
  const subTabs = ['Personal', 'Job', 'Compensation & Benefits', 'Legal Documents', 'Experience', 'Emergency'];

  return (
    <div className="border-b px-6 pt-4 pb-2">
      <div className="flex space-x-6 text-sm font-medium">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 ${mainTab === tab ? 'text-teal-700 border-b-2 border-teal-700' : 'text-gray-500'}`}
            onClick={() => setMainTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {mainTab === 'Information' && (
        <div className="flex space-x-6 text-sm font-medium mt-4">
          {subTabs.map((tab) => (
            <button
              key={tab}
              className={`pb-2 ${subTab === tab ? 'text-teal-700 border-b-2 border-teal-700' : 'text-gray-500'}`}
              onClick={() => setSubTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeTabs;
