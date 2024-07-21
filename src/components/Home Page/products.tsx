import "swiper/css";

import { data } from "@/dummy/data";

import Slider from "@/components/ui/SwiperCarousel";

export default function Products() {
    return (
        <section className="mb-40 flex flex-col items-center justify-center gap-5 px-10 sm:px-20 lg:px-40">
            <div className="flex w-full flex-col gap-5">
                <h1 className="w-full text-left text-4xl font-bold">
                    Top Picks
                </h1>
                <Slider data={data} />
            </div>
            <div className="flex w-full flex-col gap-5">
                <h1 className="w-full text-left text-4xl font-bold">
                    New Releases
                </h1>
                <Slider data={data} />
            </div>
        </section>
    );
}
