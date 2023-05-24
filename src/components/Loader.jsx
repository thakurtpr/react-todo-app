import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100000);
  }, []);

  return <ClipLoader loading={loading} size={150} />;
};
export default Loader;
