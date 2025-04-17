import Image from "next/image"
import Link from "next/link"

export default function BoreholePumps() {
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
        <span>Borehole pumps</span>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#004080] mb-4">BH</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <p className="text-base text-[#333333] mb-4">Submersible bore-hole pumps with floating impellers.</p>
            <h3 className="font-bold text-lg mb-2">Features:</h3>
            <p className="text-base text-[#333333] mb-4">
              Submersible deep well vertical multistage 3" and 3,5". SS304 Casing, Floating Impeller & diffuser made of
              POM (Polyoxymethylene). 3" and 3,5" types delivered as a set including:
            </p>
            <ul className="list-disc ml-5 text-base text-[#333333] mb-4">
              <li>Motor connection designed by NEMA dimension standards</li>
              <li>Single-phase rewindable motor: 180V-230V/50Hz.</li>
              <li>Equipped with start-up control box including the capacitor</li>
              <li>20mts of cable</li>
            </ul>
            <h3 className="font-bold text-lg mb-2">Applications:</h3>
            <ul className="list-disc ml-5 text-base text-[#333333]">
              <li>For water supply from wells or reservoirs.</li>
              <li>For domestic use, for civil and industrial applications.</li>
              <li>For garden use and irrigation.</li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/images/placeholder.svg"
              alt="BH Pump"
              width={400}
              height={300}
              className="w-full border border-[#DDDDDD] rounded"
            />
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#004080] mb-4">SX, SN</h2>
        <div className="flex flex-col md:flex-row-reverse gap-6">
          <div className="md:w-1/2">
            <p className="text-base text-[#333333] mb-4">SX, SN Stainless steel submersible borehole pump.</p>
            <h3 className="font-bold text-lg mb-2">Features:</h3>
            <p className="text-base text-[#333333] mb-4">
              Vertical multistage pump with water-filled or oiled-filled NEMA standard submersible motor for 4", 6", 8"
              deep well. Non-return valve with each pump. Impeller & diffuser made of stamping & welding 304 stainless
              steel.
            </p>
            <h3 className="font-bold text-lg mb-2">Applications:</h3>
            <ul className="list-disc ml-5 text-base text-[#333333]">
              <li>Circulation for boosting for clean water, demineralized water.</li>
              <li>Water supply, irrigating system.</li>
              <li>Lowering ground water level.</li>
              <li>Boosting.</li>
              <li>Other industrial applications.</li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/images/placeholder.svg"
              alt="SX, SN Pump"
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
