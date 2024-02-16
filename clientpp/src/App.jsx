import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegistrationForm from './components/RegistrationForm'
import Login from './components/LogIn'
import MainPage from './components/MainPage'
import CreateWorkOut from './components/CreateWorkOut'
import WorkOut from './components/WorkOut'
import BMI from './components/BMI'
import Diet from './components/Diet'
import Exercises from './components/Exercises'
import SingleWorkOut from './components/SingleWorkOut'
import WelcomePage from './components/WelcomePage';
import EditWorkOuts from './components/EditWorkOuts';
import Profile from './components/Profile';
import { AuthProvider, useAuth } from './AuthContext';

function App() {
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  return (
      <BrowserRouter>
      <Routes>
      {token ? (
        <>
        <Route path="/" element={<MainPage user={user}/>}></Route>
        <Route path="/createworkout" element={<CreateWorkOut user={user}/>}></Route>
        <Route path="/BMI" element={<BMI user={user}/>}></Route>
        <Route path="/diet" element={<Diet user={user}/>}></Route>
        <Route path="/exercises" element={<Exercises user={user}/>}></Route>
        <Route path="/workout" element={<WorkOut user={user}/>}></Route>
        <Route path="/singleworkout/:id" element={<SingleWorkOut user={user}/>}></Route>
        <Route path="/editworkout/:id" element={<EditWorkOuts user={user}/>}></Route>
        <Route path="/profile" element={<Profile user={user}/>}></Route>
        </>
        ) : (
          <>         
          <Route path='*' element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<RegistrationForm user={user}/>}></Route>
          </>
        )}
      </Routes>
      </BrowserRouter>
  )
}

export default App

