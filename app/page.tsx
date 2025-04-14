import Image from "next/image"
import Link from "next/link"
import { CircleCheck, Droplets, Gauge, Recycle, Wrench } from "lucide-react"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[300px] bg-[#1e4785]">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold text-center">
            THE WORLD OF PUMPS, THE KINGDOM OF PUMPS
          </h1>
        </div>
      </div>

      {/* Company Description Section */}
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Our Facility</h2>
            <Image
              src="/images/industrial-pump-system.jpg"
              alt="Pump Manufacturing Facility"
              width={400}
              height={300}
              className="mx-auto rounded-md shadow-md"
            />
          </div>
        </div>
        <div className="md:w-1/2 bg-[#e63946] text-white p-8">
          <p className="text-base leading-[1.6]">
            Hippo is a company committed to its customers and to addressing the challenges of water management. We work
            to create better pumps and develop our customers' pump businesses. From our factory near Lusaka, we provide
            a world of pump solutions.
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-[#1e4785] text-white py-12">
        <div className="container mx-auto px-5">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 p-4">
              <h2 className="text-2xl font-bold mb-4">Our Products</h2>
              <Image
                src="/images/placeholder.svg"
                alt="Industrial Pump System"
                width={300}
                height={200}
                className="mx-auto rounded-md shadow-md"
              />
            </div>
            <div className="md:w-2/3 p-4 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">Pumps Solutions</h2>
              <p className="text-lg mb-6">
                Hippo offers a wide range of pumps that meet different technical needs, providing quality solutions for
                water pumping systems.
              </p>
              <div>
                <Link
                  href="/pumps-solutions"
                  className="bg-white text-[#1e4785] px-4 py-2 rounded hover:bg-gray-100 inline-block"
                >
                  Pump solutions &gt;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 border-t border-b">
        <div className="border-r p-8 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
          <h3 className="text-[#004080] font-semibold mb-4">Building Services</h3>
          <Image
            src="/placeholder.svg?height=150&width=150&text=Commercial+Building+Pump"
            alt="Building services"
            width={150}
            height={150}
            className="mx-auto rounded-md"
          />
        </div>
        <div className="border-r p-8 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
          <h3 className="text-[#004080] font-semibold mb-4">Irrigation</h3>
          <Image
            src="/placeholder.svg?height=150&width=150&text=Agricultural+Irrigation+System"
            alt="Irrigation"
            width={150}
            height={150}
            className="mx-auto rounded-md"
          />
        </div>
        <div className="border-r p-8 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
          <h3 className="text-[#004080] font-semibold mb-4">Mining</h3>
          <Image
            src="/placeholder.svg?height=150&width=150&text=Mining+Dewatering+Pump"
            alt="Mine"
            width={150}
            height={150}
            className="mx-auto rounded-md"
          />
        </div>
        <div className="p-8 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
          <h3 className="text-[#004080] font-semibold mb-4">Industrial</h3>
          <Image
            src="/placeholder.svg?height=150&width=150&text=Industrial+Process+Pump"
            alt="Industrial"
            width={150}
            height={150}
            className="mx-auto rounded-md"
          />
        </div>
      </div>

      {/* Hy5 Program Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-5">
          <h2 className="text-2xl font-bold text-[#1e4785] mb-6 text-center">Hy5 Program</h2>
          <p className="text-[#333333] text-base leading-[1.6] text-center max-w-4xl mx-auto mb-10">
            We design and build our pumps with five key principles in mind: performance, constant innovation, quality,
            environmental responsibility, and commitment to our clients. These five axes form the foundation of our new
            pump concept.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
            <div className="bg-white p-6 rounded-lg shadow-md text-center border border-[#1e4785] hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Gauge className="h-12 w-12 text-[#1e4785]" />
              </div>
              <h3 className="text-xl font-bold text-[#1e4785] mb-2">Performance</h3>
              <p className="text-sm text-[#333333]">
                High-efficiency pumps designed for optimal performance in all conditions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center border border-[#1e4785] hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Wrench className="h-12 w-12 text-[#1e4785]" />
              </div>
              <h3 className="text-xl font-bold text-[#1e4785] mb-2">Innovation</h3>
              <p className="text-sm text-[#333333]">Constant innovation in design and manufacturing processes.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center border border-[#1e4785] hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <CircleCheck className="h-12 w-12 text-[#1e4785]" />
              </div>
              <h3 className="text-xl font-bold text-[#1e4785] mb-2">Quality</h3>
              <p className="text-sm text-[#333333]">Highest quality standards in materials and manufacturing.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center border border-[#1e4785] hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Recycle className="h-12 w-12 text-[#1e4785]" />
              </div>
              <h3 className="text-xl font-bold text-[#1e4785] mb-2">Environment</h3>
              <p className="text-sm text-[#333333]">Environmentally friendly designs and manufacturing processes.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center border border-[#1e4785] hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Droplets className="h-12 w-12 text-[#1e4785]" />
              </div>
              <h3 className="text-xl font-bold text-[#1e4785] mb-2">Commitment</h3>
              <p className="text-sm text-[#333333]">Dedicated to customer satisfaction and long-term partnerships.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-12 bg-gray-100">
        <div className="container mx-auto px-5">
          <h2 className="text-2xl font-bold text-[#1e4785] mb-6">HIPPO PUMPS LIMITED</h2>
          <p className="text-[#333333] text-base mb-2">Headquarters</p>
          <p className="text-[#333333] text-base mb-2">Chalala, Lusaka - Zambia</p>
          <p className="text-[#333333] text-base mb-2">Tel. +260 975 318888</p>
        </div>
      </div>
    </div>
  )
}
