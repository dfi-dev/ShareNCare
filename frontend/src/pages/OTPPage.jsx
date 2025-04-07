import { useState } from "react";
import OTPModal from "../components/Modals/OTPModal";

const OTPPage = () => {
  const [showModal, setShowModal] = useState(true);
  const email = "email4workonpc@gmail.com";

  return (
    <>
      {showModal && (
        <OTPModal
          email={email}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default OTPPage;
