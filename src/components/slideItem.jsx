import Link from "next/link";

const SlideItem = ({ image, title, description, link }) => {
  return (
    <div className="flex w-full  flex-col justify-center items-center  p-1 md:p-4 rounded-lg min-h-48">
      <div className="  max-h-80  overflow-y-scroll">
        <img
          className="w-full object-cover  rounded-lg"
          src={image}
          alt={title}
          // style={{ maxHeight: "100%" }}
        />
      </div>

      <div className="flex items-center justify-center mt-6 p-1 flex-col gap-2">
        <span className="lg:text-[24px] text-[20px] font-bold w-full text-center tracking-[-1.2px]">
          {title}
        </span>
        <span className="flex text-center w-full justify-center p-1 items-center text-black">
          {description}
        </span>
        <Link target="_blank" href={link}>
          <button className="px-2 py-2 mt-2 rounded-md text-lg font-medium transition-all bg-[#5C2AC8] text-white">
            Learn more
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SlideItem;
