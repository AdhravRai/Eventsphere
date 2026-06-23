const BASE_URL = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

export const getPendingEvents = async () => {
  const res = await fetch(`${BASE_URL}/events/pending`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};

export const getAllEvents = async () => {
  const res = await fetch(`${BASE_URL}/events`);
  return res.json();
};

export const approveEvent = async (id) => {
  const res = await fetch(`${BASE_URL}/events/${id}/approve`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};

export const rejectEvent = async (id) => {
  const res = await fetch(`${BASE_URL}/events/${id}/reject`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};

export const markAttendance = async (eventId, studentId) => {
  const res = await fetch(`${BASE_URL}/events/${eventId}/attendance`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ studentId }),
  });
  return res.json();
};