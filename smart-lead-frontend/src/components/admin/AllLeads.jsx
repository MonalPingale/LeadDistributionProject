import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:2121/SmartLead/admin/leads",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setLeads(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const pendingCount = leads.filter(
    (lead) => lead.status === "PENDING"
  ).length;

  const assignedCount = leads.filter(
    (lead) => lead.status === "ASSIGNED"
  ).length;

  const completedCount = leads.filter(
    (lead) => lead.status === "COMPLETED"
  ).length;

  return (
    <div className="min-h-screen bg-[#0b0914] text-white p-6 md:p-10">

      {/* Header */}

      <div className="mb-10">
        <h1 className="text-4xl md:text-6xl font-bold">
          All Leads
        </h1>

        <p className="text-gray-400 mt-3">
          Monitor and manage all customer service requests
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

        <div className="bg-[#111] border border-white/10 rounded-3xl p-6">
          <h2 className="text-4xl font-bold text-purple-400">
            {leads.length}
          </h2>

          <p className="text-gray-400 mt-2">
            Total Leads
          </p>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-3xl p-6">
          <h2 className="text-4xl font-bold text-yellow-400">
            {pendingCount}
          </h2>

          <p className="text-gray-400 mt-2">
            Pending
          </p>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-3xl p-6">
          <h2 className="text-4xl font-bold text-blue-400">
            {assignedCount}
          </h2>

          <p className="text-gray-400 mt-2">
            Assigned
          </p>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-3xl p-6">
          <h2 className="text-4xl font-bold text-green-400">
            {completedCount}
          </h2>

          <p className="text-gray-400 mt-2">
            Completed
          </p>
        </div>

      </div>

      {/* Loading */}

      {loading && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400">
            Loading Leads...
          </p>
        </div>
      )}

      {/* Empty State */}

      {!loading && leads.length === 0 && (
        <div className="bg-[#111] border border-white/10 rounded-3xl p-12 text-center">
          <h2 className="text-3xl">
            No Leads Found
          </h2>

          <p className="text-gray-400 mt-3">
            No customer requests available.
          </p>
        </div>
      )}

      {/* Leads Grid */}

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
              hover:border-purple-500/40
              hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]
              hover:-translate-y-2
              transition-all
              duration-300
            "
          >

            {/* Top */}

            <div className="flex justify-between items-center">

              <h2 className="text-2xl font-semibold">
                Lead #{lead.id}
              </h2>

              <span
                className={`
                  px-4 py-2 rounded-full text-xs font-semibold

                  ${
                    lead.status === "COMPLETED"
                      ? "bg-green-500/20 text-green-400"
                      : lead.status === "ASSIGNED"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }
                `}
              >
                {lead.status}
              </span>

            </div>

            {/* Info */}

            <div className="mt-6 space-y-4 text-gray-300">

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

              <p>
                📝 {lead.problemDescription}
              </p>

              <p>
                👨‍🔧 Provider :
                {" "}
                {lead.provider?.user?.username || "Not Assigned"}
              </p>

            </div>

            {/* Footer */}

            <div className="mt-6 pt-4 border-t border-white/10">

              <p className="text-xs text-gray-500">
                Created :
                {" "}
                {new Date(
                  lead.createdAt
                ).toLocaleString()}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}