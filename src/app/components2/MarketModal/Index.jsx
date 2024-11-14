import { useEffect, useRef, useState } from 'react';
import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk';
import Loading from '../Loading';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';import Home from '../Homepage';
import Transactions from "../Transctions"


function App() {
  const dashboardRef = useRef([]);
  const [dashboardId, setDashboardId] = useState('YOUR_DASHBOARD1_ID');
  const [embeddedDashboard, setEmbeddedDashboard] = useState(null);
  const [dashboardUrl, setDashboardUrl] = useState(null);
const [embeddingContext, setEmbeddingContext] = useState(null);
   const [loading, setLoading] = useState(true);  
  const atc2 = [
  'A10 Drugs used in diabetes',
  'J05 Antivirals for systemic use',   'C02 Antihypertensives', 'A10 Drugs used in diabetes', 'L01 Anti-neoplastic agents', 'C01 Cardiac therapy']

  

  const atc2String = atc2.join(',');
  const [showDashboard, setShowDashboard] = useState(false); // Toggle visibility

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch(`https://ar2qhujbfgipevxg67pxzajoei0rrivg.lambda-url.eu-central-1.on.aws/?dashboardId=${'a57b497c-0d68-4454-be0f-730f15fb4236'}&atc2=${atc2String}`
      ).then((response) => response.json()
      ).then((response) => {
 setDashboardUrl(response.EmbedUrl)
        setLoading(false)      })
    }, 10);
    return () => clearTimeout(timeout);
  }, []);

  const createContext = async () => {
    const context = await createEmbeddingContext();
    setEmbeddingContext(context);
  }

  useEffect(() => {
    if (dashboardUrl) { createContext() }
  }, [dashboardUrl])

  useEffect(() => {
    if (embeddingContext) { embed(); }
  }, [embeddingContext])

  const embed = async () => {

    const options = {
      url: dashboardUrl,
      container: dashboardRef.current,
     
    };

    const newEmbeddedDashboard = await embeddingContext.embedDashboard(options);
    setEmbeddedDashboard(newEmbeddedDashboard);
  };

  useEffect(() => {
    if (embeddedDashboard) {
      embeddedDashboard.navigateToDashboard(dashboardId, {})
    }
  }, [dashboardId])

 
  const changeDashboard = async (e) => {
    const selectedDashboardId = e.target.value;
    setDashboardId(selectedDashboardId);

    // Toggle the visibility based on the selected option
    setShowDashboard(selectedDashboardId === "a57b497c-0d68-4454-be0f-730f15fb4236");
  }

  return (
    <>
      <main className=''>
      <div className='flex flex-col md:flex-row gap-5 justify-between items-center my-5'>
    <div className=''><h1 className='text-4xl font-extrabold '>Therapy Area Analytic - Market Size Modal Dashboard</h1></div>
    <div className='bg-white flex flex-col p-2 px-2 gap-2 font-semibold rounded-md border border-gray-50 shadow-md'>
          </div>
</div>
       

        {/* Toggle the visibility based on the showDashboard state */}
        { loading ? <Loading /> : <></> }
        <div className={`h-[2000px] `} ref={dashboardRef} />

      
      </main>
    </>
  );
}

export default App;
