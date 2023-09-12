import CardsSlider from "@/components/CardsSlider";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <div className=" w-[100vw] h-96 flex items-center justify-center">
      <Slider />
      <CardsSlider />
    </div>
  )
}