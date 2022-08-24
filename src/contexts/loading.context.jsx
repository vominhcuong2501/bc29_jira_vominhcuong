import { createContext, useEffect, useState } from "react";

const DEFAULT_VALUE = {
  isLoading: false,
};

const LoadingContext = createContext(DEFAULT_VALUE);

const LoadingProvider = (props) => {
  const [state, setState] = useState(DEFAULT_VALUE);

  useEffect(() => {
    if (state.isLoading) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "auto";
    }
  }, [state.isLoading]);

  const styleLoading = {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <LoadingContext.Provider value={[state, setState]}>
      {state.isLoading && (
        <div style={styleLoading}>
          <img src={require("./loading.gif")} />
        </div>
      )}
      {props.children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
