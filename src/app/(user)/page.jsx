import GoftinoChat from "@/common/GoftinoChat";
import CardsSlider from "@/components/CardsSlider";
import Slider from "@/components/Slider";

export default function Home() {

  return (
    <div className="w-[100vw] h-auto flex items-center justify-center">
    <div className="max-w-screen-2xl w-full h-full flex items-start flex-wrap pt-10">
      <GoftinoChat />
      <Slider />
      <div className="w-full md:h-auto h-full flex md:items-start xl:items-center items-center justify-evenly flex-col xl:flex-col md:flex-row md:w-full xl:w-80">
        <div className="mt-10 xl:mt-0">
          <CardsSlider />
        </div>
        <div className="mt-10 xl:mt-0">
          <img src="././images/1.jpg" alt="" className="w-[250px] h-52" />
        </div>
      </div>
    </div>
    </div>
  )
}
