import GoftinoChat from "@/common/GoftinoChat";
import CardsSlider from "@/components/CardsSlider";
import Slider from "@/components/Slider";

export default function Home() {

  return (
    <div className=" w-[100vw] h-[91vh] flex items-start flex-wrap pt-10">
      <GoftinoChat />
      <Slider />
      <div className="w-80 h-full flex items-center justify-around flex-col xl:flex-col md:flex-row md:w-full xl:w-80">
        <CardsSlider />
        <img src="././images/1.jpg" alt="" className="w-[250px] h-52" />
      </div>
    </div>
  )
}
