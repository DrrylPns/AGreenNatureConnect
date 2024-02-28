"use client";

interface MenuItemProps {
  onClick?: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="py-3 hover:bg-neutral-100 dark:hover:text-black transition rounded-md px-2"
    >
      {label}
    </div>
  );
};

export default MenuItem;
