// "use client"
// import { useEffect, useState } from "react";
// import { createEmbeddingContext } from "amazon-quicksight-embedding-sdk";
// import Loading from "./Loading";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

// function Dashboard({ dashboardId }) {
//   const [dashboardUrl, setDashboardUrl] = useState(null);
//   const [embeddingContext, setEmbeddingContext] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const { data: session } = useSession();
//   const subscription = session?.user?.subscription;

//   useEffect(() => {
//     if (subscription) {
//       let atc2String = "";
//       let atc2_1string = "";
//       let atc2_2string = "";
//       let atc2_3string = "";
//       let atc2_4string = "";
//       let atc2_5string = "";
//       let atc2_6string = "";
//       let atc2_7string = "";

//       // Calculate chunk size
//       const chunkSize = Math.ceil(subscription.length / 8);

//       // Split the array into chunks
//       const chunk1 = subscription.slice(0, chunkSize);
//       const chunk2 = subscription.slice(chunkSize, chunkSize * 2);
//       const chunk3 = subscription.slice(chunkSize * 2, chunkSize * 3);
//       const chunk4 = subscription.slice(chunkSize * 3, chunkSize * 4);
//       const chunk5 = subscription.slice(chunkSize * 4, chunkSize * 5);
//       const chunk6 = subscription.slice(chunkSize * 5, chunkSize * 6);
//       const chunk7 = subscription.slice(chunkSize * 6, chunkSize * 7);
//       const chunk8 = subscription.slice(chunkSize * 7);

//       // Join each chunk into strings
//       const capitalize = (str) => str.replace(/\b\w/g, (char) => char.toUpperCase());
//       atc2String = capitalize(chunk1.join(","));
//       atc2_1string = capitalize(chunk2.join(","));
//       atc2_2string = capitalize(chunk3.join(","));
//       atc2_3string = capitalize(chunk4.join(","));
//       atc2_4string = capitalize(chunk5.join(","));
//       atc2_5string = capitalize(chunk6.join(","));
//       atc2_6string = capitalize(chunk7.join(","));
//       atc2_7string = capitalize(chunk8.join(","));

//       if (atc2_7string.length === 0) {
//         atc2_7string = atc2String;
//         if (atc2_6string.length === 0) {
//           atc2_6string = atc2String;
//           if (atc2_5string.length === 0) {
//             atc2_5string = atc2String;
//             if (atc2_4string.length === 0) {
//               atc2_4string = atc2String;
//               if (atc2_3string.length === 0) {
//                 atc2_3string = atc2String;
//                 if (atc2_2string.length === 0) {
//                   atc2_2string = atc2String;
//                   if (atc2_1string.length === 0) {
//                     atc2_1string = atc2String;
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }

//       const timeout = setTimeout(() => {
//         fetch(
//           `https://ar2qhujbfgipevxg67pxzajoei0rrivg.lambda-url.eu-central-1.on.aws/?dashboardId=${dashboardId}&atc2=${atc2String}&atc2_1=${atc2_1string}&atc2_2=${atc2_2string}&atc2_3=${atc2_3string}&atc2_4=${atc2_4string}&atc2_5=${atc2_5string}&atc2_6=${atc2_6string}&atc2_7=${atc2_7string}`
//         )
//           .then((response) => response.json())
//           .then((response) => {
//             setDashboardUrl(response.EmbedUrl);
//             setLoading(false);
//           });
//       }, 10);

//       return () => clearTimeout(timeout);
//     } else {
//       router.push("/pbr/home2");
//     }
//   }, [subscription, dashboardId]);

//   const createContext = async () => {
//     const context = await createEmbeddingContext();
//     setEmbeddingContext(context);
//   };

//   useEffect(() => {
//     if (dashboardUrl) {
//       createContext();
//     }
//   }, [dashboardUrl]);

//   useEffect(() => {
//     if (embeddingContext) {
//       embed();
//     }
//   }, [embeddingContext]);

//   const embed = async () => {
//     const iframe = document.createElement("iframe");
//     iframe.src = dashboardUrl;
//     iframe.width = "100%";
//     iframe.height = "100%";
//     iframe.title = "QuickSight Dashboard";

