import AlgorithmSelect from "./components/AlgorithmSelect";
import Background from "./components/Background";
import ConnectionDrawer from "./components/ConnectionDrawer";
import Metrics from "./components/Metrics";
import SidePanel from "./components/SidePanel";
import WorkingSpace from "./components/WorkingSpace";
import {useAppSelector} from "./store/hooks";

const App = () => {
  const algorithmChoose = useAppSelector(state => state.sidePanel.algorithmChoose)

  return (
    <>
      <Background />
      <ConnectionDrawer />
      <WorkingSpace />
      <Metrics />
      <SidePanel />
      { algorithmChoose && <AlgorithmSelect /> }
    </>
  );
};

export default App;
