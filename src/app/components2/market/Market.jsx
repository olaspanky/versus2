import { useEffect, useState } from "react";
import { createEmbeddingContext } from "amazon-quicksight-embedding-sdk";
import Loading from "../Loading";
import { selectUserData } from "../../store/slice/userdataslice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function App() {
  const [dashboardId, setDashboardId] = useState(
    "1df35875-6f15-47cc-952d-1b075fd57875"
  );
  const [dashboardUrl, setDashboardUrl] = useState(null);
  const [embeddingContext, setEmbeddingContext] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();
  const subscription = session?.user?.subscription;

  useEffect(() => {
     const atc2 = subscription;
        // Use atc2 here

        const capitalize = (str) => {
          return str.replace(/\b\w/g, char => char.toUpperCase());
        };    console.log(atc2); // This will output the array

    if (atc2) {
      let atc2String = "";
      let atc2_1string = "";
      let atc2_2string = "";
      let atc2_3string = "";
      let atc2_4string = "";
      let atc2_5string = "";
      let atc2_6string = "";
      let atc2_7string = "";

      // Calculate chunk size
      const chunkSize = Math.ceil(atc2.length / 8);

      // Split the array into five chunks
      const chunk1 = atc2.slice(0, chunkSize);
      const chunk2 = atc2.slice(chunkSize, chunkSize * 2);
      const chunk3 = atc2.slice(chunkSize * 2, chunkSize * 3);
      const chunk4 = atc2.slice(chunkSize * 3, chunkSize * 4);
      const chunk5 = atc2.slice(chunkSize * 4, chunkSize * 5);
      const chunk6 = atc2.slice(chunkSize * 5, chunkSize * 6);
      const chunk7 = atc2.slice(chunkSize * 6, chunkSize * 7);
      const chunk8 = atc2.slice(chunkSize * 7);

      // Join each chunk into strings
      atc2String = capitalize(chunk1.join(','));
    atc2_1string = capitalize(chunk2.join(','));
    atc2_2string = capitalize(chunk3.join(','));
    atc2_3string = capitalize(chunk4.join(','));
    atc2_4string = capitalize(chunk5.join(','));
    atc2_5string = capitalize(chunk6.join(','));
    atc2_6string = capitalize(chunk7.join(','));
    atc2_7string = capitalize(chunk8.join(','));

      //console.log("atc2String : ",atc2String);
      //console.log("atc2_1string : ",atc2_1string);
      //console.log("atc2_2string : ",atc2_2string);
      //console.log("atc2_3string : ",atc2_3string);
      //console.log("atc2_4string : ",atc2_4string);
      //console.log("atc2_5string : ",atc2_5string);
      //console.log("atc2_6string : ",atc2_6string);
      //console.log("atc2_7string : ",atc2_7string);

      if (atc2_7string.length == 0) {
        atc2_7string = atc2String;
        if (atc2_6string.length == 0) {
          atc2_6string = atc2String;
          if (atc2_5string.length == 0) {
            atc2_5string = atc2String;
            if (atc2_4string.length == 0) {
              atc2_4string = atc2String;
              if (atc2_3string.length == 0) {
                atc2_3string = atc2String;
                if (atc2_2string.length == 0) {
                  atc2_2string = atc2String;
                  if (atc2_1string.length == 0) {
                    atc2_1string = atc2String;
                  }
                }
              }
            }
          }
        }
      }

      const timeout = setTimeout(() => {
        fetch(
          `https://acnjewnxnpahnkc5z4lu7mhmrq0nqnpt.lambda-url.eu-central-1.on.aws/?dashboardId=${dashboardId}&atc2=${atc2String}&atc2_1=${atc2_1string}&atc2_2=${atc2_2string}&atc2_3=${atc2_3string}&atc2_4=${atc2_4string}&atc2_5=${atc2_5string}&atc2_6=${atc2_6string}&atc2_7=${atc2_7string}`
          // fetch(`https://45cremxqhft77cxalzqpfnnjiu0arpwo.lambda-url.eu-central-1.on.aws/?dashboardId=7db85091-b869-4f78-95b5-8a04c96b70ed`
        )
          .then((response) => response.json())
          .then((response) => {
            setDashboardUrl(response.EmbedUrl);
            setLoading(false);
          });
      }, 10);
      return () => clearTimeout(timeout);
    } else {
      router.push("/pbr/home2");
    }
  }, []);

  const createContext = async () => {
    const context = await createEmbeddingContext();
    setEmbeddingContext(context);
  };

  useEffect(() => {
    if (dashboardUrl) {
      createContext();
    }
  }, [dashboardUrl]);

  useEffect(() => {
    if (embeddingContext) {
      embed();
    }
  }, [embeddingContext]);

  const embed = async () => {
    // Use an iframe to render the embedded dashboard
    const iframe = document.createElement("iframe");
    iframe.src = dashboardUrl;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.title = "QuickSight Dashboard";

    // Replace the existing container with the iframe
    const container = document.getElementById("dashboard");
    container.innerHTML = "";
    container.style.overflow = "hidden"; // Hide the scrollbar
    container.appendChild(iframe);
  };

  return (
    <>
      <main>
        <div className="flex flex-col md:flex-row gap-5 justify-between items-center my-5">
          <div className="">
            <h1 className="text-4xl font-extrabold ">
              Ghana Company Analytic - Company SKU Dashboard
            </h1>
          </div>
          <div className="bg-white flex flex-col p-2 px-2 gap-2 font-semibold rounded-md border border-gray-50 shadow-md">
            <div className="bg-white flex flex-col p-2 px-2 gap-2 font-semibold rounded-md border border-gray-50 shadow-md"></div>
          </div>
        </div>
        {loading ? <Loading /> : <></>}
        <div className="h-[1500px]" id="dashboard" />
      </main>
    </>
  );
}

export default App;
