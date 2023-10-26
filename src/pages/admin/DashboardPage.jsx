import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import {
  UploadOutlined,
  VideoCameraOutlined,
  UsergroupAddOutlined,
  BankOutlined,
} from "@ant-design/icons";
import CountUp from "react-countup";
import request from "../../server";

const DashboardPage = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [skills, setSkills] = useState(0);
  const [users, setUsers] = useState(0);
  const [education, setEducation] = useState(0);
  const [portfolios, setPortfolios] = useState(0);
  const [bigTxt, setBigTxt] = useState(false);

  const getSkills = async () => {
    const { data } = await request.get("skills");
    setSkills(data.pagination.total);
  };
  const getUsers = async () => {
    const { data } = await request.get("users");
    setUsers(data.pagination.total);
  };
  const getEducation = async () => {
    const { data } = await request.get("education");
    setEducation(data.pagination.total);
  };
  const getPortfolio = async () => {
    const { data } = await request.get("portfolios");
    setPortfolios(data.pagination.total);
  };

  useEffect(() => {
    getSkills();
    getUsers();
    getPortfolio();
    getEducation();

    const hideLoader = () => {
      setIsVisible(false);
    };

    setTimeout(hideLoader, 3000);
  }, []);

  return (
    <>
      <div className={`loader ${isVisible ? "visible" : "hidden"}`}>
        <div>
          <img
            src="https://media.tenor.com/q4L3wKD-P7YAAAAj/hydra-we-bhack.gif"
            alt="hacker-loader"
          />
          <br />
          <br />
          <center>
            <h1>Wait ...</h1>
          </center>
        </div>
      </div>
      <section className="dashboard-section">
        <h1 className="dashboard-page-name">Dashboard:</h1>
        <Row gutter={16}>
          <Col style={{ margin: "10px 0" }} span={24} lg={6}>
            <div className="dashboard-card">
              <div className="dashboard-card-container">
                <div className="icon">
                  <UsergroupAddOutlined />
                </div>
                <div className={`${bigTxt ? "bigTXT txt" : "smallTXT txt"}`}>
                  <p>Users</p>
                  <h3>
                    <CountUp
                      delay={4}
                      end={users}
                      onStart={() => {
                        setBigTxt(true);
                      }}
                      onEnd={() => {
                        setBigTxt(false);
                      }}
                      duration={7}
                      separator=","
                    />
                  </h3>
                </div>
              </div>
            </div>
          </Col>
          <Col style={{ margin: "10px 0" }} span={24} lg={6}>
            <div className="dashboard-card">
              <div className="dashboard-card-container">
                <div className="icon">
                  <VideoCameraOutlined />
                </div>
                <div className={`${bigTxt ? "bigTXT txt" : "smallTXT txt"}`}>
                  <p>Skills</p>
                  <h3>
                    <CountUp
                      end={skills}
                      delay={4}
                      onStart={() => {
                        setBigTxt(true);
                      }}
                      onEnd={() => {
                        setBigTxt(false);
                        console.log(bigTxt);
                      }}
                      duration={7}
                      separator=","
                    />
                  </h3>
                </div>
              </div>
            </div>
          </Col>
          <Col style={{ margin: "10px 0" }} span={24} lg={6}>
            <div className="dashboard-card">
              <div className="dashboard-card-container">
                <div className="icon">
                  <UploadOutlined />
                </div>
                <div className={`${bigTxt ? "bigTXT txt" : "smallTXT txt"}`}>
                  <p>Portfolios</p>
                  <h3>
                    <CountUp
                      end={portfolios}
                      delay={4}
                      onStart={() => {
                        setBigTxt(true);
                      }}
                      onEnd={() => {
                        setBigTxt(false);
                      }}
                      duration={7}
                      separator=","
                    />
                  </h3>
                </div>
              </div>
            </div>
          </Col>
          <Col style={{ margin: "10px 0" }} span={24} lg={6}>
            <div className="dashboard-card">
              <div className="dashboard-card-container">
                <div className="icon">
                  <BankOutlined />
                </div>
                <div className={`${bigTxt ? "bigTXT txt" : "smallTXT txt"}`}>
                  <p>Educations</p>
                  <h3>
                    <CountUp
                      end={education}
                      delay={4}
                      onStart={() => {
                        setBigTxt(true);
                      }}
                      onEnd={() => {
                        setBigTxt(false);
                      }}
                      duration={7}
                      separator=","
                    />
                  </h3>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default DashboardPage;
