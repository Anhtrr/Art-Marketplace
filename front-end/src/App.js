// import logo from './logo.svg'
import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AboutUs from './Pages/AboutUs'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp' 
import ArtistHome from './Pages/ArtistHome'
import Landing from './Pages/Landing'
import AddArt from './Pages/AddArt'
import HomeCategories from './Pages/CustomerHomePage'
import Category from './Pages/CategoryPage'
import ViewItem from './Pages/ViewItem'
import ViewCart from './Pages/ViewCart'
import RisingArtist from './Pages/RisingArtist'

const App = props => {
  const [user, setUser] = useState({})
  return (
    <BrowserRouter>
      <Routes>
        {/* Pre-Login Routes */}
        {!user.user && (
          <>
            <Route path="/" element={<Landing user={user}/>}/>
            <Route path="/Login" element={<Login user={user} setuser={setUser} />}/>
            <Route path="/SignUp" element={<SignUp user={user} />}/>
            <Route path="/AboutUs" element={<AboutUs user={user} />}/>
          </>
        )}
        {/* Post-Login Routes */}
        {user.user &&(
          <>
            {/* ARTIST EXCLUSIVE USER ROUTES */}
            {user.user == "Artist" &&(
              <>
                <Route path="/" element={<ArtistHome user={user} />}/>
                <Route path="/AddArt" element={<AddArt user={user} />}/>
              </>
            )}
            {/* CUSTOMER EXCLUSIVE USER ROUTES */}
            {user.user == "Customer" &&(
              <>
                <Route path="/" element={<HomeCategories user={user} />}/>
                <Route path="/Cart" element={<ViewCart user={user} />}/>
                <Route path="/RisingArtists" element={<RisingArtist user={user} />} />
                <Route path="/Category/:categoryID" element={<Category user={user} />}/>
              </>
            )}
            {/* NON-EXCLUSIVE USER ROUTES */}
            <Route path="/Item/:productID" element={<ViewItem user={user} />}/> 
          </>
        )}
        {/* ANY PATH THAT DOES NOT EXIST --> take user back to "/" (home) */}
        <Route path ='*' element={ <Navigate to ='/' /> } />
        <Route path="/" element={<Landing user={user}/>}/>
        <Route path="/Login" element={<Login user={user} setuser={setUser} />}/>
        <Route path="/SignUp" element={<SignUp user={user} />}/>
        <Route path="/AboutUs" element={<AboutUs user={user} />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;