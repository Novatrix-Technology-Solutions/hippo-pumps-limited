
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] h-[70px] flex items-center justify-center">
      <Image 
        src="/images/hippo-logo.svg" 
        alt="Hippo Logo" 
        width={100} 
        height={40}
        className="h-10"
      />
    </footer>
  );
}
