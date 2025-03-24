import { useParams } from "react-router-dom";
import CamperDetails from "../../components/CamperDetails/CamperDetails";

function CamperPage() {
  const { id } = useParams();

  return (
    <div>
      <CamperDetails camperId={id} />
    </div>
  );
}

export default CamperPage;
