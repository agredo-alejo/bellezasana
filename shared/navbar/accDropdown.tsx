import React, { useRef } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { useNav } from "@/context/navContext";
import { useClickOutside } from "@/utils/useClickOutside";

const dropdownItems = [
   {
      text: "Cuenta",
      icon: <AccountCircleIcon />,
      link: "/perfil",
   },
   {
      text: "Cerrar Sesion",
      icon: <LogoutIcon />,
      link: "/auth/logout",
   },
];

function AccDropdown() {
   const { setShowDropdown, accIconRef } = useNav();

   const dropRef = useRef<HTMLDivElement>(null);

   const closeDropdown = () => setShowDropdown(false);

   useClickOutside([dropRef, accIconRef], closeDropdown);
   return (
      <div
         ref={dropRef}
         className="absolute right-2 bottom-[-5rem] bg-white rounded-sm drop-shadow z-50"
      >
         <ul>
            {dropdownItems.map((item) => (
               <li
                  key={item.text}
                  onClick={closeDropdown}
                  className="flex items-center hover:bg-[#f5f5f5] px-2"
               >
                  <span className="text-gray-700">{item.icon}</span>
                  <Link className="p-2" href={item.link}>
                     {item.text}
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   );
}

export default AccDropdown;
