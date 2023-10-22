import Navbar from "./_component/Navbar"
import SIdebar from "./_component/SIdebar"


export default function DiscussionLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    
    return (
        <section className="bg-[#F0EEF6]">
            <Navbar/>
            {children}
        </section>
    )
  }