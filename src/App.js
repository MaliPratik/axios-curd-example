import logo from './logo.svg';
import './App.css';
import ExampleTable from './componants/ExampleTable';
import Users from './componants/Users';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './componants/Header';
import Form1 from './Form1';
import List from './componants/List';



function App() {
  return (
    
    <>
     <BrowserRouter className="container">
       <Header/>
     <Routes>
      <Route path='/' element={<ExampleTable/>}></Route>
         <Route path='/add' element={<Users/>}></Route>
         <Route path='/list' element={<List/>}></Route>
         <Route path='/form1' element={<Form1/>}></Route>
         <Route path='/edit/:id' element={<Users/>}></Route>
         <Route path='/edit1/:id' element={<Form1/>}></Route>
       </Routes>
     </BrowserRouter>
    
    </>
    
  );
}

export default App;
