import Image from "next/image";

const features = [
  {
    icon: "/assets/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/assets/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/assets/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-linear-to-b from-brand/10 to-brand/15 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-medium text-zinc-900 sm:text-5xl lg:text-6xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-4 text-sm text-zinc-500 sm:text-base">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg bg-white p-6 shadow-sm sm:p-8"
            >
              <Image
                src={feature.icon}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <h3 className="mt-6 text-lg font-semibold text-zinc-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