//     const container = document.getElementById("dashboard");
//     container.innerHTML = "";
//     container.style.overflow = "hidden"; // Hide the scrollbar
//     container.appendChild(iframe);
//   };

//   return (
//     <>
//       <main>
//         {loading ? <Loading /> : <></>}
//         <div className="h-[1500px]" id="dashboard" />
//       </main>
//     </>
//   );
// }

// export default Dashboard;
"use client";
import { useEffect, useState } from "react";
import { createEmbeddingContext } from "amazon-quicksight-embedding-sdk";
import Loading from "./Loading";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";


function Dashboard({ dashboardId }) {
  const [dashboardUrl, setDashboardUrl] = useState(null);
  const [embeddingContext, setEmbeddingContext] = useState(null);
  const [loading, setLoading] = useState(true);
  const [baseUrl, setBaseUrl] = useState(""); // State to hold dynamic baseUrl
  const router = useRouter();
  const { data: session } = useSession();
  const subscription = session?.user?.subscription;

  useEffect(() => {
    const country = localStorage.getItem("country"); // Get country from localStorage
    console.log("Country from cookie:", country);

    // Set baseUrl dynamically based on the country
    switch (country) {
      case 'ghana':
        setBaseUrl("https://acnjewnxnpahnkc5z4lu7mhmrq0nqnpt.lambda-url.eu-central-1.on.aws");
        break;
      case 'nigeria':
        setBaseUrl("https://ar2qhujbfgipevxg67pxzajoei0rrivg.lambda-url.eu-central-1.on.aws");
        break;
     
    }
  }, []);

  useEffect(() => {
    if (subscription) {
      let atc2String = "";
      let atc2_1string = "";
      let atc2_2string = "";
      let atc2_3string = "";
      let atc2_4string = "";
      let atc2_5string = "";
      let atc2_6string = "";
      let atc2_7string = "";

      // Calculate chunk size
      const chunkSize = Math.ceil(subscription.length / 8);

      // Split the array into chunks
      const chunk1 = subscription.slice(0, chunkSize);
      const chunk2 = subscription.slice(chunkSize, chunkSize * 2);
      const chunk3 = subscription.slice(chunkSize * 2, chunkSize * 3);
      const chunk4 = subscription.slice(chunkSize * 3, chunkSize * 4);
      const chunk5 = subscription.slice(chunkSize * 4, chunkSize * 5);
      const chunk6 = subscription.slice(chunkSize * 5, chunkSize * 6);
      const chunk7 = subscription.slice(chunkSize * 6, chunkSize * 7);
      const chunk8 = subscription.slice(chunkSize * 7);

      // Join each chunk into strings
      const capitalize = (str) => str.replace(/\b\w/g, (char) => char.toUpperCase());
      atc2String = capitalize(chunk1.join(","));
      atc2_1string = capitalize(chunk2.join(","));
      atc2_2string = capitalize(chunk3.join(","));
      atc2_3string = capitalize(chunk4.join(","));
      atc2_4string = capitalize(chunk5.join(","));
      atc2_5string = capitalize(chunk6.join(","));
      atc2_6string = capitalize(chunk7.join(","));
      atc2_7string = capitalize(chunk8.join(","));

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

      const timeout = setTimeout(() => {
        // Fetch from the dynamically set baseUrl
        fetch(
          `${baseUrl}?dashboardId=${dashboardId}&atc2=${atc2String}&atc2_1=${atc2_1string}&atc2_2=${atc2_2string}&atc2_3=${atc2_3string}&atc2_4=${atc2_4string}&atc2_5=${atc2_5string}&atc2_6=${atc2_6string}&atc2_7=${atc2_7string}`
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
  }, [subscription, dashboardId, baseUrl]);

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
    const iframe = document.createElement("iframe");
    iframe.src = dashboardUrl;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.title = "QuickSight Dashboard";

    const container = document.getElementById("dashboard");
    container.innerHTML = "";
    container.style.overflow = "hidden"; // Hide the scrollbar
    container.appendChild(iframe);
  };

  return (
    <>
      <main>
        {loading ? <Loading /> : <></>}
        <div className="h-[1500px]" id="dashboard" />
      </main>
    </>
  );
}

export default Dashboard;
