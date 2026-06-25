import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyWork() {

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyLeads = async () => {

    try {

      const token = localStorage.getItem("token");

      console.log("TOKEN =", token);

      const response = await axios.get(
        "http://localhost:2121/provider/leads",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("LEADS DATA =", response.data);

      setLeads(response.data);

    } catch (error) {

      console.log("ERROR =", error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchMyLeads();
  }, []);

  const markCompleted = async (leadId) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:2121/provider/lead/${leadId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      alert("Lead Completed Successfully");

      fetchMyLeads();

    } catch (error) {

      console.log(error);

      alert("Unable to complete lead");

    }
  };

  const assignedCount =
    leads.filter(
      (lead) => lead.status === "ASSIGNED"
    ).length;

  const completedCount =
    leads.filter(
      (lead) => lead.status === "COMPLETED"
    ).length;

  return (
    <div className="min-h-screen bg-[#0b0914] text-white px-6 py-10">

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl md:text-5xl font-bold">
          My Work
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your assigned leads
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

        <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
          <h2 className="text-3xl font-bold text-purple-400">
            {leads.length}
          </h2>
          <p className="text-gray-400 mt-2">
            Total Leads
          </p>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
          <h2 className="text-3xl font-bold text-yellow-400">
            {assignedCount}
          </h2>
          <p className="text-gray-400 mt-2">
            Assigned
          </p>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
          <h2 className="text-3xl font-bold text-green-400">
            {completedCount}
          </h2>
          <p className="text-gray-400 mt-2">
            Completed
          </p>
        </div>

      </div>

      {/* Loading */}

      {loading && (
        <div className="text-center py-10">
          Loading Leads...
        </div>
      )}

      {/* Empty State */}

      {!loading && leads.length === 0 && (

        <div className="bg-[#111] border border-white/10 rounded-3xl p-10 text-center">

          <h2 className="text-2xl font-semibold">
            No Leads Assigned
          </h2>

          <p className="text-gray-400 mt-3">
            No work available currently.
          </p>

        </div>

      )}

      {/* Lead Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {leads.map((lead) => (

          <div
            key={lead.id}
            className="
              bg-[#111]
              border
              border-white/10
              rounded-3xl
              p-6
              hover:border-purple-500/30
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            <div className="flex justify-between items-center">

              <h2 className="text-xl font-semibold">
                Lead #{lead.id}
              </h2>

              <span
                className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${
                    lead.status === "COMPLETED"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }
                `}
              >
                {lead.status}
              </span>

            </div>

            <div className="mt-5 space-y-3 text-gray-300">

              <p>
                👤 {lead.customerName}
              </p>

              <p>
                📞 {lead.customerPhone}
              </p>

              <p>
                🔧 {lead.serviceType}
              </p>

              <p>
                📍 {lead.customerAddress}
              </p>

            </div>

            {lead.status !== "COMPLETED" && (

              <button
                onClick={() =>
                  markCompleted(lead.id)
                }
                className="
                  mt-6
                  w-full
                  bg-green-500
                  hover:bg-green-600
                  text-black
                  font-semibold
                  py-3
                  rounded-xl
                  transition-all
                "
              >
                Mark As Completed
              </button>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}