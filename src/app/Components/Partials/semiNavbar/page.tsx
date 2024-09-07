import { TiArrowLeft } from "react-icons/ti";
import Link from "next/link";

const Navbar = () => {
  return (

    <div className="bg-[#181f4a] flex justify-end items-end p-5 text-white">
      <Link href={"/"}>
        <button className="bg-purple-600 flex justify-center items-center nav-btns py-2 px-6 rounded-md text-white">
          <TiArrowLeft className="pr-1 text-xl" />
          Back
        </button>
      </Link>
    </div>
    
  );
};

export default Navbar;
