
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import jsPDF from "jspdf";
import { useState, useEffect } from "react";
import api from "../services/api";
import TopBar from "../components/TopBar";


import {
  FaCertificate,
  FaDownload,
  FaAward,
} from "react-icons/fa";

function Certificates() {

  const [certificates, setCertificates] = useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );
  useEffect(() => {
    fetchCertificates();
    
  }, []);

  const fetchCertificates = async () => {
  try {
    const res = await api.get("/events");

    const userCertificates = res.data.filter(
      (event) =>
        event.attendees?.some(
          (attendee) =>
            attendee.student?._id === currentUser?.id
        )
    );

    console.log("FILTERED CERTIFICATES:", userCertificates);

    setCertificates(userCertificates);
  } catch (error) {
    console.log(error);
  }
};
  
  const downloadCertificate = (eventName) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const doc = new jsPDF("landscape");

  // Background
  doc.setFillColor(10, 15, 30);
  doc.rect(0, 0, 297, 210, "F");

  // Double Border
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(2);
  doc.rect(10, 10, 277, 190);

  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(1);
  doc.rect(15, 15, 267, 180);

  // Logo Circle
  doc.setFillColor(59, 130, 246);
  doc.circle(148.5, 35, 10, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text("E", 148.5, 38, { align: "center" });

  // EventSphere Title
  doc.setFontSize(32);
  doc.setTextColor(255, 255, 255);
  doc.text("EVENTSPHERE", 148.5, 60, {
    align: "center",
  });

  // Certificate Title
  doc.setFontSize(38);
  doc.setTextColor(245, 158, 11);
  doc.text("CERTIFICATE", 148.5, 85, {
    align: "center",
  });

  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("OF PARTICIPATION", 148.5, 95, {
    align: "center",
  });

  // Content
  doc.setFontSize(16);
  doc.text("This certifies that", 148.5, 115, {
    align: "center",
  });

  doc.setFontSize(28);
  doc.setTextColor(245, 158, 11);
  doc.text(
    user?.name || "Student",
    148.5,
    135,
    { align: "center" }
  );

  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text(
    "has successfully participated in",
    148.5,
    150,
    { align: "center" }
  );

  doc.setFontSize(24);
  doc.setTextColor(59, 130, 246);
  doc.text(eventName, 148.5, 170, {
    align: "center",
  });

  // Date
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(
    `Date: ${new Date().toLocaleDateString()}`,
    148.5,
    185,
    { align: "center" }
  );

  // Signatures
  doc.line(40, 190, 80, 190);
  doc.line(215, 190, 255, 190);

  doc.setFontSize(12);
  doc.text(
    "Organizer Signature",
    60,
    197,
    { align: "center" }
  );

  doc.text(
    "EventSphere",
    235,
    197,
    { align: "center" }
  );

  doc.save(`${eventName}-certificate.pdf`);
};
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">

      <Sidebar />

      <div className="flex-1 overflow-auto">

        <Topbar />

        <div className="p-8">
          

          {/* Hero Section */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 mb-10">

            <h1 className="text-5xl font-bold mb-3">
              Certificates 🏆
            </h1>

            <p className="text-slate-400 text-lg">
              View and download certificates earned from your event participation.
            </p>

          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">

              <FaCertificate className="text-blue-400 text-3xl mb-4" />

              <p className="text-slate-400">
                Certificates Earned
              </p>

              <h2 className="text-4xl font-bold">
                {certificates.length}
              </h2>

            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">

              <FaAward className="text-purple-400 text-3xl mb-4" />

              <p className="text-slate-400">
                Events Completed
              </p>

              <h2 className="text-4xl font-bold">
                5
              </h2>

            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">

              <FaDownload className="text-green-400 text-3xl mb-4" />

              <p className="text-slate-400">
                Downloads
              </p>

              <h2 className="text-4xl font-bold">
                12
              </h2>

            </div>

          </div>

          {/* Certificate Cards */}
          {/* Certificate Cards */}

          {certificates.length === 0 && (
            <p className="text-slate-400 mb-6">
              No certificates earned yet.
            </p>
          )}

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {certificates.map((certificate) => (
              <div
                key={certificate._id}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
              >

                <FaCertificate className="text-yellow-400 text-5xl mb-4" />

                <h3 className="text-2xl font-bold mb-2">
                  {certificate.title}
                </h3>

                <p className="text-slate-400 mb-6">
                  Issued on {new Date(certificate.date).toLocaleDateString()}
                </p>

                <button
                  onClick={() =>
                    downloadCertificate(certificate.title)
                  }
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center gap-2 hover:scale-[1.02] transition"
                >
                  <FaDownload />

                  Download Certificate

                </button>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );

}
export default Certificates;

