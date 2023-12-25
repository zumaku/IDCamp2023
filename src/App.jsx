import { useState, useEffect } from "react";
import { getInitialData } from "./utils";
import Navbar from "./components/Navbar";
import MakeNote from "./components/MakeNote";
import CatatanAktif from "./components/CatatanAktif";
import ArsipCatatan from "./components/ArsipCatatan";

export default function App() {
  const [catatan, setCatatan] = useState(getInitialData());

  // useEffect(() => {
  //   console.log(catatan)
  // }, [catatan])

  return (
    <>
      <Navbar />
      <MakeNote setCatatan={setCatatan} />
      <CatatanAktif catatan={catatan} />
      {/* <ArsipCatatan catatan={catatan} /> */}
    </>
  );
}
