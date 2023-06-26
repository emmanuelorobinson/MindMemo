import React from "react";
import "./App.css";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  UserButton,
} from "@clerk/clerk-react";

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./views/Home";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function ProtectedPage() {
  return (
    <>
      <h1>Protected page</h1>
      <UserButton />
    </>
  );
}

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Routes>
        <Route path="/sign-in" element={
        <div className=" h-[100vh] w-[100vw] flex justify-center items-center "><SignIn /></div>} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route
          path="/"
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route path="/" element={<Home/>} />
          {/* <Route path="/" element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/users/create" element={<CreateUser />} /> */}
        </Route>
        <Route
          path="/protected"
          element={
            <>
              <SignedIn>
                <ProtectedPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ClerkProviderWithRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
