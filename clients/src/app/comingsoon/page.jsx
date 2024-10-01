import ComingSoon from "@/components/Comingsoon";

export default function HomePage() {
  const launchDate = "2024-12-31T00:00:00"; // Set your launch date here
  return (
    <div className=" h-screen flex flex-col justify-center ">
      <ComingSoon launchDate={launchDate} />;
    </div>
  );
}
