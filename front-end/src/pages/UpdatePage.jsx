import React from "react";
import NavigationBar from "../components/NavigationBar";
import InputFields from "../components/InputFields";

function UpdatePage() {

    return (
        <div>
          <NavigationBar pageHdr={"Update Post"}/>
          <InputFields action={"Update"}/>
        </div>
    )
}

export default UpdatePage;