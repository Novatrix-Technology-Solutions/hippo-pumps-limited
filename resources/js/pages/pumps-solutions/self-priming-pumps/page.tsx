import Image from "next/image"
import Link from "next/link"

export default function SelfPrimingPumps() {
  return (
    <div className="container mx-auto px-5 py-8">
      <div className="mb-4 text-sm text-[#666666]">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">＞</span>
        <Link href="/pumps-solutions" className="hover:underline">
          Pumps solutions
        </Link>
        <span className="mx-2">＞</span>
        <span>Self-priming pumps</span>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#004080] mb-4">WP</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <p className="text-base text-[#333333] mb-4">WP Non-clogging self-priming sewage pump.</p>
            <h3 className="font-bold text-lg mb-2">Features:</h3>
            <p className="text-base text-[#333333] mb-4">
              WP Non-clogging self-priming sewage pump is our latest developed product, and is suitable for the
              treatment project of municipal sewage and industrial sewage as well as stage treatment and concentrated
              treatment system of various sewages.
            </p>
            <ul className="list-disc ml-5 text-base text-[#333333] mb-4">
              <li>Stable performance, reliable operation.</li>
              <li>Rapid self-priming, high suction head.</li>
              <li>
                Back-pull-out construction: Convenient for maintenance and troubleshooting. Daily maintenance can be
                performed rapidly by common tools, saving time and labor.
              </li>
              <li>
                Semi-open impeller structure and non-clogging design: Strong passing capacity. Diameter of maximum solid
                particles is 76mm.
              </li>
              <li>
                Convenient usage: The pump can be mounted near cesspit, with only the suction pipe down into the liquid
                (The pump shall be filled with water for first start).
              </li>
            </ul>
            <h3 className="font-bold text-lg mb-2">Applications:</h3>
            <ul className="list-disc ml-5 text-base text-[#333333]">
              <li>Non-flammable and non-explosive liquid.</li>
              <li>Rainwater and common sewage.</li>
              <li>Municipal drainage project, construction site, drainage station of people's air defense system.</li>
              <li>
                Industrial sewage of light industry, paper mill, textile, food processing plant, chemical industry,
                electric utility, mines, etc.
              </li>
              <li>Sewage discharge in the residential area.</li>
              <li>Sewage and deposit of water purifying system.</li>
              <li>Tanning industry, sewage of slaughterhouse, fish breeding in the river and pond.</li>
              <li>Wine and sugar industry.</li>
              <li>Discharge not strongly corrosive but seriously polluted sewage.</li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="WP Pump"
              width={400}
              height={300}
              className="w-full border border-[#DDDDDD] rounded"
            />
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#004080] mb-4">HJ</h2>
        <div className="flex flex-col md:flex-row-reverse gap-6">
          <div className="md:w-1/2">
            <p className="text-base text-[#333333] mb-4">Jet pump</p>
            <h3 className="font-bold text-lg mb-2">Features:</h3>
            <ul className="list-disc ml-5 text-base text-[#333333] mb-4">
              <li>Self-priming jet assisted centrifugal pump to provide higher pressure and good suction ability.</li>
              <li>Pump body and impeller made of stainless steel, ejector made of abrasion proof polymer</li>
              <li>Motor with built-in automatically resetting thermal overload.</li>
              <li>Threaded suction and discharge connections for a quick and easy installation.</li>
            </ul>
            <h3 className="font-bold text-lg mb-2">Applications:</h3>
            <p className="text-base text-[#333333] mb-4">
              Applied to pumping clean water with no solid matter or wearing particles, low viscous, non corrosive,
              non-crystallizable, chemically neutral and close to water fluids
            </p>
            <ul className="list-disc ml-5 text-base text-[#333333]">
              <li>Tank filling.</li>
              <li>Domestic water supply</li>
              <li>Water transfer</li>
              <li>Pressure boosting</li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="HJ Pump"
              width={400}
              height={300}
              className="w-full border border-[#DDDDDD] rounded"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
