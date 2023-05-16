import React, { useRef, useState, useEffect } from 'react';
import './CSS/TargetStyleTest.css';
import axios from 'axios';


const ImageWeather = (props) => {
  // const svgRef = useRef(null);
  // const id = svgRef.current?.getAttribute('id');
  const svgRef = props.svgRef;

  const [DayMinTemperature, setDayMinTemperature] = useState(0);
  const [TMRMinTemperature, setTMRMinTemperature] = useState(0);
  const [AfterTMRMinTemperature, setAfterTMRMinTemperature] = useState(0);

  const [DayMaxTemperature, setDayMaxTemperature] = useState('');
  const [TMRMaxTemperature, setTMRMaxTemperature] = useState('');
  const [AfterTMRMaxTemperature, setAfterTMRMaxTemperature] = useState('');

  const [DayRain, setDayRain] = useState('');
  const [TMRRain, setTMRRain] = useState('');
  const [AfterTMRRain, setAfterTMRRain] = useState('');


  const [DayWeatherIcon, setDayWeatherIcon] = useState('');
  const [TMRWeatherIcon, setTMRWeatherIcon] = useState('');
  const [AfterTMRWeatherIcon, setAfterTMRWeatherIcon] = useState('');


  const [MyImage, setMyImage] = useState('');


  let PictureData = null;
  let openData = null;
  useEffect(() => {
    axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091', {
      params: {
        Authorization: 'CWB-48477E54-C467-48A6-A65F-01F95D41D98D',
        format: 'JSON',
        sort: 'time'
      }
    })
      .then(function (response) {
        console.log(response.data);
        openData = response.data;
        console.log("JSON載入成功");
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);


  useEffect(() => {
    axios.get('./TaiwanPictrue.json', {

    })
      .then(function (response) {
        console.log(response.data);
        PictureData = response.data;
        console.log("圖片本地JSON載入成功");
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);



  const handleCityEnter = (event) => {
    const id = event.target.getAttribute('id');
    console.log(id);
    if (openData) {
      openData.records.locations[0].location.forEach(function (cityData) {
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

    if(PictureData){
      PictureData.counties.forEach(function(county){
        if(county.city === id){
          setMyImage(county.Picture1);
          console.log(county.Picture1);
          return;
        } 
      })
    }


  };

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


  useEffect(() => {
    const paths = svgRef.current.querySelectorAll('path');
    paths.forEach((path) => {
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
        123
      </div>
      <hr />
      <div className='CityWeather'>
        <p>本日天氣: {DayMinTemperature} °C ~ {DayMaxTemperature} °C</p>
        <p>明天天氣: {TMRMinTemperature} °C ~ {TMRMaxTemperature} °C</p>
        <p>後天天氣: {AfterTMRMinTemperature} °C ~ {AfterTMRMaxTemperature} °C</p>


      </div>


    </div>


  );
};


export default ImageWeather;
