import React from "react";
import NavigationBar from "../components/NavigationBar" ;
import InputFields from "../components/InputFields";

function AddPage() {

  return (
    <div>
      <NavigationBar pageHdr={"Add Post"}/>
      <InputFields action={"Add"}/>
    </div>
  );
}

export default AddPage;
