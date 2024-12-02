'use client'
import { useState, useEffect } from "react";
import SliderView from "./SliderView";
import AccessoriesView from "./AccessoriesView";
import TrendingProductsView from "./TrendingProductsView";
import SmartKrushiPackagesView from "./SmartKrushiPackagesView";
import LimitedTimeSaleView from "./LimitedTimeSaleView";
import TrendingCropsView from "./TrendingCropsView";
import Header from "@/components/custom/Header";
import WeatherView from "@/components/custom/Weatherview";
import FooterTabs from "@/components/custom/Footer";
import Sidebar from "@/components/custom/Sidebar";
import { useStore, useUserStore } from "../../../../globalstate";
import { getUserInfo } from "@/services/login";



const HomesPage = (props: any) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [fullview, setfullview] = useState<boolean>(false);
  const [bannerData, setBannerData] = useState(null);
  const [productData, setproductData] = useState(null);
  const [cropData, setcropData] = useState(null);
  const [subscriptionData, setsubscriptionData] = useState(null);
  const [limitedTimeSale, setlimitedTimeSale] = useState(null);
  const [categoryData, setcategoryData] = useState(null);
  const { mobileNumber, otpNum } = useStore();
  const { setLoginUserInfo } = useUserStore();
  const [weatherFullView, setWeatherFullView] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo(mobileNumber, otpNum);
      setLoginUserInfo(data);
    };

    fetchData();
  }, [mobileNumber, otpNum]);

  useEffect(() => {
    let homeData = props?.homeData;
    setBannerData(homeData?.bannerData);
    setproductData(homeData?.productData);
    setsubscriptionData(homeData?.subscriptionData);
    setcropData(homeData?.cropData);
    setlimitedTimeSale(homeData?.limitedTimeSale);
    setcategoryData(homeData?.categoryData);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="relative min-h-screen">
      {!fullview && <Header toggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} />}
  
      {!weatherFullView && !searchActive && (
        <div className="bg-white">
          <WeatherView onWeatherClick={() => setWeatherFullView(true)} />
          {bannerData && !fullview && <SliderView bannerData={bannerData} />}
          {categoryData && !fullview && <AccessoriesView categoryData={categoryData} />}
          {productData && !fullview && <TrendingProductsView productData={productData} />}
          {subscriptionData && !fullview && <SmartKrushiPackagesView subscriptionData={subscriptionData} />}
          {limitedTimeSale && !fullview && <LimitedTimeSaleView limitedTimeSale={limitedTimeSale} />}
          {cropData && !fullview && <TrendingCropsView cropData={cropData} />}
        </div>
      )}
  
      {weatherFullView && <WeatherView fullView />}
  
      {!fullview && !weatherFullView && <FooterTabs />}
  
      <Sidebar isOpen={sidebarVisible} onClose={toggleSidebar} />
    </div>
  );  
};

export default HomesPage;
