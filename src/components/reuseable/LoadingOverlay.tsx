import { useEffect } from "react";
import { Loader } from "lucide-react";

const LoadingOverlay = () => {
  useEffect(() => {
    const body = document.querySelector('body');
    body?.classList.add('no-scroll');
  
    return () => {
      body?.classList.remove('no-scroll');
    }
  }, [])
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
      <div className="mx-auto text-center space-y-5">
        <Loader size={50} className="animate-spin mx-auto text-primary-normal" />
        <p>Loading! Please wait ...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;