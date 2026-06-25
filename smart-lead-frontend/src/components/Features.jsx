import React from 'react'

function Features() {
  return (
    <section className="grid md:grid-cols-3 gap-6 px-10 py-20">

      <div className="border border-gray-800 p-6 rounded-xl">
        <h2>⚡ Smart Allocation</h2>
        <p>Round robin lead assignment.</p>
      </div>

      <div className="border border-gray-800 p-6 rounded-xl">
        <h2>🛡 Duplicate Prevention</h2>
        <p>Avoid duplicate leads.</p>
      </div>

      <div className="border border-gray-800 p-6 rounded-xl">
        <h2>📊 Dashboard</h2>
        <p>Track providers and leads.</p>
      </div>

    </section>
  );
}

export default Features;
