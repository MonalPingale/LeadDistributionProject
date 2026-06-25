import React from "react";
import { ArrowRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen bg-[#08070f] overflow-hidden">

      {/* Soft Grid Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Purple Glow */}
      <div
        className="
        absolute
        top-[-250px]
        left-1/2
        -translate-x-1/2
        w-[900px]
        h-[900px]
        rounded-full
        bg-purple-900/10
        blur-[220px]
        "
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 max-w-6xl mx-auto px-5">

        {/* Badge */}
        <div className="flex justify-center pt-24 md:pt-32">
          <div
            className="
            px-6
            py-3
            rounded-full
            border
            border-gray-800
            bg-black/30
            backdrop-blur-md
            "
          >
            <span className="text-xs md:text-sm text-gray-300">
              ● Engine Update:
            </span>

            <span className="ml-2 text-xs md:text-sm text-gray-400">
              Smart Lead Engine Configured
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mt-12">

          <h1
            className="
            text-[52px]
            sm:text-[64px]
            md:text-[80px]
            lg:text-[95px]
            font-semibold
            text-white
            leading-[0.95]
            tracking-[-0.04em]
            "
          >
            Distribute Leads Instantly.
          </h1>

          <h2
            className="
            text-[52px]
            sm:text-[64px]
            md:text-[80px]
            lg:text-[95px]
            font-semibold
            text-gray-400
            leading-[0.95]
            tracking-[-0.04em]
            mt-2
            "
          >
            Scale Without Chaos.
          </h2>

          <p
            className="
            max-w-3xl
            mx-auto
            mt-8
            px-4
            text-base
            md:text-xl
            text-gray-400
            leading-8
            "
          >
            Automatically assign, track and manage incoming service leads
            with intelligent routing, round-robin allocation,
            database-level deduplication and real-time analytics.
          </p>
        </div>

        {/* Buttons */}
        <div
          className="
          flex
          flex-col
          md:flex-row
          justify-center
          items-center
          gap-5
          mt-12
          "
        >
          <button
  onClick={() => navigate("/request-service")}
  className="
  w-full
  max-w-[340px]
  md:w-auto
  bg-white
  text-black
  px-10
  py-5
  rounded-2xl
  font-semibold
  flex
  items-center
  justify-center
  gap-2
  hover:scale-105
  transition-all
  duration-300
  "
>
  Launch Public Request Form
  <ArrowRight size={18} />
</button>

          <button
            className="
            w-full
            max-w-[340px]
            md:w-auto
            border
            border-gray-800
            px-10
            py-5
            rounded-2xl
            text-white
            hover:bg-white/5
            transition-all
            duration-300
            "
          >
            Open Live Dashboard
          </button>
        </div>

      </div>
    </section>
  );
}
