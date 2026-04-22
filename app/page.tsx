"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";

export default function HomePage() {
  const [fuel, setFuel] = useState("");
  const [cost, setCost] = useState("");
  const [days, setDays] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const monthlySpend = useMemo(() => {
    const fuelNum = Number(fuel) || 0;
    const costNum = Number(cost) || 0;
    const daysNum = Number(days) || 0;
    return fuelNum * costNum * daysNum;
  }, [fuel, cost, days]);

  const estimatedSaving = monthlySpend * 0.4;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          fuel,
          cost,
          days,
          monthlySpend: Math.round(monthlySpend),
          estimatedSaving: Math.round(estimatedSaving),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send enquiry.");
      }

      setSubmitMessage("Thanks — we've received your enquiry. We'll be in touch shortly.");
      setName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center">
  <Image
    src="/logo.png"
    alt="Fuel Save Group"
    width={420}
    height={120}
    priority
    className="h-auto w-[180px] sm:w-[230px]"
  />
</a>

          <nav className="hidden gap-8 text-sm md:flex">
            <a href="#how" className="hover:text-zinc-500">
              How It Works
            </a>
            <a href="#industries" className="hover:text-zinc-500">
              Industries
            </a>
            <a href="#calculator" className="hover:text-zinc-500">
              Calculator
            </a>
            <a href="#contact" className="hover:text-zinc-500">
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm text-white transition hover:bg-zinc-700"
          >
            Get Savings Estimate
          </a>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:py-24">
        <div className="max-w-xl">
          <h1 className="text-5xl font-semibold leading-tight">
            Cut Generator Fuel Costs
            <span className="block text-zinc-500">by up to 80%</span>
          </h1>

          <p className="mt-6 text-lg text-zinc-600">
            Hybrid power systems for construction, telecoms and event sites.
            Reduce diesel usage, lower running costs, and cut site noise and
            emissions.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="#calculator"
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm text-white transition hover:bg-zinc-700"
            >
              Calculate Your Savings
            </a>

            <a
              href="#contact"
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm transition hover:border-zinc-500"
            >
              Book a Site Assessment
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {[
              "Lower diesel use",
              "Quieter sites",
              "Reduced runtime",
              "Clear ROI",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border px-4 py-2 text-sm text-zinc-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border p-6">
            <p className="text-sm text-zinc-500">Fuel Reduction</p>
            <p className="mt-2 text-3xl font-semibold">Up to 80%</p>
          </div>

          <div className="rounded-2xl border bg-zinc-900 p-6 text-white">
            <p className="text-sm text-zinc-400">Runtime</p>
            <p className="mt-2 text-3xl font-semibold">Reduced</p>
          </div>

          <div className="rounded-2xl border bg-green-50 p-6">
            <p className="text-sm text-green-700">Noise</p>
            <p className="mt-2 text-3xl font-semibold">Lower</p>
          </div>

          <div className="rounded-2xl border p-6">
            <p className="text-sm text-zinc-500">ROI</p>
            <p className="mt-2 text-3xl font-semibold">Clear</p>
          </div>
        </div>
      </section>

      <section id="how" className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              A straightforward route to lower site running costs
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600">
              We assess your site, match the right hybrid setup, and focus on
              measurable fuel, runtime, and cost reduction.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 transition hover:-translate-y-1 hover:shadow-md">
              <div className="text-sm font-semibold text-green-700">01</div>
              <h3 className="mt-4 text-xl font-semibold text-zinc-900">
                Assess the site
              </h3>
              <p className="mt-3 leading-7 text-zinc-600">
                We review your generator size, operating hours, load profile and
                site setup to understand where diesel is being wasted.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 transition hover:-translate-y-1 hover:shadow-md">
              <div className="text-sm font-semibold text-green-700">02</div>
              <h3 className="mt-4 text-xl font-semibold text-zinc-900">
                Match the solution
              </h3>
              <p className="mt-3 leading-7 text-zinc-600">
                We identify the right hybrid power approach for construction,
                telecoms or event environments based on practical site demands.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 transition hover:-translate-y-1 hover:shadow-md">
              <div className="text-sm font-semibold text-green-700">03</div>
              <h3 className="mt-4 text-xl font-semibold text-zinc-900">
                Measure the result
              </h3>
              <p className="mt-3 leading-7 text-zinc-600">
                The outcome is lower fuel use, reduced generator runtime,
                quieter operation, and clearer ROI you can actually show to
                decision-makers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="industries"
        className="border-t border-zinc-200 bg-zinc-950 text-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-400">
              Industries
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Built for demanding site environments
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-300 tracking-normal">
              Fuel Save Group supports sectors where diesel usage, runtime,
              noise and operating costs matter most.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:-translate-y-1 hover:border-green-500">
              <h3 className="text-xl font-semibold text-white tracking-normal">
                Construction
              </h3>
              <p className="mt-3 leading-7 text-zinc-300">
                Reduce fuel burn, generator runtime and unnecessary noise on
                active construction projects and temporary site setups.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:-translate-y-1 hover:border-green-500">
              <h3 className="text-xl font-semibold text-white">Telecoms</h3>
              <p className="mt-3 leading-7 text-zinc-300">
                Improve efficiency on remote infrastructure sites where
                reliability, access and operating cost all matter.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:-translate-y-1 hover:border-green-500">
              <h3 className="text-xl font-semibold text-white">Events</h3>
              <p className="mt-3 leading-7 text-zinc-300">
                Deliver quieter, cleaner temporary power for event environments
                where fuel spend, emissions and guest experience all matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
              Results
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Real-world savings on active sites
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600">
              Our approach delivers measurable reductions in fuel usage, runtime,
              and operating costs across multiple sectors.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border p-8">
              <p className="text-sm text-zinc-500">Fuel Reduction</p>
              <p className="mt-2 text-4xl font-semibold text-green-700">
                Up to 80%
              </p>
              <p className="mt-3 text-zinc-600">
                Achieved through hybrid integration and reduced generator
                dependency.
              </p>
            </div>

            <div className="rounded-3xl border p-8">
              <p className="text-sm text-zinc-500">Runtime Reduction</p>
              <p className="mt-2 text-4xl font-semibold">Up to 65%</p>
              <p className="mt-3 text-zinc-600">
                Lower generator usage across operating hours on site.
              </p>
            </div>

            <div className="rounded-3xl border p-8">
              <p className="text-sm text-zinc-500">Cost Savings</p>
              <p className="mt-2 text-4xl font-semibold">£££</p>
              <p className="mt-3 text-zinc-600">
                Reduced fuel spend and improved operational efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

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

      <section
        id="contact"
        className="border-t border-zinc-200 bg-zinc-900 text-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-2xl">
  <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
    See what this could look like on your site
  </h2>

  <p className="mt-4 text-lg leading-8 text-zinc-300">
    Leave your details and we’ll run a more accurate saving
    calculation based on your actual setup.
  </p>

  {monthlySpend > 0 && (
  <div className="mt-6 rounded-2xl bg-zinc-800 p-5 border border-zinc-700">
    <p className="text-sm text-zinc-400">Estimated impact</p>

    <p className="mt-2 text-2xl font-semibold text-white">
      £{monthlySpend.toLocaleString()}
      <span className="text-sm text-zinc-400 font-normal"> / month spend</span>
    </p>

    <p className="mt-2 text-3xl font-bold text-green-400">
      £{estimatedSaving.toLocaleString()}
      <span className="text-sm font-medium text-zinc-400">
        {" "}potential monthly saving
      </span>
    </p>
  </div>
)}

  <p className="mt-6 text-green-400 font-medium">
    ✔ Takes 30 seconds • ✔ No obligation • ✔ Real cost breakdown
  </p>
</div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <form onSubmit={handleSubmit} className="space-y-4">
  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Your name"
    className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-400 outline-none transition focus:border-green-500"
  />

  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Email address"
    className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-400 outline-none transition focus:border-green-500"
  />

  <input
  type="tel"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  placeholder="Phone number"
  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-400 outline-none transition focus:border-green-500"
/>

<button
  type="submit"
  disabled={isSubmitting}
  className="w-full rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-500 disabled:opacity-60"
>
  {isSubmitting ? "Sending..." : "Get My Exact Monthly Savings"}
</button>
{submitMessage && (
  <p className="text-sm mt-2 text-zinc-300">
    {submitMessage}
  </p>
)}

<p className="text-xs text-zinc-400 mt-2">
  Takes less than 30 seconds • No obligation
</p>
</form>

            <div className="rounded-3xl border border-zinc-700 bg-zinc-800 p-8">
              <p className="text-sm text-zinc-400">Why enquire?</p>

              <ul className="mt-6 space-y-4 text-zinc-300">
                <li>✔ Site-specific savings breakdown</li>
                <li>✔ Real fuel & runtime projections</li>
                <li>✔ No obligation consultation</li>
                <li>✔ Identify quick cost wins</li>
              </ul>

              <div className="mt-8 border-t border-zinc-700 pt-6">
                <p className="text-sm text-zinc-400">Typical outcome:</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  £2,000–£10,000+ monthly savings
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}