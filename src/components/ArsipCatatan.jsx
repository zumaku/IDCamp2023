import Card from "./Card";
export default function ArsipCatatan(props) {
    const catatanDiarsipkan = props.catatan.filter((data) => data.archived);

    const unarsipkanCatatan = (id) => {
        // Ubah nilai archived menjadi false untuk catatan dengan ID tertentu
        const catatanTerunarsipkan = props.catatan.map((catatan) =>
            catatan.id === id ? { ...catatan, archived: false } : catatan
        );

        // Panggil properti setCatatan untuk memperbarui state
        props.setCatatan(catatanTerunarsipkan);
    };

    const hapusCatatan = (id) => {
        // Filter catatan berdasarkan ID untuk menghapusnya
        const catatanTanpaHapus = props.catatan.filter((catatan) => catatan.id !== id);

        // Panggil properti setCatatan untuk memperbarui state
        props.setCatatan(catatanTanpaHapus);
    };

    return (
        <div className="w-full max-w-[1200px] m-auto flex flex-col justify-between p-5">
            <h1 className="text-2xl font-bold mb-5">Arsip</h1>
            <div className="flex justify-between flex-wrap ">
                {catatanDiarsipkan.length > 0 ? (
                    <div className="flex justify-between flex-wrap">
                        {catatanDiarsipkan.map((data) => (
                            <Card key={data.id} {...data} unarsipkanCatatan={unarsipkanCatatan} hapusCatatan={hapusCatatan} />
                        ))}
                    </div>
                ) : (
                    <p>Tidak ada catatan.</p>
                )}
            </div>
        </div>
    );
}
