import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-zinc-900 text-white font-bold">
      <div className="container mx-auto flex justify-between items-center py-3 mb-2">
        <Link href={"/products"} className="text-sky-500 hover:text-white">
          <h3 className="text-white text-3xl">NextMySQL</h3>
        </Link>
        <ul className="flex gap-5">
          <Link href={"/new"} className="text-sky-500 hover:text-white">
            Nuevo
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
