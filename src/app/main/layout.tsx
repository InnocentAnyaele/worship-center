import NavBar from "@/components/navbar/NavBar";
import { Montserrat } from "@next/font/google"

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })


export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode,
  }) {
    return (


      <section className={`${montserrat.variable} font-sans`}>
        {/* Include shared UI here e.g. a header or sidebar */}
        <NavBar/>
  
        {children}
      </section>
    );
  }