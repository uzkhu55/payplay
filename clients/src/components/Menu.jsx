import Link from "next/link"; // Adjust based on your routing setup

export const Menu = () => {
  const menuItems = [
    { label: "PAYPLAY STORE", path: "/comingsoon" },
    { label: "Update version", path: "/comingsoon" },
    { label: "Quiz play version 1.0", path: "/task" },
    { label: "Magic play version 1", path: "/magicword" },
    { label: "Leaderboard", path: "/leaderboard" },
    { label: "Coming Soon", path: "/comingsoon" },
    { label: "Coming Soon", path: "/comingsoon" },
    { label: "Coming Soon", path: "/comingsoon" },
    { label: "Coming Soon", path: "/comingsoon" },
  ];

  return (
    <div className="mx-[120px] flex-wrap justify-center text-center flex">
      {menuItems.map((item) => (
        <Link key={item.path} className="w-[320px]" href={item.path}>
          <button className="my-2 w-[200px] h-[170px] bg-black hover:bg-gradient-to-r from-orange-400 to-purple-600 border-2  border-red-400  text-white rounded">
            {item.label}
          </button>
        </Link>
      ))}
    </div>
  );
};
