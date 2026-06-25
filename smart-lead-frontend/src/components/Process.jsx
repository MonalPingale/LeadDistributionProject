import React from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  ShieldCheck,
  Database,
  Users,
  Activity,
} from "lucide-react";

const steps = [
  {
    no: "01",
    title: "Lead Intake",
    icon: <ClipboardList size={28} />,
    desc: "Customer submits service request through website, mobile app or API endpoint.",
  },
  {
    no: "02",
    title: "Validation",
    icon: <ShieldCheck size={28} />,
    desc: "System validates phone number, service type and mandatory request fields.",
  },
  {
    no: "03",
    title: "Deduplication",
    icon: <Database size={28} />,
    desc: "Duplicate leads are blocked using phone number and service combinations.",
  },
  {
    no: "04",
    title: "Assignment",
    icon: <Users size={28} />,
    desc: "Round Robin and mandatory provider mapping allocate leads automatically.",
  },
  {
    no: "05",
    title: "Tracking",
    icon: <Activity size={28} />,
    desc: "Providers receive assigned leads instantly and dashboard updates in real time.",
  },
];

export default function Process() {
  return (
    <section className="relative py-28 bg-[#08070f] overflow-hidden">

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-900/10 blur-[180px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-5">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            text-center
            text-4xl
            md:text-6xl
            text-white
            font-semibold
            mb-5
          "
        >
          Distribution Pipeline
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="
            text-center
            text-gray-400
            max-w-3xl
            mx-auto
            mb-20
          "
        >
          Every incoming lead follows a structured pipeline ensuring
          validation, deduplication, fair allocation and real-time tracking.
        </motion.p>

        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-6">

          {steps.map((step, index) => (
            <motion.div
              key={step.no}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -10,
              }}
              className="
                relative
                bg-black/30
                backdrop-blur-xl
                border
                border-white/10
                rounded-3xl
                p-7
                min-h-[320px]
                overflow-hidden
                group
              "
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-600/0 to-purple-600/10 opacity-0 group-hover:opacity-100 transition duration-500" />

              <p className="text-indigo-400 font-bold">
                {step.no}
              </p>

              <div className="mt-5 text-indigo-300">
                {step.icon}
              </div>

              <h3 className="text-3xl text-white mt-5">
                {step.title}
              </h3>

              <p className="text-gray-400 leading-8 mt-6">
                {step.desc}
              </p>
            </motion.div>
          ))}

        </div>

        {/* Mobile */}
        <div className="lg:hidden flex flex-col gap-5">

          {steps.map((step, index) => (
            <motion.div
              key={step.no}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="
                bg-black/30
                backdrop-blur-xl
                border
                border-white/10
                rounded-3xl
                p-6
              "
            >
              <div className="flex items-center gap-4">

                <div className="text-indigo-400 font-bold">
                  {step.no}
                </div>

                <div className="text-indigo-300">
                  {step.icon}
                </div>

                <h3 className="text-white text-xl">
                  {step.title}
                </h3>

              </div>

              <p className="text-gray-400 mt-4 leading-7">
                {step.desc}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}