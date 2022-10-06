import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import finnHub from "../apis/finnHub"
import { StockChart } from "../components/StockChart"

const formatData = (data) => {
  return data.t.map((el, index) => {
    return {
      x: el*1000,
      y: Math.floor(data.c[index])
    }
  })
}

export const StockDetailPage = () => {

  const {symbol} = useParams()
  const [chartData, setChartData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      const oneWeek = currentTime - 60*60*24*7;
      const oneYear = currentTime - 60*60*24*365;

      let oneDay;

      // weekends
      if(date.getDay() === 6){
        oneDay = currentTime - 60*60*24*2;
      }else if (date.getDay() === 0){
        oneDay = currentTime - 60*60*24*3;
      }else{
        oneDay = currentTime - 60*60*24;
      }

      try {
        const responses = await Promise.all([finnHub.get(`/stock/candle`, {
          params: {
            symbol,
            from: oneDay,
            to: currentTime,
            resolution: 30,
          }
        }), finnHub.get(`/stock/candle`, {
          params: {
            symbol,
            from: oneWeek,
            to: currentTime,
            resolution: 60,
          }
        }),finnHub.get(`/stock/candle`, {
          params: {
            symbol,
            from: oneYear,
            to: currentTime,
            resolution: "W",
          }
        })])

        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data)
        })

      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [symbol])

  return (
    <div>
      {chartData && (
        <div>
          <StockChart chartData={chartData} symbol={symbol}/>
        </div>
      )}
    </div>
  );
}