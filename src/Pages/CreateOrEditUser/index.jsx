import { useLocation } from "react-router-dom";
import Header from "../../Components/Header";
import CreateOrEditForm from "./CreateOrEditForm";
import './CreateOrUpdate.css'

export default function CreateOrEdit() {
  const { state } = useLocation();
  return (
    <div className="create-update-style">
      <Header title={state.title} />
      <CreateOrEditForm id={state.id}/>
    </div>
  )
}