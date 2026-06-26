import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="
        inline-flex
        items-center
        gap-2
        px-4
        py-2
        rounded-lg
        border
        border-slate-700
        bg-slate-900/50
        text-slate-300
        hover:bg-slate-800
        hover:border-blue-500
        hover:text-white
        transition-all
        duration-300
      "
    >
      <FaArrowLeft size={14} />
      Back
    </button>
  );
}

export default BackButton;