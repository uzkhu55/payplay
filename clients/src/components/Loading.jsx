// "use client";
// import React, { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Loadingdaisy } from "./Loadingdaisy";
// import { BiLogoNetlify } from "react-icons/bi";

// export const Loading = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       router.push("/confirm");
//     }, 1500);
//     return () => clearTimeout(timer);
//   }, [router]);

//   return (
//     <div className="flex flex-col w-full h-full z-10 items-center gap-4">
//       <div className="text-4xl flex items-center gap-4 font-bold">
//         <BiLogoNetlify className="w-[60px]  h-[60px] text-blue-500" />
//         Geld
//       </div>
//       <Loadingdaisy />
//       <div>Түр хүлээнэ үү...</div>
//     </div>
//   );
// };
