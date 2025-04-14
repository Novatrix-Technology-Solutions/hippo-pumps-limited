export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] h-[50px] flex items-center justify-center">
      <p className="text-[#666666] text-sm">
        &copy; {new Date().getFullYear()} Hippo Pumps Limited. All rights reserved.
      </p>
    </footer>
  )
}
