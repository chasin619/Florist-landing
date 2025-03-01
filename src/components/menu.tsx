import React from "react";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface SidebarMenuProps {
    items: any[];
    active: string;
    setActive: (id: string) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ items, active, setActive }) => {
    return (
        <ul className="md:min-w-48 flex-2 md:h-[450px] mt-6 hidden md:flex flex-wrap flex-row md:flex-col gap-6">
            {items.map((item) => (
                <li
                    key={item.id}
                    onClick={() => setActive(item.title)}
                    className={`relative max-w-52 p-1  border-blue-100 rounded-lg cursor-pointer transition-all duration-300 
                        border border-transparent 
                        ${active === item.title ? "text-blue-500 shadow-lg border-blue-500" : "border-gray-300"} 
                        hover:scale-105 hover:shadow-xl hover:border-blue-500 hover:text-blue-500`}
                >
                    <div className="flex items-start gap-4">

                        {item.icon && <item.icon />}
                        <div>
                            {item.title}
                            <span className="text-gray-500 text-sm block">{item.shortDescription}</span>
                        </div>
                    </div>


                </li>
            ))}
        </ul>
    );
};

export default SidebarMenu;
