import Link from "next/link"
import Image from "next/image"

export default function PumpsSolutions() {
  return (
    <div className="container mx-auto px-5 py-8">
      <div className="mb-4 text-sm text-[#004080]">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">＞</span>
        <span>Pump solutions</span>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1e4785] mb-6 text-center">Pump Solutions</h1>

        <p className="text-base text-[#333333] leading-[1.6] mb-8">
          Global water challenges require excellence in pumping technologies and a close cooperation between pump
          designers, manufacturers, and pump engineers. In order to meet the customer's needs in the most demanding pump
          installations, we are firmly committed to design and manufacture the best pumps in the market.
        </p>

        <div className="bg-[#f5f5f5] py-3 px-4 rounded-lg mb-8 border-l-4 border-[#1e4785]">
          <h2 className="text-xl font-bold text-[#1e4785] text-center">Find in our pumps, the best solution</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-300 mb-8 rounded-lg overflow-hidden shadow-sm">
          <div className="border-r border-b border-gray-300 p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
            <Link href="/pumps-solutions/sewage-pumps" className="text-[#004080] hover:text-[#1e4785] text-center">
              <div className="mb-3 h-40 w-full relative">
                <Image
                  src="/placeholder.svg?height=160&width=160&text=Industrial+Sewage+Pump"
                  alt="Sewage Pumps"
                  width={160}
                  height={160}
                  className="mx-auto object-contain"
                />
              </div>
              <h3 className="font-bold mb-2">Sewage Pumps</h3>
              <p className="text-[#333333]">污水泵</p>
            </Link>
          </div>
          <div className="border-r border-b border-gray-300 p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
            <Link href="/pumps-solutions/chemical-pumps" className="text-[#004080] hover:text-[#1e4785] text-center">
              <div className="mb-3 h-40 w-full relative">
                <Image
                  src="/placeholder.svg?height=160&width=160&text=Chemical+Processing+Pump"
                  alt="Chemical pumps"
                  width={160}
                  height={160}
                  className="mx-auto object-contain"
                />
              </div>
              <h3 className="font-bold mb-2">Chemical pumps</h3>
              <p className="text-[#333333]">化工泵</p>
            </Link>
          </div>
          <div className="border-b border-gray-300 p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
            <Link href="/pumps-solutions/inline-pumps" className="text-[#004080] hover:text-[#1e4785] text-center">
              <div className="mb-3 h-40 w-full relative">
                <Image
                  src="/placeholder.svg?height=160&width=160&text=Inline+Circulation+Pump"
                  alt="In-line circulation pumps"
                  width={160}
                  height={160}
                  className="mx-auto object-contain"
                />
              </div>
              <h3 className="font-bold mb-2">In-line circulation pumps</h3>
              <p className="text-[#333333]">管道泵</p>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-300 mb-8 rounded-lg overflow-hidden shadow-sm">
          <div className="border-r border-b border-gray-300 p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
            <Link href="/pumps-solutions/solar-pumps" className="text-[#004080] hover:text-[#1e4785] text-center">
              <div className="mb-3 h-40 w-full relative">
                <Image
                  src="/placeholder.svg?height=160&width=160&text=Solar+Powered+Pump"
                  alt="Solar Pumps"
                  width={160}
                  height={160}
                  className="mx-auto object-contain"
                />
              </div>
              <h3 className="font-bold mb-2">Solar Pumps</h3>
              <p className="text-[#333333]">太阳能泵</p>
            </Link>
          </div>
          <div className="border-r border-b border-gray-300 p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
            <Link href="/pumps-solutions/borehole-pumps" className="text-[#004080] hover:text-[#1e4785] text-center">
              <div className="mb-3 h-40 w-full relative">
                <Image
                  src="/placeholder.svg?height=160&width=160&text=Deep+Well+Borehole+Pump"
                  alt="Borehole Pumps"
                  width={160}
                  height={160}
                  className="mx-auto object-contain"
                />
              </div>
              <h3 className="font-bold mb-2">Borehole Pumps</h3>
              <p className="text-[#333333]">深井泵</p>
            </Link>
          </div>
          <div className="border-b border-gray-300 p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
            <Link
              href="/pumps-solutions/self-priming-pumps"
              className="text-[#004080] hover:text-[#1e4785] text-center"
            >
              <div className="mb-3 h-40 w-full relative">
                <Image
                  src="/placeholder.svg?height=160&width=160&text=Self+Priming+Pump+Unit"
                  alt="Self-priming pumps"
                  width={160}
                  height={160}
                  className="mx-auto object-contain"
                />
              </div>
              <h3 className="font-bold mb-2">Self-priming pumps</h3>
              <p className="text-[#333333]">自吸泵</p>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <div className="border-r border-gray-300 p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
            <Link href="/pumps-solutions/booster-pumps" className="text-[#004080] hover:text-[#1e4785] text-center">
              <div className="mb-3 h-40 w-full relative">
                <Image
                  src="/placeholder.svg?height=160&width=160&text=Pressure+Booster+Pump"
                  alt="Booster Pumps"
                  width={160}
                  height={160}
                  className="mx-auto object-contain"
                />
              </div>
              <h3 className="font-bold mb-2">Booster Pumps</h3>
              <p className="text-[#333333]">增压泵</p>
            </Link>
          </div>
          <div className="border-r border-gray-300 p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
            <Link href="/pumps-solutions/submersible-pumps" className="text-[#004080] hover:text-[#1e4785] text-center">
              <div className="mb-3 h-40 w-full relative">
                <Image
                  src="/placeholder.svg?height=160&width=160&text=Submersible+Water+Pump"
                  alt="Submersible Pumps"
                  width={160}
                  height={160}
                  className="mx-auto object-contain"
                />
              </div>
              <h3 className="font-bold mb-2">Submersible Pumps</h3>
              <p className="text-[#333333]">潜水泵</p>
            </Link>
          </div>
          <div className="p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
            <Link
              href="/pumps-solutions/swimming-pool-pumps"
              className="text-[#004080] hover:text-[#1e4785] text-center"
            >
              <div className="mb-3 h-40 w-full relative">
                <Image
                  src="/placeholder.svg?height=160&width=160&text=Swimming+Pool+Filtration+Pump"
                  alt="Swimming pool pumps"
                  width={160}
                  height={160}
                  className="mx-auto object-contain"
                />
              </div>
              <h3 className="font-bold mb-2">Swimming pool pumps</h3>
              <p className="text-[#333333]">泳池泵</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
