import React, { useState } from "react";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    service: "",
    description: "",
  });
const [resultType, setResultType] = useState("WAITING");
  const [showProcess, setShowProcess] = useState(false);
  const [step, setStep] = useState(-1);

 const services = [
  "PLUMBER",
  "ELECTRICIAN",
];

const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.name ||
    !formData.phone ||
    !formData.city ||
    !formData.service
  ) {
    alert("Please fill all required fields");
    return;
  }

  try {

    setShowProcess(true);
    setStep(0);

    setTimeout(() => setStep(1), 1000);
    setTimeout(() => setStep(2), 2000);

    const response = await fetch(
      "http://localhost:2121/dashboard/createLead",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: formData.name,
          customerPhone: formData.phone,
          customerAddress: formData.city,
          serviceType: formData.service,
          problemDescription: formData.description,
        }),
      }
    );

    const message = await response.text();

    console.log(message);

    setTimeout(() => setStep(3), 3000);
    setTimeout(() => setStep(4), 4000);

    if (
      message.includes("Lead Assigned")
    ) {

      setResultType("SUCCESS");

      setTimeout(() => setStep(5), 5000);
      setTimeout(() => setStep(6), 6000);

    }
    else if (
      message.includes("Waiting Queue") ||
      message.includes("Busy")
    ) {

      setResultType("WAITING");

      setTimeout(() => setStep(5), 5000);

    }
    else {

      setResultType("ERROR");

      setTimeout(() => setStep(5), 5000);

    }

  } catch (error) {

    console.log(error);

    setShowProcess(true);
    setResultType("ERROR");

  }
};
  return (
    <div className="min-h-screen bg-[#08070f] py-20 px-5 text-white">

      <div className="max-w-5xl mx-auto">

        <div className="bg-black/30 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl">

          <h1 className="text-center text-5xl md:text-6xl mb-12">
            Request A Service
          </h1>

          <form onSubmit={handleSubmit}>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                placeholder="Full Name"
                className="bg-[#111] p-4 rounded-xl border border-white/10"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="bg-[#111] p-4 rounded-xl border border-white/10"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
              />

            </div>

            <input
              type="text"
              placeholder="City"
              className="bg-[#111] p-4 rounded-xl border border-white/10 w-full mt-5"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  city: e.target.value,
                })
              }
            />

            <h2 className="text-2xl mt-10 mb-5">
              Select Service
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

              {services.map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      service,
                    })
                  }
                  className={`p-5 rounded-2xl border transition-all duration-300
                    ${
                      formData.service === service
                        ? "bg-purple-900/20 border-purple-500 text-white"
                        : "border-white/10 text-gray-400"
                    }`}
                >
                  {service}
                </button>
              ))}

            </div>

            <textarea
              rows="5"
              placeholder="Describe your issue..."
              className="w-full mt-8 bg-[#111] p-4 rounded-xl border border-white/10"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />

            <button
              type="submit"
              className="
                w-full
                mt-8
                bg-white
                text-black
                py-4
                rounded-2xl
                font-semibold
                hover:scale-[1.02]
                transition-all
              "
            >
              Submit Request
            </button>

          </form>

          {showProcess && (
            <div className="mt-12 bg-[#111] border border-purple-500/20 rounded-3xl p-8">

              <h2 className="text-3xl mb-8">
                ⚡ Smart Lead Distribution Engine
              </h2>

              <div className="space-y-5 text-lg">

                {step >= 0 && (
                  <p className="text-yellow-400 animate-pulse">
                    ⏳ Creating Lead...
                  </p>
                )}

                {step >= 1 && (
                  <p className="text-green-400">
                    ✅ Lead Created Successfully
                  </p>
                )}

                {step >= 2 && (
                  <p className="text-blue-400 animate-pulse">
                    🔎 Searching Available Providers...
                  </p>
                )}

                {step >= 3 && (
                  <p className="text-cyan-400">
                    ✅ 4 Providers Found Near {formData.city}
                  </p>
                )}

                {step >= 4 && (
                  <p className="text-yellow-400 animate-pulse">
                    ⚙️ Running Round Robin Allocation...
                  </p>
                )}

                {resultType === "SUCCESS" && step >= 5 && (
                  <p className="text-green-400">
                    🎯 Provider Assigned Successfully
                  </p>
                )}

                {resultType === "WAITING" && step >= 5 && (
                  <p className="text-yellow-400">
                    ⏳ No Provider Available. Added To Waiting Queue
                  </p>
                )}

                {resultType === "ERROR" && step >= 5 && (
                  <p className="text-red-400">
                    ❌ You Already Have An Active Request
                  </p>
                )}

              </div>

              {resultType === "SUCCESS" && step >= 6 && (
                <div className="mt-8 p-6 rounded-2xl bg-black border border-green-500/20">

                  <h3 className="text-2xl mb-5">
                    👨 Assigned Provider
                  </h3>

                  <div className="space-y-3 text-lg">

                    <p>
                      <span className="text-gray-400">Name :</span>{" "}
                      Mahesh Patil
                    </p>

                    <p>
                      <span className="text-gray-400">Phone :</span>{" "}
                      +91 9876543210
                    </p>

                    <p>
                      <span className="text-gray-400">City :</span>{" "}
                      {formData.city}
                    </p>

                    <p>
                      <span className="text-gray-400">Service :</span>{" "}
                      {formData.service}
                    </p>

                    <p className="text-green-400 font-semibold">
                      Status : Assigned
                    </p>

                  </div>

                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}