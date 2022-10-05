import { useEffect, useState, createContext } from "react";


export const Context = createContext()

export const ContextProvider = (props) => {
  
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

  const addStock = (stock) => {
    if(watchList.indexOf(stock) === -1){
      setWatchList([...watchList, stock])
    }
  }

  const removeStock = (stock) => {
    setWatchList(watchList.filter((stock) => {
      return el !== stock
    }))
  }

  return (
    <Context.Provider value={{watchList, addStock, removeStock}}>
      {props.children}
    </Context.Provider>
  )
}