import React, { useEffect, useState } from "react";
import "../Css/home.css";
import StudentsOpinions from "../components/StudentsOpinions";
import PurpleBox from "../components/PurpleBox";
import axios from "axios";
function Home() {
  const [faq, setFaq] = useState([]);
  const [about, setAbout] = useState([]);
  const [basmatrainig, setBasmaTraining] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://backendba9ma.ba9maonline.com/faq/");
        const data = response.data;
        setFaq(data);
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };
    const fetchAbout = async () => {
      try {
        const response = await axios.get("https://backendba9ma.ba9maonline.com/about/");
        const data = response.data;
        setAbout(data);
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };
    const fetchBasma = async () => {
      try {
        const response = await axios.get("https://backendba9ma.ba9maonline.com/basmatrainig/basmatrainigbyid/1");
        const data = response.data;
        setBasmaTraining(data);
    
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };
    fetchData();
    fetchAbout()
    fetchBasma()
  }, []);

  return (
    <>
      {/* About section */}
      <div className="container text-center about-section"style={{ overflowX: "hidden" }}>
            {about.map((abou)=>(
        <div className="row ">

          <div className="col-lg-5 col-md-6 col-sm-12"key={abou.id}>
            <h2 className="about_title">{abou.title} </h2>
            <p className="p_about">
          {abou.descr}
            </p>
          </div>
          <div className="col-lg-7 col-md-6 col-sm-12 d-flex justify-content-md-center align-items-center">
            <img
              src={`https://backendba9ma.ba9maonline.com/${abou.img}`}
              alt="about"
              className="about_img img-fluid "
              loading="lazy"
            />
          </div>
          
        </div>
      ))}

      </div>
      {/* End About section */}
      {/* Home Box */}
      {basmatrainig.length === 0 ? (
        <div>Loading...</div> // Display loading state
      ) : (
        basmatrainig.map((item) => (
          <PurpleBox
            key={item.id} // Unique key for each item
            title={item.title}
            description={item.descr}
            link="/courses" // Adjust link if needed
          />
        ))
      )}
      {/* <BoxCont title={title} description={description} linkPage={linkPage} /> */}

      {/* FAQ section */}
      <section className="margin_section" style={{ overflowX: "hidden" }}>
        <div className="container text-center">
          <h1 className="faq">الأسئلة المتكررة</h1>
          <div className="row">
            <div className="col">
              {faq.map((quesans) => (
                <details >
                  <summary>{quesans.ques}</summary>
                  <div>{quesans.ans} </div>
                </details>
              ))}

           
            </div>
          </div>
        </div>
      </section>
      <h1 className="faq">أراء وتجارب طلابنا </h1>

      <StudentsOpinions />
    </>
  );
}

export default Home;