import { useState } from "react";

export default function MakeNote(props) {
    const [judul, setJudul] = useState("");
    const [isiCatatan, setIsiCatatan] = useState("");

    const handleJudulChange = (e) => {
        if (e.target.value.length <= 50) {
            setJudul(e.target.value);
        }
    };

    const tambahCatatan = (judul, isi) => {
        const newCatatan = {
            id: +new Date(),
            createdAt: new Date().toISOString(),
            title: judul,
            body: isi,
            archived: false,
        };

        props.setCatatan((prevCatatan) => [...prevCatatan, newCatatan]);
    };

    const handleSubmit = () => {
        tambahCatatan(judul, isiCatatan);

        setJudul("");
        setIsiCatatan("");
    };

    return (
        <div className="w-full max-w-[800px] m-auto flex flex-col pt-5">
            <h1 className="text-2xl font-bold">
                Buat
                <span className="text-green-700"> Catatan</span>
            </h1>
            <p className="self-end">Sisa Karakter Judul: {50 - judul.length}</p>
            <input
                className="border-2 border-stone-800 bg-green-100 p-2 rounded-lg mb-3"
                type="text"
                placeholder="Judul Catatan"
                value={judul}
                onChange={handleJudulChange}
            />
            <textarea
                className="border-2 border-stone-800 bg-green-100 p-2 rounded-lg mb-3 h-32 resize-y"
                placeholder="Isi Catatan"
                value={isiCatatan}
                onChange={(e) => {
                    setIsiCatatan(e.target.value);
                }}
            ></textarea>
            <button
                className="border-2 border-stone-800 bg-green-700 p-2 rounded-lg mb-3 font-bold"
                onClick={handleSubmit}
            >
                Buat Catatan
            </button>
        </div>
    );
}
