import OTPModal from "../components/Modals/OTPModal";

const OTPPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6">
        <OTPModal />
      </div>
    </div>
  );
}

export default OTPPage;
