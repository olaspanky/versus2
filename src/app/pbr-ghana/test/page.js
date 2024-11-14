"use client"
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk';

function App() {
  const dashboardRef = useRef(null);
  const [dashboardId, setDashboardId] = useState('6e24bf7f-e78c-49b9-aa84-c78ba306c783');
  const [dashboardUrl, setDashboardUrl] = useState(null);
  const [embeddingContext, setEmbeddingContext] = useState(null);
  const [isQSession, setIsQSession] = useState(false);
  const [loadingEmbedUrl, setLoadingEmbedUrl] = useState(false);
  const [embeddingCompleted, setEmbeddingCompleted] = useState(false);

  const atc2 = [
    'A12 Mineral supplements',
    'P01 Antiprotozoals',
    'J04 Antimycobacterials',
    'R01 Nasal preparations',
    'L04 Immunosuppressants',
    'C03 Diuretics',
    'B01 Antithrombotic agents',
    'C07 Beta blocking agents',
    'A14 Anabolic agents for systemic use',
    'V06 General nutrients',
    'C10 Lipid modifying agents',
    'G01 Gynaecological antiinfectives and antiseptics',
    'W01 General Herbal'
  ];

  let atc2String = '';
  let atc2_1string = '';
  let atc2_2string = '';
  let atc2_3string = '';
  let atc2_4string = '';
  let atc2_5string = '';
  let atc2_6string = '';
  let atc2_7string = '';

  const chunkSize = Math.ceil(atc2.length / 8);
  const chunk1 = atc2.slice(0, chunkSize);
  const chunk2 = atc2.slice(chunkSize, chunkSize * 2);
  const chunk3 = atc2.slice(chunkSize * 2, chunkSize * 3);
  const chunk4 = atc2.slice(chunkSize * 3, chunkSize * 4);
  const chunk5 = atc2.slice(chunkSize * 4, chunkSize * 5);
  const chunk6 = atc2.slice(chunkSize * 5, chunkSize * 6);
  const chunk7 = atc2.slice(chunkSize * 6, chunkSize * 7);
  const chunk8 = atc2.slice(chunkSize * 7);

  const capitalize = (str) => str.replace(/\b\w/g, char => char.toUpperCase());

  atc2String = capitalize(chunk1.join(','));
  atc2_1string = capitalize(chunk2.join(','));
  atc2_2string = capitalize(chunk3.join(','));
  atc2_3string = capitalize(chunk4.join(','));
  atc2_4string = capitalize(chunk5.join(','));
  atc2_5string = capitalize(chunk6.join(','));
  atc2_6string = capitalize(chunk7.join(','));
  atc2_7string = capitalize(chunk8.join(','));

  if (atc2_7string.length === 0) {
    atc2_7string = atc2String;
    if (atc2_6string.length === 0) {
      atc2_6string = atc2String;
      if (atc2_5string.length === 0) {
        atc2_5string = atc2String;
        if (atc2_4string.length === 0) {
          atc2_4string = atc2String;
          if (atc2_3string.length === 0) {
            atc2_3string = atc2String;
            if (atc2_2string.length === 0) {
              atc2_2string = atc2String;
              if (atc2_1string.length === 0) {
                atc2_1string = atc2String;
              }
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    const fetchEmbedUrl = async () => {
      setLoadingEmbedUrl(true);
      setEmbeddingCompleted(false);
    
      setTimeout(async () => {
        try {
          const response = await fetch(`https://ay4q6icjoobfjphurol7vp2saa0vrihn.lambda-url.eu-central-1.on.aws/?dashboardId=${dashboardId}&atc2=${atc2String}&atc2_1=${atc2_1string}&atc2_2=${atc2_2string}&atc2_3=${atc2_3string}&atc2_4=${atc2_4string}&atc2_5=${atc2_5string}&atc2_6=${atc2_6string}&atc2_7=${atc2_7string}&isQSession=${isQSession}`);
          const result = await response.json();
          
          if (response.ok) {
            setDashboardUrl(result.EmbedUrl);
          } else {
            console.error('Error fetching embed URL:', result.error);
            setDashboardUrl(result.EmbedUrl);
          }
        } catch (error) {
          console.error('Error fetching embed URL:', error);
        } finally {
          setLoadingEmbedUrl(false);
        }
      }, 10);
    };

    if (!loadingEmbedUrl) {
      fetchEmbedUrl();
    }
  }, [dashboardId, isQSession]);

  useEffect(() => {
    const createContext = async () => {
      const context = await createEmbeddingContext();
      setEmbeddingContext(context);
    };

    if (dashboardUrl) {
      createContext();
    }
  }, [dashboardUrl]);

  useEffect(() => {
    const embed = async () => {
      if (!embeddingContext || !dashboardUrl || embeddingCompleted) return;

      const options = {
        url: dashboardUrl,
        container: dashboardRef.current,
        height: "900px",
        width: "1250px",
      };

      if (dashboardRef.current) {
        dashboardRef.current.innerHTML = '';
      }

      if (isQSession) {
        await embeddingContext.embedQSearchBar(options);
      } else {
        await embeddingContext.embedDashboard(options);
      }
      setEmbeddingCompleted(true);
    };

    embed();
  }, [embeddingContext, dashboardUrl, embeddingCompleted, isQSession]);

  const changeDashboard = (e) => {
    setDashboardId(e.target.value);
    setIsQSession(false);
    setDashboardUrl(null);
    setEmbeddingCompleted(false);
  };

  const toggleQSession = () => {
    setIsQSession(!isQSession);
    setDashboardUrl(null);
    setEmbeddingCompleted(false);
  };

  return (
    <>
      <header>
        <h1>Embedded <i>QuickSight</i>: Build Powerful Dashboards and Q Sessions in React</h1>
      </header>
      <main>
        <p>Select between a Dashboard or Q Search session:</p>
        {!isQSession && (
          <select id='dashboard' value={dashboardId} onChange={changeDashboard}>
          <option value="996fd4fe-40f8-4ebf-9abd-08814f988896">Company Brand Dashboard</option>
          <option value="6e24bf7f-e78c-49b9-aa84-c78ba306c783">Company Performance Trend Dashboard</option>
          <option value="ea9b21a7-eaec-4661-b67f-a8f42d9f4444">Company SKU Dashboard</option>
          <option value="5ff8a456-6c4f-468e-b674-1d15ce1516ef">Company Performance Share Dashboard</option>
          <option value="20a45a7e-6463-4441-8c5b-8c9841288a36">Market overview dashboard</option>
          <option value="d6d349c7-27e7-4ea4-8289-b8d4de77b028">Therapy Area Analytics Dashboard</option>
          <option value="a57b497c-0d68-4454-be0f-730f15fb4236">Market Size Model Analytics Dashboard</option>
          <option value="da865c6a-f2e8-4854-947d-8da74ec4abfa">Brand Ranking Dashboard trend</option>
          <option value="70ff0838-a669-4c34-ba38-f3e6c7f8c54d">Brand Ranking Dashboard share</option>
          <option value="8cadbbac-5c8c-4d6b-bdb7-fa957307e9ec">Brand SKU Dashboard trend</option>
          <option value="c577d084-9908-4c63-b126-3fee87c90228">Brand SKU Dashboard share</option>
          <option value="0e83abd1-10d3-41c4-a90d-04db4be0a0c3">Competitive Analytics Dashboard trend</option>
          <option value="79148500-8787-4058-a8dd-8dbe38a9a505">Competitive Analytics Dashboard share</option>
          <option value="8333b71a-4686-4068-bc95-07c3040c212d">Patient Uptake Dashboard</option>
          <option value="d8b59f8c-1e99-49c2-bcbf-609d256ba9a1">Co-prescription Analysis Dashboard</option>
          <option value="88363ae0-2fcc-4970-a139-c4e65b28bb1a">Channel Analytics Dashboard Numeric Selling Distribution (Brand)</option>
          <option value="dafd1978-b195-4010-87ec-7c0c8286f6fc">Channel Analytics Dashboard Weighted Selling Distribution (Brand)</option>
          <option value="9ea6456b-a8a9-47bd-a0d0-14e2e1d51319">Channel Analytics Dashboard Weighted Selling Distribution (SKU)</option>
          <option value="e9000530-8fed-4962-9476-7a6bc1228dca">Channel Analytics Dashboard Numeric Selling Distribution (SKU)</option>
          </select>
        )}
        <button onClick={toggleQSession}>
          {isQSession ? 'Switch to Dashboard' : 'Switch to Q Session'}
        </button>
        <div ref={dashboardRef} />
      </main>
    </>
  );
}

export default App;