import React from 'react';
import { Carousel } from 'primereact/carousel';
import { MdInbox } from 'react-icons/md';
import Image from 'next/image';

interface BannerData {
  id: number;
  name: string;
  image: string;
}

interface SliderViewProps {
  bannerData: BannerData[];
}

const SliderView = ({ bannerData }: SliderViewProps) => {
  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '600px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const bannerTemplate = (item: BannerData) => {
    const iconData = JSON.parse(item.image);
    const imagePath = `${process.env.NEXT_PUBLIC_API_URL}/ImportFiles/${iconData[0].filePath.replace(/\\/g, '/')}`;

    return (
      <div className="flex justify-center items-center w-full h-auto overflow-hidden">
        <div key={item.id} className="relative w-full h-[90vh]">
          {item?.image ? (
            <Image
              src={imagePath}
              alt={item.name}
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <MdInbox className="text-red-500" size={30} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full overflow-hidden">
      <section className="w-full p-0 mt-5 m-0">
        <Carousel
          value={bannerData}
          numVisible={1}
          numScroll={1}
          autoplayInterval={2500}
          circular
          responsiveOptions={responsiveOptions}
          itemTemplate={bannerTemplate}
          className="w-full"
          contentClassName="w-full p-0 m-0"
        />
      </section>
    </div>
  );
};

export default SliderView;
