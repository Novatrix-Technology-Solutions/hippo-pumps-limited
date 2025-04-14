import Link from "next/link"
import Image from "next/image"

export default function TheCompany() {
  return (
    <div className="container mx-auto px-5 py-8">
      <div className="mb-4 text-sm text-[#004080]">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">＞</span>
        <span>The company</span>
      </div>

      <h1 className="text-3xl font-bold text-[#1e4785] mb-5">The company and the water challenges</h1>

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="md:w-1/2">
          <h2 className="text-xl italic text-[#e63946] mb-4">Be pumping partners</h2>

          <div className="space-y-5 text-[#333333] text-base leading-[1.6]">
            <p>
              Global water challenges require excellence in pumping technologies and close cooperation between pump
              designers, manufacturers, and pump engineers.
            </p>
            <p>
              To better meet our customers' needs and requirements, our company is expanding its operations worldwide.
              We already provide timely and effective services in more than 20 countries.
            </p>
            <p>
              Hippo has developed a wide range of pumping solutions for many applications including building services,
              mining, irrigation, and industrial processes. Our customers benefit from the highest performance in
              booster sets and pressurization, fire-fighting sets, underground water pumping, HVAC systems, drainage and
              sewage solutions, utilities, and OEM integrations.
            </p>
          </div>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/placeholder.svg?height=400&width=600&text=Hippo+Manufacturing+Facility"
            alt="Hippo Manufacturing Facility"
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>

      <div className="space-y-5 text-[#333333] text-base leading-[1.6] mb-10">
        <p>
          We have significant industrial capacity with production exceeding half a million units per year. At our
          organization, we design high-efficiency centrifugal pumps using the best CFD, CAD, and FEA tools. We are proud
          of our industrial facilities where we design and produce our own patterns and molds. We have vertically
          integrated all manufacturing processes including foundry, machining, static and dynamic balance testing, and
          hydraulic and electrical performance testing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-[#DDDDDD] hover:shadow-lg transition-shadow">
          <h3 className="font-bold text-[#1e4785] text-lg mb-2">Hippo's Code of Conduct</h3>
          <p className="text-[#666666] text-sm mb-4">
            Hippo Board approved the Compliance document and its principles of government.
          </p>
          <p className="text-[#333333] text-base">
            Hippo has compiled its commitment to ethics and legislation in relation to third parties in a public
            document of principles. The document has been developed with the entire Hippo team, and its implementation
            has begun with a committee that will ensure compliance and strengthen the company's business culture.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-[#DDDDDD] hover:shadow-lg transition-shadow">
          <h3 className="font-bold text-[#1e4785] text-lg mb-2">Hippo's Quality and Environment policies</h3>
          <p className="text-[#666666] text-sm mb-4">
            The principles of the Quality and Environment Policy form the foundation of Hippo's management processes.
          </p>
          <p className="text-[#333333] text-base">
            Hippo has adopted a policy centered on quality and environmental commitment to satisfy customers with
            reliable and efficient products and services, made with the highest levels of quality and environmental
            responsibility. To achieve this, the company focuses on processes that add value to customers and
            shareholders, aiming to establish a center of excellence in quality, agility, flexibility, and environmental
            protection and respect.
          </p>
        </div>
      </div>
    </div>
  )
}
