import React, { useRef, useState, useEffect } from 'react';
import './CSS/TargetStyleTest.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';


const ImageWeather = (props) => {
console.log(props.openDataa.records.locations[0].location.filter(value=>value.locationName==props.ID)[0].weatherElement[8])
//引用父元件svg  父元件設定:ref{svgRef}
  const svgRef = props.svgRef;
  console.log(svgRef)

//Day本日 TMR明日 AfterTMR後天  
//低溫State
  const [DayMinTemperature, setDayMinTemperature] = useState(props.openDataa.records.locations[0].location.filter(value=>value.locationName==props.ID)[0].weatherElement[8].time[0].elementValue[0].value);
  const [TMRMinTemperature, setTMRMinTemperature] = useState(props.openDataa.records.locations[0].location.filter(value=>value.locationName==props.ID)[0].weatherElement[8].time[2].elementValue[0].value);
  const [AfterTMRMinTemperature, setAfterTMRMinTemperature] = useState(props.openDataa.records.locations[0].location.filter(value=>value.locationName==props.ID)[0].weatherElement[8].time[4].elementValue[0].value);

//高溫State 
  const [DayMaxTemperature, setDayMaxTemperature] = useState('');
  const [TMRMaxTemperature, setTMRMaxTemperature] = useState('');
  const [AfterTMRMaxTemperature, setAfterTMRMaxTemperature] = useState('');

//降雨機率
  const [DayRain, setDayRain] = useState('');
  const [TMRRain, setTMRRain] = useState('');
  const [AfterTMRRain, setAfterTMRRain] = useState('');

//天氣因子icon 
  const [DayWeatherIcon, setDayWeatherIcon] = useState('');
  const [TMRWeatherIcon, setTMRWeatherIcon] = useState('');
  const [AfterTMRWeatherIcon, setAfterTMRWeatherIcon] = useState('');

//城市圖片
  const [MyImage, setMyImage] = useState(props.pictureDataa.counties.filter(value=>value.cityName==props.ID)[0].Picture1);
  console.log(MyImage)
  


//城市名稱
const [TaiwanCityName, setTaiwanCityName] = useState(props.ID);

//-----------------------------
//全域變數
  
  // let PictureData = null;
  let openData = null;

  //-----------------------------
//載入openData

  // useEffect(() => {
  //   axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091', {
  //     params: {
  //       Authorization: 'CWB-48477E54-C467-48A6-A65F-01F95D41D98D',
  //       format: 'JSON',
  //       sort: 'time'
  //     }
  //   })
  //     .then(function (response) {
  //       console.log(response.data);
  //       openData = response.data;
  //       console.log("JSON載入成功");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

//-----------------------------
//載入圖片JSON 
//檔案位置 : public

  // useEffect(() => {
  //   axios.get('./TaiwanPictrue.json')
  //     .then(function (response) {
  //       PictureData = response.data;

  //       console.log(response.data);
        
  //       console.log("圖片本地JSON載入成功");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

//-----------------------------
//滑鼠移入function

  const handleCityEnter = (event) => {
    const id = event.target.getAttribute('id'); // pathEnter Get svg id 
    // console.log(id);
//-----------------------------
//天氣資料
    if (props.openDataa) {
      props.openDataa.records.locations[0].location.forEach(function (cityData) {
        if (cityData.locationName === id) {
          const DayMin = cityData.weatherElement[8].time[0].elementValue[0].value;
          const TMRMin = cityData.weatherElement[8].time[1].elementValue[0].value;
          const AfterTMRMin = cityData.weatherElement[8].time[2].elementValue[0].value;

          const DayMax = cityData.weatherElement[12].time[0].elementValue[0].value;
          const TMRMax = cityData.weatherElement[12].time[1].elementValue[0].value;
          const AfterTMRMax = cityData.weatherElement[12].time[2].elementValue[0].value;

          const DayRain = cityData.weatherElement[0].time[0].elementValue[0].value; //今天降雨機率
          const TMRRain = cityData.weatherElement[0].time[1].elementValue[0].value; //明天降雨機率
          const AfterTMRRain = cityData.weatherElement[0].time[2].elementValue[0].value; //後天降雨機率

          const Dayweather = cityData.weatherElement[6].time[0].elementValue[1].value;//今天天氣因子
          const TMRweather = cityData.weatherElement[6].time[2].elementValue[1].value;//今天天氣因子
          const AfterTMRweather = cityData.weatherElement[6].time[4].elementValue[1].value;//今天天氣因子


          setDayMinTemperature(DayMin);
          setTMRMinTemperature(TMRMin);
          setAfterTMRMinTemperature(AfterTMRMin);

          setDayMaxTemperature(DayMax);
          setTMRMaxTemperature(TMRMax);
          setAfterTMRMaxTemperature(AfterTMRMax);

          setDayRain(DayRain);
          setTMRRain(TMRRain);
          setAfterTMRRain(AfterTMRRain);

          setDayWeatherIcon(Dayweather);
          setTMRWeatherIcon(TMRweather);
          setAfterTMRWeatherIcon(AfterTMRweather);


          return;
        }
      });
    }
//-----------------------------
//圖片資料
    if (props.pictureDataa) {
      props.pictureDataa.counties.forEach(function(county){
        // console.log(county.cityName);
        if(county.cityName === id){
          setMyImage(county.Picture1);
          setTaiwanCityName(county.cityName);
          console.log(county.Picture1);
          return;
        } 
      });
    }


  };


//-----------------------------
//滑鼠離開
  const handleCityLeave = () => {
    setDayMinTemperature('');
    setTMRMinTemperature('');
    setAfterTMRMinTemperature('');

    setDayMaxTemperature('');
    setTMRMaxTemperature('');
    setAfterTMRMaxTemperature('');

    setDayRain('');
    setTMRRain('');
    setAfterTMRRain('');

    setDayWeatherIcon('');
    setTMRWeatherIcon('');
    setAfterTMRWeatherIcon('');


    setMyImage('');

  };
  function handleCityClick(e){
console.log(e.target.dataset.city)
sessionStorage.setItem('city',e.target.dataset.city)
  }

//-----------------------------
//遍歷path加入監聽事件
  useEffect(() => {
    const paths = svgRef.current.querySelectorAll('path');

    paths.forEach((path) => {
      const city = path.getAttribute('id');
      path.setAttribute('data-city', city);
      path.addEventListener('click',handleCityClick);
      path.addEventListener('mouseenter', handleCityEnter);
      path.addEventListener('mouseleave', handleCityLeave);
    });

    return () => {
      paths.forEach((path) => {
        path.removeEventListener('mouseenter', handleCityEnter);
        path.removeEventListener('mouseleave', handleCityLeave);
      });
    };


  }, []);

  
  return (

    <div>
      <div className='CityImage'>

        <div className='CityImageName'>{TaiwanCityName}</div>
        <img src={MyImage} alt="" />
        <hr />

      </div>
     
      <div className='CityWeather'>
      

        <p>今天&nbsp;&nbsp;&nbsp;&nbsp;{DayMinTemperature}      °C ~ {DayMaxTemperature}      °C &nbsp;&nbsp; <FontAwesomeIcon icon={faCloudRain} /> {DayRain}%</p>
        <p>明天&nbsp;&nbsp;&nbsp;&nbsp;{TMRMinTemperature}      °C ~ {TMRMaxTemperature}      °C &nbsp;&nbsp; {TMRRain}%</p>
        <p>後天&nbsp;&nbsp;&nbsp;&nbsp;{AfterTMRMinTemperature} °C ~ {AfterTMRMaxTemperature} °C &nbsp;&nbsp; {AfterTMRRain}%</p>


      </div>


    </div>


  );
};


export default ImageWeather;
