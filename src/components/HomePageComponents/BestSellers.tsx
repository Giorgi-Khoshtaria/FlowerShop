import Flowers from "../SemiComponents/Flowers";
import best1 from "/assets/best1.png";
import best2 from "/assets/best2.png";
import best3 from "/assets/best3.png";
import best4 from "/assets/best4.png";

function BestSellers() {
  return (
    <div className="mt-[116px] w-full">
      <div className="flex items-center justify-center gap-[19px]  max-sm:gap-3">
        <div className="h-[2px] w-[165px] bg-semiGray max-sm:w-10"></div>
        <h2 className=" text-black text-[32px] not-italic font-normal leading-[normal]  ">
          Best selers
        </h2>
        <div className="h-[2px] w-[165px] bg-semiGray  max-sm:w-10"> </div>
      </div>
      <div className="flex items-center justify-between  flex-wrap mt-[33px] gap-5 max-xl:justify-center">
        <Flowers img={best1} name="Daisy" price={5} />
        <Flowers img={best2} name="Sun flower" price={5} />
        <Flowers img={best3} name="White Rose" price={5} />
        <Flowers img={best4} name="Periwinkle" price={5} />
      </div>
    </div>
  );
}

export default BestSellers;
