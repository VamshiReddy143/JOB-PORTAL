import React, { useEffect } from 'react'
import Navbar from './common/Navbar'
import HeroSection from './HeroSection'
// import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobCards'
import Footer from './Footer'
import useGetAllJobs from './hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';


const Home = () => {
  useGetAllJobs();

  const { allJobs } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSection />
      {/* <CategoryCarousel /> */}


      <div className="max-w-7xl mx-auto mt-5">
        {
          allJobs.length === 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {
                  allJobs.map((job) => (
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      key={job?._id}>

                      <LatestJobs job={job} />
                    </motion.div>
                  ))

                }
              </div>
            </div>
          )



        }
      </div>

      <Footer />
    </div>
  )
}

export default Home