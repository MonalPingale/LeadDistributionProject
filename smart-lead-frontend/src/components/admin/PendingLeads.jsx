import React from "react";

export default function PendingLeads() {
  return (
    <div className="min-h-screen bg-[#0b0914] text-white p-10">

      <h1 className="text-5xl mb-10">
        Pending Leads
      </h1>

      <div className="space-y-5">

        <div className="bg-[#111] p-5 rounded-2xl">
          <h2>Lead #101</h2>
          <p>PLUMBER</p>
          <p>Status : PENDING</p>
        </div>

      </div>

    </div>
  );
}