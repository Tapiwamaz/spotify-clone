import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const useHistoryStack = () => {
    const [historyStack, setHistoryStack] = useState(["/"]);
    const [forwardStack, setForwardStack] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
  
    const push = (path) => {
      setHistoryStack([...historyStack, location.pathname]);
      setForwardStack([])
      navigate(path);
    };
  
    const goBack = () => {
      if (historyStack.length > 1) {
        const lastPath = historyStack[historyStack.length - 1];
        setHistoryStack(historyStack.slice(0, -1));
        setForwardStack([location.pathname, ...forwardStack]);
        navigate(lastPath);
      }
    };
  
    const goForward = () => {
      if (forwardStack.length > 0) {
        const nextPath = forwardStack[0];
        setForwardStack(forwardStack.slice(1));
        setHistoryStack([...historyStack, location.pathname]);
        navigate(nextPath);
      }
    };
  
    return {
      push,
      goBack,
      goForward,
      historyStack,
      forwardStack,
    };
  };

export {useHistoryStack};  