import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center text-center space-y-6">
        <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Loading Your Dashboard
          </h2>
          <p className="text-gray-600 max-w-sm mx-auto">
            Please wait while we prepare your data visualization experience
          </p>
        </div>

        <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full animate-[progressBar_2s_ease-in-out_infinite]" 
               style={{
                 animation: `progressBar 2s ease-in-out infinite`,
                 width: '0%'
               }} />
        </div>

        <style jsx global>{`
          @keyframes progressBar {
            0% { width: 0%; }
            50% { width: 100%; }
            100% { width: 0%; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Loading;