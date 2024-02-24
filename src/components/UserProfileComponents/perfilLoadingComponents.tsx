
export const ListLoader = () => {


  const items = [1, 2, 3, 4, 5, 6]

  return (

    <div className=" w-full h-[90%] rounded-lg flex flex-col gap-2 lg:mt-8">
      {items.map((index) => {
        return (
          <div key={index} className="pulsation  w-full min-h-[40px] max-h-[80px] bg-neutral-200  mx-auto  px-1 py-1  rounded-md flex items-center justify-center hover:scale-105 transition-all cursor-pointer text-sm flex-col overflow-hidden" >
            <p className="text-center font-bold lg:text-lg"></p>
          </div>
        )
      })}
    </div>

  )
}

export const TableLoader = () => {

  const items = [1, 2, 3, 4, 5, 6]

  return (
    <div className="w-1/2 mx-auto h-full">
      {items.map((index) => {
        return (
          <div key={index} className="pulsation  w-full h-[40px]" >
            <p className="text-center font-bold lg:text-lg"></p>
          </div>
        )
      })}
  </div>
  )
}

