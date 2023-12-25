import { useState } from "react"
import { getInitialData } from "./utils"
import Navbar from "./components/Navbar"
import MakeNote from "./components/MakeNote"
import CatatanAktif from "./components/CatatanAktif"
import ArsipCatatan from "./components/ArsipCatatan"

export default function App() {
    const [catatan, setCatatan] = useState(getInitialData())
    const [filter, setFilter] = useState("")

    return (
        <>
            <Navbar setFilter={setFilter} />
            <MakeNote setCatatan={setCatatan} />
            <CatatanAktif
                catatan={catatan}
                setCatatan={setCatatan}
                filter={filter}
            />
            <ArsipCatatan
                catatan={catatan}
                setCatatan={setCatatan}
                filter={filter}
            />
        </>
    )
}
