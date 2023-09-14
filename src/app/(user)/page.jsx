import GoftinoChat from "@/common/GoftinoChat";
import CardsSlider from "@/components/CardsSlider";
import Slider from "@/components/Slider";

export default function Home() {

  return (
    <div className=" w-[100vw] h-[91vh] flex items-start pt-10">
      <Slider />
      <div className="w-80 h-full flex items-center justify-start flex-col">
        <CardsSlider />
        <GoftinoChat />
      </div>
    </div>
  )
}
