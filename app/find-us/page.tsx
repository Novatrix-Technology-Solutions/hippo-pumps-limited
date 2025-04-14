import Image from "next/image"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function FindUs() {
  return (
    <div className="container mx-auto px-5 py-8">
      <h1 className="text-3xl font-bold text-[#1e4785] mb-5">Find Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-[#1e4785] mb-4 flex items-center">
            <MapPin className="mr-2 text-[#1e4785]" size={20} />
            HIPPO PUMPS LIMITED
          </h2>
          <div className="space-y-2.5 text-base text-[#333333]">
            <p className="font-semibold">Headquarters</p>
            <p className="flex items-center">
              <MapPin className="mr-2 text-[#1e4785]" size={16} />
              Chalala, Lusaka - Zambia
            </p>
            <p className="flex items-center">
              <Phone className="mr-2 text-[#1e4785]" size={16} />
              Tel. +260 975 318888
            </p>
            <p className="flex items-center">
              <Mail className="mr-2 text-[#1e4785]" size={16} />
              Email: info@hippopumps.com
            </p>
          </div>

          <h2 className="text-xl font-bold text-[#1e4785] mt-8 mb-4 flex items-center">
            <Clock className="mr-2 text-[#1e4785]" size={20} />
            Business Hours
          </h2>
          <div className="space-y-2.5 text-base text-[#333333]">
            <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
            <p>Saturday: 9:00 AM - 1:00 PM</p>
            <p>Sunday: Closed</p>
          </div>

          <h2 className="text-xl font-bold text-[#1e4785] mt-8 mb-4 flex items-center">
            <MapPin className="mr-2 text-[#1e4785]" size={20} />
            International Offices
          </h2>
          <div className="space-y-2.5 text-base text-[#333333]">
            <p>
              <strong>East Africa Regional Office</strong>
            </p>
            <p className="flex items-center">
              <MapPin className="mr-2 text-[#1e4785]" size={16} />
              Nairobi, Kenya
            </p>
            <p className="flex items-center">
              <Phone className="mr-2 text-[#1e4785]" size={16} />
              Tel. +254 712 345678
            </p>
            <p className="mt-4">
              <strong>Southern Africa Regional Office</strong>
            </p>
            <p className="flex items-center">
              <MapPin className="mr-2 text-[#1e4785]" size={16} />
              Johannesburg, South Africa
            </p>
            <p className="flex items-center">
              <Phone className="mr-2 text-[#1e4785]" size={16} />
              Tel. +27 11 789 1234
            </p>
          </div>
        </div>
        <div>
          <div className="border border-[#DDDDDD] h-[400px] w-full rounded-lg overflow-hidden shadow-md">
            <Image
              src="/placeholder.svg?height=400&width=600&text=Map+of+Hippo+Headquarters+Location"
              alt="Map"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-[#DDDDDD]">
            <h3 className="font-bold text-[#1e4785] mb-2">Directions</h3>
            <p className="text-[#333333]">
              Our headquarters is located in the Chalala area of Lusaka, approximately 15 km from the city center. From
              the airport, take the Great East Road and follow signs to Chalala. Our facility is marked with the Hippo
              logo and is visible from the main road.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
