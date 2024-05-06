import AlgorithmSelect from "./components/AlgorithmSelect";
import Background from "./components/Background";
import ConnectionDrawer from "./components/ConnectionDrawer";
import Metrics from "./components/Metrics";
import Player from "./components/Player";
import SidePanel from "./components/SidePanel";
import WorkingSpace from "./components/WorkingSpace";
import {useAppSelector} from "./store/hooks";

const App = () => {
  const algorithmChoose = useAppSelector(state => state.sidePanel.algorithmChoose)
  const algorithmPlay = useAppSelector(state => state.sidePanel.algorithmPlay);

  return (
    <>
      <Background />
      <ConnectionDrawer />
      <WorkingSpace />
      <Metrics />
      <SidePanel />
      { algorithmChoose && <AlgorithmSelect /> }
      { algorithmPlay && <Player /> }
    </>
  );
};

export default App;
