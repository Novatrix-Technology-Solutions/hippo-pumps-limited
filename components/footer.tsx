import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] py-12 px-5">
      <div className="flex items-center justify-center mb-6">
        <Image 
          src="/images/hippo-logo.svg" 
          alt="Hippo Logo" 
          width={200} 
          height={80}
        />
      </div>
      <div className="text-center text-[#333333]">
        <h2 className="text-2xl font-bold text-[#1e4785] mb-4">HIPPO PUMPS LIMITED</h2>
        <p className="text-base mb-2">Headquarters</p>
        <p className="text-base mb-2">Chalala, Lusaka - Zambia</p>
        <p className="text-base mb-2">Tel. +260 975 318888</p>
      </div>
    </footer>
  );
}