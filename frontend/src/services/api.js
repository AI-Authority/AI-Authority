import axios from "axios";

// axios instance
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const registerUser = (data) => API.post("/auth/register", data); // register
export const loginUser = (data) => API.post("/auth/login", data); // login

// Certificates
export const getCertificates = (email) => API.get(`/certificates?email=${email}`); // user certs
export const uploadCertificate = (data) => API.post("/certificates/upload", data); // upload cert
export const getAllCertificates = () => API.get("/certificates/all"); // admin certs

// Memberships
export const submitCorporateMembership = (data) => API.post("/membership/corporate", data); // corporate
export const submitStudentMembership = (data) => API.post("/membership/student", data); // student
export const submitTrainerMembership = (data) => API.post("/membership/trainer", data); // trainer
export const submitIndividualMembership = (data) => API.post("/membership/individual", data); // individual
export const submitArchitectMembership = (data) => API.post("/membership/architect", data); // architect

// User profile
export const getUserProfile = (email) => API.get(`/auth/profile/${email}`); // profile

// Courses
// export const uploadTrainerCourse = (data) => API.post("/trainer/course/upload", data); // upload
export const uploadTrainerCourse = (data) =>
  API.post(
    "/trainer/course/upload",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    }
  );

export const getAllCoursesAdmin = () => API.get("/admin/courses"); // admin all
export const getPendingCourses = () => API.get("/admin/courses/pending"); // admin pending
export const approveCourse = (id) => API.patch(`/admin/course/approve/${id}`); // approve
export const rejectCourse = (id) => API.patch(`/admin/course/reject/${id}`); // reject
export const deleteCourse = (id) => API.delete(`/admin/course/delete/${id}`); // delete
export const getApprovedCourses = () => API.get("/courses/approved"); // public
export const getTrainerCourses = (id) => API.get(`/trainer/courses/${id}`); // trainer
export const updateTrainerCourse = (id, data) => API.put(`/trainer/course/update/${id}`, data); // update
export const deleteTrainerCourse = (id, trainerId) =>
  API.delete(`/trainer/course/delete/${id}`, { data: { trainerId } }); // trainer delete

// Course enrollment
export const getMyEnrolledCourses = () =>
  API.get("/enrollment/my-courses"); // enrolled IDs
export const createCourseEnrollment = (data) =>
  API.post("/enrollment/enroll", data); // enroll
export const validateCourseAccess = (courseId) =>
  API.get(`/enrollment/validate/${courseId}`); // watch access

// Email
export const sendEmail = (data) => API.post("/email/send", data); // send email

// Assessments
export const getAssessment = (assessmentId) => API.get(`/assessment/${assessmentId}`); // get questions (no answers)
export const submitAssessment = (data) => API.post("/assessment/submit", data); // submit answers
export const getUserAssessmentResults = (courseId, lessonId) =>
  API.get(`/assessment/results/${courseId}/${lessonId}`); // user history

// Trainer Assessment Management
export const createAssessment = (data) => API.post("/assessment/trainer/create", data); // create
export const getAssessmentWithAnswers = (assessmentId) =>
  API.get(`/assessment/trainer/${assessmentId}`); // get with answers (trainer)
export const updateAssessment = (assessmentId, data) =>
  API.put(`/assessment/trainer/${assessmentId}`, data); // update
export const deleteAssessment = (assessmentId) =>
  API.delete(`/assessment/trainer/${assessmentId}`); // delete/disable

// Coupons
export const validateCoupon = (data) => API.post("/coupons/validate", data); // validate coupon
export const recordCouponUsage = (data) => API.post("/coupons/use", data); // record usage

// Admin Coupon Management
export const createCoupon = (data) => API.post("/coupons/create", data); // admin create
export const getAllCoupons = () => API.get("/coupons"); // admin get all
export const updateCoupon = (id, data) => API.put(`/coupons/${id}`, data); // admin update
export const deleteCoupon = (id) => API.delete(`/coupons/${id}`); // admin delete
export const getCouponStats = (id) => API.get(`/coupons/${id}/stats`); // admin stats
