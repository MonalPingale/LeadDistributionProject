import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Providers() {

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProviders = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:2121/SmartLead/admin/providers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setProviders(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const totalProviders = providers.length;

  const availableProviders =
    providers.filter(
      provider =>
        provider.currentActiveLeads <
        provider.maxActiveLeads
    ).length;

  const busyProviders =
    providers.filter(
      provider =>
        provider.currentActiveLeads >=
        provider.maxActiveLeads
    ).length;

  const totalActiveLeads =
    providers.reduce(
      (sum, provider) =>
        sum + provider.currentActiveLeads,
      0
    );

  return (
    <div className="min-h-screen bg-[#0b0914] text-white p-6 md:p-10">

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-5xl md:text-6xl font-bold">
          Providers
        </h1>

        <p className="text-gray-400 mt-3">
          Manage all registered providers
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

        <div className="bg-[#111] border border-white/10 rounded-3xl p-6">
          <h2 className="text-4xl font-bold text-purple-400">
            {totalProviders}
          </h2>

          <p className="text-gray-400 mt-2">
            Total Providers
          </p>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-3xl p-6">
          <h2 className="text-4xl font-bold text-green-400">
            {availableProviders}
          </h2>

          <p className="text-gray-400 mt-2">
            Available
          </p>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-3xl p-6">
          <h2 className="text-4xl font-bold text-red-400">
            {busyProviders}
          </h2>

          <p className="text-gray-400 mt-2">
            Busy
          </p>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-3xl p-6">
          <h2 className="text-4xl font-bold text-yellow-400">
            {totalActiveLeads}
          </h2>

          <p className="text-gray-400 mt-2">
            Active Leads
          </p>
        </div>

      </div>

      {/* Loading */}

      {loading && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400">
            Loading Providers...
          </p>
        </div>
      )}

      {/* Empty */}

      {!loading && providers.length === 0 && (
        <div className="bg-[#111] border border-white/10 rounded-3xl p-10 text-center">

          <h2 className="text-3xl">
            No Providers Found
          </h2>

        </div>
      )}

      {/* Providers Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {providers.map((provider) => {

          const isAvailable =
            provider.currentActiveLeads <
            provider.maxActiveLeads;

          return (

            <div
              key={provider.id}
              className="
                bg-[#111]
                border
                border-white/10
                rounded-3xl
                p-6
                hover:border-purple-500/40
                hover:-translate-y-2
                hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]
                transition-all
                duration-300
              "
            >

              {/* Top */}

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-semibold capitalize">
                  {provider.user.username}
                </h2>

                <span
                  className={`
                    px-4 py-2 rounded-full text-xs font-semibold

                    ${
                      isAvailable
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }
                  `}
                >
                  {isAvailable
                    ? "AVAILABLE"
                    : "BUSY"}
                </span>

              </div>

              {/* Details */}

              <div className="mt-6 space-y-4 text-gray-300">

                <p>
                  📧 {provider.user.email}
                </p>

                <p>
                  🔧 {provider.serviceType}
                </p>

                <p>
                  📊 Active Leads :
                  {" "}
                  {provider.currentActiveLeads}
                </p>

                <p>
                  📦 Capacity :
                  {" "}
                  {provider.maxActiveLeads}
                </p>

                <p>
                  👤 Role :
                  {" "}
                  {provider.user.role}
                </p>

              </div>

              {/* Footer */}

              <div className="mt-6 pt-4 border-t border-white/10">

                <p className="text-xs text-gray-500">

                  Last Assigned :
                  {" "}

                  {provider.lastAssignedAt
                    ? new Date(
                        provider.lastAssignedAt
                      ).toLocaleString()
                    : "No Lead Assigned"}

                </p>

              </div>

            </div>

          );
        })}

      </div>

    </div>
  );
}