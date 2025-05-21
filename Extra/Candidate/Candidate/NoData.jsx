export const NoData = ({ type }) => {
  const illustrations = {
    Profile: {
      message: "No profile information available.",
      svg: (
        <svg width="120" height="120" fill="none" viewBox="0 0 24 24" className="mx-auto mb-4">
          <path fill="#ccc" d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
        </svg>
      )
    },
    Timeline: {
      message: "No timeline activity yet.",
      svg: (
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" className="mx-auto mb-4">
          <path fill="#ccc" d="M4 4h16v2H4V4zm0 6h10v2H4v-2zm0 6h16v2H4v-2z"/>
        </svg>
      )
    },
    Communication: {
      message: "No communication records.",
      svg: (
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" className="mx-auto mb-4">
          <path fill="#ccc" d="M21 6.5a2.5 2.5 0 00-2.5-2.5H5.5A2.5 2.5 0 003 6.5v11a2.5 2.5 0 002.5 2.5H6v2l3-2h9.5a2.5 2.5 0 002.5-2.5v-11z"/>
        </svg>
      )
    },
    Review: {
      message: "No reviews available.",
      svg: (
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" className="mx-auto mb-4">
          <path fill="#ccc" d="M12 2l3 6h6l-4.5 4 1.5 6-5.5-3.5L6 18l1.5-6L3 8h6l3-6z"/>
        </svg>
      )
    },
    Comments: {
      message: "No comments yet.",
      svg: (
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" className="mx-auto mb-4">
          <path fill="#ccc" d="M4 4h16v12H5.17L4 17.17V4zm0-2a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2H4z"/>
        </svg>
      )
    }
  };

  return (
    <div className="py-10 text-center text-gray-500">
      {illustrations[type]?.svg}
      <p className="text-sm">{illustrations[type]?.message}</p>
    </div>
  );
};

