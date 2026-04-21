"use client";

import { useMemo, useState } from "react";

export default function SavingsCalculator() {
  const [fuel, setFuel] = useState("");
  const [cost, setCost] = useState("");
  const [days, setDays] = useState("");

  const monthlySpend = useMemo(() => {
    const fuelNum = Number(fuel) || 0;
    const costNum = Number(cost) || 0;
    const daysNum = Number(days) || 0;
    return fuelNum * costNum * daysNum;
  }, [fuel, cost, days]);

  const estimatedSaving = monthlySpend * 0.4;

  return (
    <section id="calculator" className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
            Savings Calculator
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Estimate your fuel savings
          </h2>
          <p className="mt-4 text-lg leading-8 text-zinc-600">
            Enter your current usage to see how much you could save with hybrid
            power.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-zinc-900">
                Daily fuel usage (litres)
              </label>
              <input
                type="number"
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
                placeholder="e.g. 200"
                className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-900">
                Fuel cost per litre (£)
              </label>
              <input
                type="number"
                step="0.01"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="e.g. 1.50"
                className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-900">
                Days running per month
              </label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="e.g. 25"
                className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-10">
            <p className="text-sm text-zinc-500">Estimated monthly spend</p>
            <p className="mt-2 text-4xl font-semibold text-zinc-900">
              £{monthlySpend.toLocaleString()}
            </p>

            <div className="mt-8 h-px bg-zinc-200" />

            <p className="mt-8 text-sm text-zinc-500">
              Estimated monthly saving
            </p>
            <p className="mt-2 text-4xl font-semibold text-green-700">
              £{estimatedSaving.toLocaleString()}
            </p>

            <p className="mt-4 text-sm leading-6 text-zinc-600">
              This example uses a 40% saving assumption as a starting point.
              We can refine this later using real generator and site data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}