"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore, query, orderBy, limit } from "firebase/firestore";
import { app } from "@/config/Firebaseconfig";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MeetingConfirmation() {
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const q = query(collection(db, "ScheduleMeetings"), orderBy("selectedDate", "desc"), limit(1));
        const querySnapshot = await getDocs(q);
        const latestMeeting = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0];
        if (latestMeeting) {
          setMeeting(latestMeeting);
        }
      } catch (error) {
        console.error("Error fetching meeting:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeeting();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (!meeting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <p className="text-center text-gray-500">No meeting found.</p>
        </div>
      </div>
    );
  }

  // Convert Firestore Timestamp to a readable date format
  const formattedDate = meeting.selectedDate?.toDate()?.toLocaleString();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-orange-100"
      style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/crinkled-paper.png')",
      }}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg border-2 border-gray-500"
        style={{
          fontFamily: "monospace",
          borderRadius: "5px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          border: "2px dashed #444",
          backgroundColor: "#f5f5dc",
        }}
      >
        <h2 className="text-center text-xl font-bold text-gray-800 mb-4">
          🍽️ Your Meeting Receipt
        </h2>
        <hr className="border-dashed border-gray-500 mb-4" />

        <div className="text-gray-900 text-lg">
          <p>
            <strong>Name:</strong> {meeting.userName}
          </p>
          <p>
            <strong>Business:</strong> {meeting.businessName}
          </p>
          <p>
            <strong>Date:</strong> {formattedDate}
          </p>
          <p>
            <strong>Time:</strong> {meeting.SelectedTime}
          </p>
          <p>
            <strong>Duration:</strong> {meeting.duration} min
          </p>
          <p>
            <strong>Notes:</strong> {meeting.userNotes || "None"}
          </p>
        </div>

        <hr className="border-dashed border-gray-500 my-4" />
       <div className="flex gap-3 justify-evenly">
       <div className="text-center">
          <a
           href={meeting.locationUrl.startsWith("http") ? meeting.locationUrl : `https://${meeting.locationUrl}`}
            className="inline-block px-6 py-2 text-white bg-orange-700 rounded-md shadow-md hover:bg-orange-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            🧾 Join Meeting
          </a>
        </div>
        <Link href={'/dashboard'}>
        <Button className=''>Back to Home</Button>
        </Link>
       

       </div>
      

        <p className="text-center text-gray-600 mt-4 text-sm">
          ** This is an auto-generated receipt **
        </p>
      </div>
    </div>
  );
}
