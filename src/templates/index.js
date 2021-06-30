import React, { useEffect, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { navigate } from "gatsby-link";

function IndexPage() {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    if (!didMount) {
      navigate(`/${reactLocalStorage.get("lang", "ru")}`);
      setDidMount(true);
    }
  });

  return <div></div>;
}

export default IndexPage;
