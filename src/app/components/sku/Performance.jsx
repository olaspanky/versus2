import Image from 'next/image'
import { useState } from 'react';
import Search from "./Search"
import Drop from "../Dropdown"
import Box from "./Box"
import Chart from './Groupchart';
import Barchart from './Barchart';
import Grid from "./Grid"
import filter from "../../../../public/assets/filter.svg"
import right from "../../../../public/assets/arrow-right.svg"
import left from "../../../../public/assets/arrow-left.svg"
import coin from "../../../../public/assets/coin.svg"
import lexport from "../../../../public/assets/export.svg"
import Line from "./Line"



export default function Home() {

    
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isTrendActive, setIsTrendActive] = useState(true);

  const handleTrendClick = () => {
    setIsTrendActive(true);
  };

  const handleShareClick = () => {
    setIsTrendActive(false);
  };

    const pharmacyOptions = ['Option 1', 'Option 2', 'Option 3'];

  const atcLevelOptions = ['Option A', 'Option B', 'Option C'];


  const initialDropdowns = [
    { name: 'Company', options: ['Option 1', 'Option 2', 'Option 3'], isOpen: false },
    { name: 'ATC 1', options: ['Option A', 'Option B', 'Option C'], isOpen: false },
    { name: 'ATC 2', options: ['Option A', 'Option B', 'Option C'], isOpen: false },
    { name: 'ATC 3', options: ['Option A', 'Option B', 'Option C'], isOpen: false },
    { name: 'ATC 4', options: ['Option A', 'Option B', 'Option C'], isOpen: false },
    { name: 'ATC 5', options: ['Option A', 'Option B', 'Option C'], isOpen: false },
    { name: 'Period', options: ['Option A', 'Option B', 'Option C'], isOpen: false },
    { name: 'Location', options: ['Option A', 'Option B', 'Option C'], isOpen: false },
    // Add more objects for additional dropdowns
  ];

  const [dropdowns, setDropdowns] = useState(initialDropdowns);

  const toggleDropdown = (index) => {
    const updatedDropdowns = dropdowns.map((dropdown, i) =>
      i === index ? { ...dropdown, isOpen: !dropdown.isOpen } : { ...dropdown, isOpen: false }
    );
    setDropdowns(updatedDropdowns);
  };

  const handleOptionChange = (index, option) => {
    const updatedDropdowns = dropdowns.map((dropdown, i) => {
      if (i === index) {
        let newSelectedOptions = [...dropdown.selectedOptions];

        if (newSelectedOptions.includes(option)) {
          newSelectedOptions = newSelectedOptions.filter((selected) => selected !== option);
        } else if (newSelectedOptions.length < 3) {
          newSelectedOptions.push(option);
        }

        return { ...dropdown, selectedOptions: newSelectedOptions };
      }
      return dropdown;
    });

    setDropdowns(updatedDropdowns);
  };


  const chartdata2 = [
    {
      name: "2019",
      "Fidson": 890,
      "M&B": 338,
      "Emzor": 538,
      
    },
    {
      name: "2020",
      "Fidson": 289,
      "M&B": 233,
      "Emzor": 253,
      
    },
    {
      name: "2021",
      "Fidson": 380,
      "M&B": 535,
      "Emzor": 352,
      
    },
    {
      name: "2022",
      "Fidson": 90,
      "M&B": 98,
      "Emzor": 28,
     
    },
    {
      name: "2023",
      "Fidson": 89,
      "M&B": 128,
      "Emzor": 90,
     
    },
  ];
  
  const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

  const columns = [
    {
      field: 'name',
      headerName: 'Company Name',
      width: 150,
      flex: 1
      
    },
    {
      field: 'value',
      headerName: 'Value Share',
      width: 150,
      flex: 1
  
    },
    {
      field: 'value_percent',
      headerName: '% Value Share',
      type: 'number',
      width: 110,
      editable: true,
      flex: 1
  
    },
    {
      field: 'change',
      headerName: '% Change',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
        flex: 1
  
    },
    {
      field: 'view',
      headerName: 'view',
      width: 50,
      sortable: false,
      flex: 1,
  
      renderCell: (params) => {
        return (
          <input
            type="checkbox"
            checked={params.row.id} // Adjust this based on your selection criteria
            readOnly
          />
        );
      },
    },
  ];
  
  const rows = [
    { id: 1, name: 'Fidson', value: '12.000', value_percent: "3.25%", change: "+3.56" },
    { id: 2, name: 'Emzor', value: '12.000', value_percent: "3.25%", change: "+3.56" },
    { id: 3, name: 'RB', value: '12.000', value_percent: "3.25%", change: "+3.56" },
    { id: 4, name: 'M & B', value: '12.000', value_percent: "3.25%", change: "+3.56" },
    { id: 5, name: 'Pfizer', value: '12.000', value_percent: "3.25%", change: "+3.56" },
    
  ];
  const columns2 = [
    {
      field: 'name',
      headerName: 'Company Name',
      width: 150,
      flex: 1
      
    },
    {
      field: 'value',
      headerName: 'Value Share',
      width: 150,
      flex: 1
  
    },
    {
      field: 'value_percent',
      headerName: '% Value Share',
      type: 'number',
      width: 110,
      editable: true,
      flex: 1
  
    },
    {
      field: 'change',
      headerName: '% Change',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
        flex: 1
  
    },
    {
      field: 'view',
      headerName: 'view',
      width: 50,
      sortable: false,
      flex: 1,
  
      renderCell: (params) => {
        return (
          <input
            type="checkbox"
            checked={params.row.id} // Adjust this based on your selection criteria
            readOnly
          />
        );
      },
    },
  ];
  
  const rows2 = [
    { id: 1, name: 'Fidson', value: '12.000', value_percent: "3.25%", change: "+3.56" },
    { id: 2, name: 'Emzor', value: '12.000', value_percent: "3.25%", change: "+3.56" },
    { id: 3, name: 'RB', value: '12.000', value_percent: "3.25%", change: "+3.56" },
    { id: 4, name: 'M & B', value: '12.000', value_percent: "3.25%", change: "+3.56" },
    { id: 5, name: 'Pfizer', value: '12.000', value_percent: "3.25%", change: "+3.56" },
    
  ];

  const chartdata3 = [
    {
      date: "Jan",
      "%SVS1": 167,
      "%SVS2": 145,
      
    },
    {
      date: "Feb ",
      "%SVS1": 125,
      "%SVS2": 110,
     
    },
    {
      date: "Mar ",
      "%SVS1": 156,
      "%SVS2": 149,
      
    },
    {
      date: "Apr",
      "%SVS1": 165,
      "%SVS2": 112,
      
    },
    {
      date: "May",
      "%SVS1": 153,
      "%SVS2": 138,
      
    },
    {
      date: "Jun ",
      "%SVS1": 56,
      "%SVS2": 87,
     
    },
    {
      date: "Jul ",
      "%SVS1": 150,
      "%SVS2": 146,
      
    },
    {
      date: "Aug ",
      "%SVS1": 130,
      "%SVS2": 69,
     
    },
    {
      date: "Sept ",
      "%SVS1": 98,
      "%SVS2": 32,
      
    },
    {
      date: "Oct ",
      "%SVS1": 200,
      "%SVS2": 60,
      
    },
    {
      date: "Nov ",
      "%SVS1": 100,
      "%SVS2": 45,
      
    },
    {
      date: "Dec ",
      "%SVS1": 36,
      "%SVS2": 17,
      
    },
  ];

 

  return (
    <main className=" bg-gray-100 flex h-full w-full flex-col gap-9  ">

       

        <div className='flex justify-between items-center my-5'>
            <div className=''><h1 className='text-4xl font-extrabold '>Company SKU Dashboard - GSK</h1></div>
            <div className='bg-white flex flex-col p-2 px-2 gap-2 font-semibold  rounded-md'>
                <h1 className='text-3xl text-gray-500'>132,564 </h1>
                <p className='text-black'>n=Total patient encountered</p>
            </div>
        </div>


       
<div>
        
        <div className='flex gap-5 my-5'>
        {dropdowns.map((dropdown, index) => (
        <Drop
        key={index}
        name={dropdown.name}
        options={dropdown.options}
        isOpen={dropdown.isOpen}
        toggleDropdown={() => toggleDropdown(index)}
        handleOptionChange={(option) => handleOptionChange(index, option)}
        selectedOption={dropdown.selectedOption}
        />
      ))}
        </div>

        <div className='bg-gray-50 p-3  rounded-md my-5'>
            <div className='flex justify-between items-center'>
                <div><h1 className='text-md font-semibold'>Sales Value</h1></div>
                <div className='py-3 px-5 bg-white border flex gap-3 border-gray-100 rounded-md'><h1>Export chart</h1><Image alt="alt" src={lexport}/></div>
            </div>

            <div className='m-5 font-bold flex justify-between border border-black rounded-xl p-6'>
                <div className='flex flex-col gap-2 justify-center items-center'><h1 className='text-2xl text-[#1973AF]'>Highest Ranked</h1>
                <p className='text-xl'>Fidson</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'><h1 className='text-2xl text-[#1973AF]'>Highest Ranked</h1>
                <p className='text-xl'>Fidson</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'><h1 className='text-2xl text-[#1973AF]'>Highest Ranked</h1>
                <p className='text-xl'>Fidson</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'><h1 className='text-2xl text-[#1973AF]'>Highest Ranked</h1>
                <p className='text-xl'>Fidson</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'><h1 className='text-2xl text-[#1973AF]'>Highest Ranked</h1>
                <p className='text-xl'>Fidson</p>
                </div>
            </div>


            <div className='grid grid-cols-12 w-full my-9'>
          <div className='col-span-6 flex flex-col' >
            <div>
            <Chart
              chartData={chartdata2}
              indexKey="name"
              categoryLabels={["Fidson", "M&B", "Emzor"]}
              colorPalette={["#AF6419", "#109494", "#1E8F24"]}
              valueFormatterFn={valueFormatter}
              yAxisWidth={0}
              showXAxis={false} // Hide X axis
              showYAxis={false} // Hide Y axis
              showGridLines={false} // Control visibility of gridlines

            />
            </div>
           
             <div className='flex justify-center gap-2 my-3'>
              <div className='p-3 rounded-md border border-primary '>
              <Image alt="alt" src={left}/>
              </div>
              <div className='p-3 rounded-md px-6 bg-primary flex gap-3 items-center'>
                <p className='text-[#FFFFFF]'>Next</p>
              <Image alt="alt" src={right}/>

              </div>

            </div>
          </div>
          <div className='col-span-6 z-20'>
            <div className='flex flex-col gap-2'>
              <div className='w-[50%] flex gap-2'>
              <Search/>
              <div className='border border-gray-300 rounded-md p-3 bg-white'><Image alt="alt" src={filter}/></div>
              </div>
            
            <Grid rows={rows} columns={columns}/>

            </div>
          </div>
        </div>




        </div>


              {/* chart container */}
        <div className='bg-gray-50 p-3  rounded-md my-5'>
            <div className='flex justify-between items-center'>
                <div><h1 className='text-md font-semibold'>Sales Volume</h1></div>
                <div className='py-3 px-5 bg-white border flex gap-3 border-gray-100 rounded-md '><h1>Export chart</h1><Image alt="alt" src={lexport}/>
</div>
            </div>

            <div className='m-5 font-bold flex justify-between border border-black rounded-xl p-6'>
                <div className='flex flex-col gap-2 justify-center items-center'><h1 className='text-2xl text-[#1973AF]'>Highest Ranked</h1>
                <p className='text-xl'>Fidson</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'><h1 className='text-2xl text-[#1973AF]'>Highest Ranked</h1>
                <p className='text-xl'>Fidson</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'><h1 className='text-2xl text-[#1973AF]'>Highest Ranked</h1>
                <p className='text-xl'>Fidson</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'><h1 className='text-2xl text-[#1973AF]'>Highest Ranked</h1>
                <p className='text-xl'>Fidson</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'><h1 className='text-2xl text-[#1973AF]'>Highest Ranked</h1>
                <p className='text-xl'>Fidson</p>
                </div>
            </div>


            <div className='grid grid-cols-12 w-full my-9'>
          <div className='col-span-6 flex flex-col' >
            <div>
            <Chart
              chartData={chartdata2}
              indexKey="name"
              categoryLabels={["Fidson", "M&B", "Emzor"]}
              colorPalette={["#9709AE", "#102494", "#944210"]}
              valueFormatterFn={valueFormatter}
              yAxisWidth={0}
              showXAxis={false} // Hide X axis
              showYAxis={false} // Hide Y axis
              showGridLines={false} // Control visibility of gridlines

            />

            </div>
            <div className='flex justify-center gap-2 my-3'>
              <div className='p-3 rounded-md border border-prmary '>
              <Image alt="alt" src={left}/>
              </div>
              <div className='p-3 rounded-md px-6 bg-primary flex gap-3 items-center'>
                <p className='text-[#FFFFFF]'>Next</p>
              <Image alt="alt" src={right}/>

              </div>

            </div>
            
          </div>
          <div className='col-span-6'>
            <div className='flex flex-col gap-2'>
              <div className='w-[50%] flex gap-2'>
              <Search/>
              <div className='border border-gray-300 rounded-md p-3 bg-white'><Image alt="alt" src={filter}/></div>
              </div>
            
            <Grid rows={rows2} columns={columns2}/>

            </div>
          </div>
        </div>




        </div>
        {/* end of chart container */}

            {/* line chart container */}
        <div className='grid grid-cols-2   gap-9 rounded-md my-5'>
        <div className=' col-span-1 bg-white p-3 rounded-lg flex flex-col gap-2'>
        <div className='flex justify-between items-center'>
                <div><h1 className='text-md font-semibold'>% Sales value trend </h1></div>
                <div className='py-3 px-5 bg-white border flex gap-3 border-gray-100 rounded-md'><h1>Export chart</h1><Image alt="alt" src={lexport}/></div>
            </div>
            <div>
            <Line
        data={chartdata3}
        index="date"
        categories={[      "%SVS1", "%SVS2"]}
        colors={["indigo-300", "rose-200", "#ffcc33"]}
        yAxisWidth={30}
        showGridLines={false} 

      />

            </div>
     
    </div>
        <div className='col-span-1 bg-white p-3 rounded-lg flex flex-col gap-2'>
        <div className='flex justify-between items-center'>
                <div><h1 className='text-md font-semibold'>% Sales Volume trend </h1></div>
                <div className='py-3 px-5 bg-white border flex gap-3 border-gray-100 rounded-md'><h1>Export chart</h1><Image alt="alt" src={lexport}/></div>
            </div>
            <div>
            <Line
        data={chartdata3}
        index="date"
        categories={[      "%SVS1", "%SVS2"]}
        colors={["indigo-300", "rose-200", ]}
        yAxisWidth={30}
        showGridLines={false} // Control visibility of gridlines

      />
            </div>
      
    </div>
        </div>

        {/* end of line chart container */}

        {/* pie chart container */}

        

        </div>

       
    </main>
  )
}
