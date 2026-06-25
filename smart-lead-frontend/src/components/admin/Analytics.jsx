import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

export default function Analytics() {

  const [analytics, setAnalytics] = useState(null);

  const [loading, setLoading] = useState(true);

 
  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
  ];

  const fetchAnalytics = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:2121/SmartLead/admin/analytics",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setAnalytics(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchAnalytics();

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen bg-[#0b0914] flex justify-center items-center text-white">

        Loading Analytics...

      </div>

    );

  }

  const serviceData = analytics.serviceAnalytics;
const providerData = analytics.providerAnalytics;
  const pieData = [

    {
      name: "Completed",
      value: analytics.completedLeads,
    },

    {
      name: "Assigned",
      value: analytics.assignedLeads,
    },

    {
      name: "Pending",
      value: analytics.pendingLeads,
    },

  ];

  return (

    <div className="min-h-screen bg-[#0b0914] text-white px-4 py-8 md:px-8 lg:px-12">

      <h1 className="text-3xl md:text-5xl font-bold mb-8">

        Analytics Dashboard

      </h1>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        <div className="bg-[#111] rounded-3xl p-6 border border-white/10 hover:border-purple-500 transition">

          <h2 className="text-3xl md:text-5xl font-bold text-cyan-400">

            {analytics.totalLeads}

          </h2>

          <p className="text-gray-400 mt-2">

            Total Leads

          </p>

        </div>

        <div className="bg-[#111] rounded-3xl p-6 border border-white/10 hover:border-purple-500 transition">

          <h2 className="text-5xl font-bold text-green-400">

            {analytics.totalProviders}

          </h2>

          <p className="text-gray-400 mt-2">

            Providers

          </p>

        </div>

        <div className="bg-[#111] rounded-3xl p-6 border border-white/10 hover:border-purple-500 transition">

          <h2 className="text-5xl font-bold text-yellow-400">

            {analytics.pendingLeads}

          </h2>

          <p className="text-gray-400 mt-2">

            Pending Leads

          </p>

        </div>

        <div className="bg-[#111] rounded-3xl p-6 border border-white/10 hover:border-purple-500 transition">

          <h2 className="text-5xl font-bold text-purple-400">

            {analytics.completedLeads}

          </h2>

          <p className="text-gray-400 mt-2">

            Completed

          </p>

        </div>

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Pie Chart */}

       <div className="bg-[#111] rounded-3xl p-5 md:p-8 border border-white/10 h-[320px] md:h-[450px]">

          <h2 className="text-2xl font-semibold mb-6">

            Lead Status Overview

          </h2>

          <ResponsiveContainer width="100%" height="90%">

            <PieChart>

              <Pie

                data={pieData}

                dataKey="value"

                nameKey="name"

                outerRadius={120}

                label

              >

                {

                  pieData.map((entry, index) => (

                    <Cell

                      key={index}

                      fill={COLORS[index % COLORS.length]}

                    />

                  ))

                }

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Status Cards */}

        <div className="bg-[#111] rounded-3xl p-8 border border-white/10 flex flex-col justify-center space-y-8">

          <div>

            <div className="flex justify-between">

              <span>Completed</span>

              <span>{analytics.completedLeads}</span>

            </div>

            <div className="w-full bg-gray-700 rounded-full h-4 mt-2">

              <div

                className="bg-green-500 h-4 rounded-full"

                style={{
                  width:
                    `${(analytics.completedLeads /
                      analytics.totalLeads) * 100}%`,
                }}

              />

            </div>

          </div>

          <div>

            <div className="flex justify-between">

              <span>Assigned</span>

              <span>{analytics.assignedLeads}</span>

            </div>

            <div className="w-full bg-gray-700 rounded-full h-4 mt-2">

              <div

                className="bg-blue-500 h-4 rounded-full"

                style={{
                  width:
                    `${(analytics.assignedLeads /
                      analytics.totalLeads) * 100}%`,
                }}

              />

            </div>

          </div>

          <div>

            <div className="flex justify-between">

              <span>Pending</span>

              <span>{analytics.pendingLeads}</span>

            </div>

            <div className="w-full bg-gray-700 rounded-full h-4 mt-2">

              <div

                className="bg-yellow-500 h-4 rounded-full"

                style={{
                  width:
                    `${(analytics.pendingLeads /
                      analytics.totalLeads) * 100}%`,
                }}

              />

            </div>

          </div>

        </div>


        {/* ================= SERVICE & PROVIDER CHARTS ================= */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">

  {/* Service Analytics */}

  <div className="bg-[#111] rounded-3xl p-5 md:p-8 border border-white/10 hover:border-cyan-500 transition-all duration-300">

    <h2 className="text-2xl font-semibold mb-6">

      Service Analytics

    </h2>

    <ResponsiveContainer width="100%" height={280}>

      <BarChart data={serviceData}>

        <CartesianGrid strokeDasharray="3 3" stroke="#333" />

        <XAxis dataKey="service" stroke="#999" />

        <YAxis stroke="#999" />

        <Tooltip />

        <Legend />

        <Bar
          dataKey="completed"
          fill="#22c55e"
          radius={[8, 8, 0, 0]}
        />

        <Bar
          dataKey="assigned"
          fill="#3b82f6"
          radius={[8, 8, 0, 0]}
        />

        <Bar
          dataKey="pending"
          fill="#f59e0b"
          radius={[8, 8, 0, 0]}
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

  {/* Provider Analytics */}

  <div className="bg-[#111] rounded-3xl p-5 md:p-8 border border-white/10 hover:border-purple-500 transition-all duration-300">

    <h2 className="text-2xl font-semibold mb-6">

      Provider Performance

    </h2>

    <ResponsiveContainer width="100%" height={350}>

      <BarChart data={providerData}>

        <CartesianGrid strokeDasharray="3 3" stroke="#333" />

        <XAxis dataKey="provider" stroke="#999" />

        <YAxis stroke="#999" />

        <Tooltip />

        <Legend />

        <Bar
          dataKey="totalHandled"
          fill="#8b5cf6"
          radius={[8, 8, 0, 0]}
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

</div>


{/* ================= CUSTOMER ANALYTICS ================= */}

<div className="mt-10 bg-[#111] rounded-3xl border border-white/10 p-8">

  <h2 className="text-3xl font-semibold mb-6">
    Customer Analytics
  </h2>

 <div className="overflow-x-auto rounded-2xl">

   <table className="min-w-[750px] w-full">

      <thead className="border-b border-white/10">

        <tr className="text-left text-gray-400">

          <th className="py-4">Customer</th>
          <th>Phone</th>
          <th>Requests</th>
          <th>Pending</th>
          <th>Completed</th>

        </tr>

      </thead>

      <tbody>

        {analytics.customerAnalytics.map((customer, index) => (

          <tr
            key={index}
            className="border-b border-white/5 hover:bg-[#1a1a1a]"
          >

            <td className="py-4">
              {customer.customerName}
            </td>

            <td>
              {customer.phone}
            </td>

            <td className="text-cyan-400">
              {customer.requests}
            </td>

            <td className="text-yellow-400">
              {customer.pending}
            </td>

            <td className="text-green-400">
              {customer.completed}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

<div className="mt-10 bg-[#111] rounded-3xl border border-white/10 p-8">

<h2 className="text-2xl md:text-3xl font-semibold mb-6">

Provider Performance

</h2>

<div className="overflow-x-auto">

<table className="w-full">

<thead className="border-b border-white/10">

<tr className="text-left text-gray-400">

<th className="py-4 px-3">Provider</th>

<th>Service</th>

<th>Total</th>

<th>Assigned</th>

<th>Completed</th>

</tr>

</thead>

<tbody>

{

analytics.providerAnalytics.map((provider,index)=>(

<tr
key={index}
className="border-b border-white/5 hover:bg-[#1a1a1a]"
>

<td className="py-4">

{provider.provider}

</td>

<td className="px-3 py-4">

{provider.service}

</td>

<td className="text-cyan-400">

{provider.totalHandled}

</td>

<td className="text-blue-400">

{provider.assigned}

</td>

<td className="text-green-400">

{provider.completed}

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div><div className="mt-10 bg-[#111] rounded-3xl border border-white/10 p-8">

<h2 className="text-3xl font-semibold mb-6">

Service Analytics

</h2>

<div className="overflow-x-auto">

<table className="w-full">

<thead className="border-b border-white/10">

<tr className="text-left text-gray-400">

<th className="py-4">

Service

</th>

<th>

Requests

</th>

<th>

Assigned

</th>

<th>

Pending

</th>

<th>

Completed

</th>

</tr>

</thead>

<tbody>

{

analytics.serviceAnalytics.map((service,index)=>(

<tr
key={index}
className="border-b border-white/5 hover:bg-[#1a1a1a]"
>

<td className="py-4">

{service.service}

</td>

<td className="text-cyan-400">

{service.totalRequests}

</td>

<td className="text-blue-400">

{service.assigned}

</td>

<td className="text-yellow-400">

{service.pending}

</td>

<td className="text-green-400">

{service.completed}

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

      </div>

    </div>

  );

}