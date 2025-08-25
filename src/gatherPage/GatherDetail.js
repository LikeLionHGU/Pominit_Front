// GatherDetail.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import Floating from "./component/Floating";

import Info from "./component/Info";
import Member from "./component/Member";
import Review from "./component/Review";
import Location from "./component/Location";

import { useParams } from "react-router-dom";
import styles from "./styles/GatherDetail.module.css";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

const API_BASE = (process.env.REACT_APP_API_BASE_URL || "").replace(/\/+$/, "");
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { Accept: "application/json" },
  withCredentials: false,
});

function GatherDetail() {
  const { id } = useParams();

  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [gather, setGather] = useState(null);
  // eslint-disable-next-line
  const [fetchError, setFetchError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleJoined = () => {
    setRefresh((t) => t + 1);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = parseJwt(token);
      if (payload?.name) {
        setUserName(payload.name);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    const token = localStorage.getItem("token");
    const headers = token
      ? {
          Authorization: token.startsWith("Bearer ")
            ? token
            : `Bearer ${token}`,
        }
      : undefined;
    (async () => {
      try {
        setFetchError(null);
        const { data } = await api.get(`/gather/detail/${id}`, {
          signal: controller.signal,
          headers,
        });

        setGather(data);
      } catch (e) {
        if (!axios.isCancel(e)) {
          setFetchError(e.message || "데이터를 가져오지 못했습니다.");
        }
      }
    })();

    return () => controller.abort();
  }, [id]);

  return (
    <div className="container">
      <Header />
      <div className={styles.wrap}>
        <Sidebar />

        <div className={styles.container}>
          {gather && (
            <>
              <Info />

              <Member
                refreshKey={refresh}
                leader={{
                  imageUrl: gather.makerImage,
                  name: gather.makerName,
                  contact: gather.makerContact,
                  statement: gather.makerStatement,
                }}
              />

              <Review userName={userName} isLoggedIn={isLoggedIn} />
              <Location />
            </>
          )}
        </div>
      </div>
      <Floating
        initialState={gather?.state ?? gather?.joinState ?? gather?.message}
        onJoined={handleJoined}
      />
    </div>
  );
}

export default GatherDetail;
