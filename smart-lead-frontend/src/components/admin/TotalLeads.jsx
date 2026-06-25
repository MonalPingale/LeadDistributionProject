import React from 'react'

export default function TotalLeads() {
  return (
    <div className="min-h-screen bg-[#0b0914] text-white p-10">

      <h1 className="text-5xl mb-10">
        Total Leads
      </h1>

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-[#111] p-6 rounded-3xl">
          <h2 className="text-4xl">154</h2>
          <p className="text-gray-400 mt-2">
            Total Leads
          </p>
        </div>

      </div>

    </div>
  );
}
