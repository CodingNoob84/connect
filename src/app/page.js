import HomePageBodyContent from "@/components/segments/HomePageBodyContent";
import Footer from "@/components/segments/Footer";
import Navbar from "@/components/segments/Navbar";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { AuthOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// const session={
//   user: {
//     name: 'Karthik Kumar',
//     email: 'karthithelearner@gmail.com',
//     image: 'https://lh3.googleusercontent.com/a/AAcHTtezN1mjrOk0CA_bvMcsUy5CLA3WvVNQmN3MYnlo9WOXzSQ=s96-c',
//     id: 'clk84hncy0000jfyoljzhmmev'
//   }
// }

export default async function Home() {
  const session = await getServerSession(AuthOptions);
  return (
    <div>
      <HomePageBodyContent userId={session?.user?.id} />
      <Footer />
    </div>
  );
}
