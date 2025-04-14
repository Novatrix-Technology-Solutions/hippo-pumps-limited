
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] h-[70px] flex items-center justify-center">
      
      <Image 
        src="/images/hippo-logo.svg" 
        alt="Hippo Logo" 
        width={120} 
        height={48}
        className="h-10"
      />
    </footer>
  );
}
