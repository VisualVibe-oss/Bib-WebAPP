import './App.css';

import { Header, Footer, Container , Graphe ,MyComponent ,PieChartComponent , Adduser} from './components';


const App = () => {

  return (

    <>
      <div className="flex">

        <div className="graph-container border-white">

          <Graphe />

          <div className="pie-chart-container"> {/* Container with background */}
        <PieChartComponent /> 
          </div>
        </div>

        <div className="table-container">
          <Adduser />
          <MyComponent />
           

        </div>

      </div>

      <Container />

      <Footer />

    </>

  );

};


export default App; 