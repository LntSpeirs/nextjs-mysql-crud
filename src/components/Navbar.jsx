import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <Link href={"/products"}>Productos</Link>
        <Link href={"/new"}>Nuevo</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
