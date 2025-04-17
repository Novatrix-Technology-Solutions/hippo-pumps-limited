import Image from "next/image"
import Link from "next/link"

export default function SubmersibleSewagePumps() {
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
        <span>Submersible sewage pumps</span>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#004080] mb-4">WDROO</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <p className="text-base text-[#333333] mb-4">WDROO Submersible sewage pumps.</p>
            <h3 className="font-bold text-lg mb-2">Features:</h3>
            <ul className="list-disc ml-5 text-base text-[#333333] mb-4">
              <li>
                WF/WX/WG are optimized pumps with new hydraulics, seal technology, structure and protection. More
                reliable and safe pumps. Easy to use, long service, good drainage capacity. The whole series is easy for
                selection. We recommend to fit it with electronic control cabinet with full pump protection.
              </li>
              <li>
                Optimized performance with high efficiency two channel impeller, two mechanical seal to get better
                lubrication and cooling, running stable without clogging, easy pass for solid particles.
              </li>
              <li>Mechanical seal is in serial, the shaft seal is more reliable, long service.</li>
              <li>IPX8 oversized motor, Class F insulation, long service of motor with continuous running.</li>
              <li>Humidity and thermal protections in the motor available on request.</li>
            </ul>
            <h3 className="font-bold text-lg mb-2">Applications:</h3>
            <p className="text-base text-[#333333]">
              Building services, hospitals, residential areas, municipal projects, roads, factory sewage, small sewage
              treatment, etc. The pumped liquid suitable are rainwater, raw water, wastewater with solids and process
              water.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="WDROO Pump"
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
