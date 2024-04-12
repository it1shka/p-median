import Background from "./components/Background";
import ConnectionDrawer from "./components/ConnectionDrawer";
import Metrics from "./components/Metrics";
import SidePanel from "./components/SidePanel";
import WorkingSpace from "./components/WorkingSpace";

const App = () => {
  return (
    <>
      <Background />
      <ConnectionDrawer />
      <WorkingSpace />
      <Metrics />
      <SidePanel />
    </>
  );
};

export default App;
