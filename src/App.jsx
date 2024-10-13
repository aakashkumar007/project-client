import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Loader from "./component/Loader"; // Keep Loader as a regular import

const HomePage = lazy(() => import("./pages/homepage/Home"));
const SignIn = lazy(() => import("./component/signin/Signin"));
const AddJobListing = lazy(() => import("./component/dashboard/jobListing/AddJobListing"));
const JobDetails = lazy(() => import("./component/dashboard/showJobs/JobDetails"));
const UpdateJobListing = lazy(() => import("./component/dashboard/updateJob/UpdateJob"));
const AllJobsPage = lazy(() => import("./component/dashboard/allJobs/AllJobs"));
const AllResult = lazy(() => import("./result/AllResult"));
const AdmitCardDetails = lazy(() => import("./admit-card/AdmitCardDetails"));
const AddResult = lazy(() => import("./result/AddResult"));
const ResultDetails = lazy(() => import("./result/ResultDetails"));
const UpdateResult = lazy(() => import("./result/UpdateResult"));
const AddAdmitCardPage = lazy(() => import("./admit-card/AddAdmitCard"));
const UpdateAdmitCardPage = lazy(() => import("./admit-card/UpdateAdmitCardPage"));
const AllAdmitCards = lazy(() => import("./admit-card/AllAdmitCards"));
const Layout = lazy(() => import("./component/Layout"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const Dashboard = lazy(() => import("./component/dashboard/Dashboard"));



const App = () => {
  return (
    <Router>
    <Suspense fallback={<div><Loader/></div>}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/get-all-jobs" Component={AllJobsPage} />
          <Route path="/get-all-results" Component={AllResult} />
          <Route path="/get-all-admit-cards" Component={AllAdmitCards} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="job/:id" element={<JobDetails />} />
          <Route path="result/:id" element={<ResultDetails />} />
          <Route path="admit-card/:id" element={<AdmitCardDetails/>} />
      
          <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="update-job/:id" element={<UpdateJobListing />} />
            <Route path="" element={<Dashboard />} />
            <Route path="add-job" element={<AddJobListing />} />

            <Route path="add-result" element={<AddResult />} />
            <Route path="update-result/:id" element={<UpdateResult />} />

            <Route path="add-admit-card" element={<AddAdmitCardPage />} />
            <Route path="update-admit-card/:id" element={<UpdateAdmitCardPage />} />
          </Route>
        </Routes>
      </Layout>
      </Suspense>
    </Router>
  );
};

export default App;
