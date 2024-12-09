import { Link } from "react-router";
import CategorizeRender from "./CategorizeRender";
import ClozeRender from "./ClozeRender";
import ComprehensionRender from "./ComprehensionRender";

function RenderPage() {
  return (
    <>
      <CategorizeRender />
      <ClozeRender />
      <ComprehensionRender />
      <Link to="/thankyoupage">
        <div className="text-right">
          <button className="m-2 border border-black bg-slate-100 p-2 rounded-md">Submit</button>
        </div>
      </Link>
    </>
  )
};

export default RenderPage;