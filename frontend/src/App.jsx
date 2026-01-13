import { Routes, Route } from "react-router-dom";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import ScrollToTop from "./components/Layout/Scroll";

import { PrivateRoute, AdminRoute } from "./components/Auth/PrivateRoute";
import Login from "./components/Auth/Login";


import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";


import Services from "./components/Services/Services";
import TrainingService from "./components/Services/TrainingService";
import ConsultingService from "./components/Services/ConsultingService";
import ViewServices from "./components/Services/ViewServices";


import AiStrategyCourse from "./components/Courses/AiStrategyCourse";
import EnterpriseAiArchitectureCourse from "./components/Courses/EnterpriseAiArchitectureCourse";

import UploadCourse from "./components/Courses/UploadCourse";
import TrainerCourseDashboard from "./components/Courses/TrainerCourseDashboard";
import WatchCourse from "./components/Courses/WatchCourse";


import Frameworks from "./components/Knowledge/Frameworks";
import AiStrategyFramework from "./components/Knowledge/AiStrategyFramework";
import EnterpriseAiArchitectureFramework from "./components/Knowledge/EnterpriseAiArchitectureFramework";
import AiSolutionArchitectureFramework from "./components/Knowledge/AiSolutionArchitectureFramework";
import AiEngineeringFramework from "./components/Knowledge/AiEngineeringFramework";
import AiComputingFramework from "./components/Knowledge/AiComputingFramework";
import AiOperationsFramework from "./components/Knowledge/AiOperationsFramework";
import AiIntegrationFramework from "./components/Knowledge/AiIntegrationFramework";
import AiGovernanceFramework from "./components/Knowledge/AiGovernanceFramework";
import AiSecurityFramework from "./components/Knowledge/AiSecurityFramework";
import Toolkits from "./components/Knowledge/Toolkits";
import Standards from "./components/Knowledge/Standards";
import Blogs from "./components/Knowledge/Blogs";
import BlogPost from "./components/Knowledge/BlogPost";
import AccreditedTrainers from "./components/Knowledge/AccreditedTrainers";

import AdminUpload from "./components/Certificates/AdminUpload";
import AdminCertificates from "./components/Certificates/AdminCertificates";
import UserCertificates from "./components/Certificates/UserCertificates";
import Certifications from "./components/Certificates/Certifications";
import CertifiedMembers from "./components/Certificates/CertifiedMembers";
import AdminMembershipApplications from "./components/Membership/AdminMembershipApplications";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminCourseApprovals from "./components/Admin/AdminApprovalCourses";
import AdminCouponManagement from "./components/Admin/AdminCouponManagement";

import TakeAssessment from "./components/Assessment/TakeAssessment";
import TrainerAssessmentBuilder from "./components/Assessment/TrainerAssessmentBuilder";

import Membership from "./components/Membership/Membership";
import CorporateMembership from "./components/Membership/CorporateMembership";
import IndividualMembership from "./components/Membership/IndividualMembership";
import StudentMembership from "./components/Membership/StudentMembership";
import TrainerMembership from "./components/Membership/Trainer";
import AIArchitectureMembership from "./components/Membership/AIArchitectMembership";

import StudentRegister from "./components/Register/StudentRegister";
import CorporateRegister from "./components/Register/CorporateRegister";
import AIArchitectRegister from "./components/Register/AiArchitectureRegister";
import TrainerRegister from "./components/Register/TrainerRegister";
import IndividualRegister from "./components/Register/IndividualRegister";
import ProfileRouter from "./components/Membership/ProfileRouter";

import PaymentPage from "./components/Payment/Payment";
import Success from "./components/Payment/Success";
import Cancel from "./components/Payment/Cancel";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header stays on top */}
      <Header />

      {/* Main content grows to fill available space */}
      <main className="flex-grow">
        {/* Scroll to top on each route change */}
        <ScrollToTop />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/membership" element={<Membership />} />
          <Route
            path="/certificates"
            element={
              <PrivateRoute>
                <UserCertificates />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/certificates"
            element={
              <AdminRoute>
                <AdminUpload />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/manage"
            element={
              <AdminRoute>
                <AdminCertificates />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/membership-applications"
            element={
              <AdminRoute>
                <AdminMembershipApplications />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <AdminRoute>
                <AdminCourseApprovals />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/coupons"
            element={
              <AdminRoute>
                <AdminCouponManagement />
              </AdminRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/frameworks" element={<Frameworks />} />
          <Route path="/frameworks/ai-strategy" element={<AiStrategyFramework />} />
          <Route path="/frameworks/enterprise-ai-architecture" element={<EnterpriseAiArchitectureFramework />} />
          <Route path="/frameworks/ai-solution-architecture" element={<AiSolutionArchitectureFramework />} />
          <Route path="/frameworks/ai-engineering" element={<AiEngineeringFramework />} />
          <Route path="/frameworks/ai-computing" element={<AiComputingFramework />} />
          <Route path="/frameworks/ai-operations" element={<AiOperationsFramework />} />
          <Route path="/frameworks/ai-integration" element={<AiIntegrationFramework />} />
          <Route path="/frameworks/ai-governance" element={<AiGovernanceFramework />} />
          <Route path="/frameworks/ai-security" element={<AiSecurityFramework />} />
          <Route path="/toolkits" element={<Toolkits />} />
          <Route path="/standards" element={<Standards />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/artificial-intelligence-design" element={<BlogPost />} />
          <Route path="/payment" element={
            <PrivateRoute>
              <PaymentPage />
            </PrivateRoute>
          } />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/services/training" element={<TrainingService />} />
          <Route path="/services/consulting" element={<ConsultingService />} />
          <Route path="/accredited-trainers" element={<AccreditedTrainers />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/certified-members" element={<CertifiedMembers />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ai-strategy-course" element={<AiStrategyCourse />} />
          <Route path="/enterprise-ai-architecture-course" element={<EnterpriseAiArchitectureCourse />} />
          <Route path="/membership/corporate" element={<CorporateMembership />} />
          <Route path="/membership/individual" element={<IndividualMembership />} />
          <Route path="/membership/student" element={<StudentMembership />} />
          <Route path="/membership/trainer" element={<TrainerMembership />} />
          <Route path="/membership/architect" element={<AIArchitectureMembership />} />
          <Route path="/register/student" element={<StudentRegister />} />
          <Route path="/register/corporate" element={<CorporateRegister />} />
          <Route path="/register/architect" element={<AIArchitectRegister />} />
          <Route path="/register/trainer" element={<TrainerRegister />} />
          <Route path="/register/individual" element={<IndividualRegister />} />
          <Route path="/upload-course" element={<UploadCourse />} />
          <Route path="/trainer/courses-dashboard" element={<TrainerCourseDashboard />} />
          <Route path="/trainer/assessments" element={<TrainerAssessmentBuilder />} />
          <Route path="/view-services" element={<ViewServices />} />
          <Route path="/watch/:courseId" element={<WatchCourse />} />
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfileRouter />
            </PrivateRoute>
          } />
          
          {/* Assessment Routes */}
          <Route
            path="/assessment/:assessmentId"
            element={
              <PrivateRoute>
                <TakeAssessment />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>

      {/* Footer sticks at the bottom */}
      <Footer />
    </div>
  );
}
