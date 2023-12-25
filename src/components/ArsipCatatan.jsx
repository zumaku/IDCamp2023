import Card from "./Card";
export default function ArsipCatatan(props) {
    const { catatan, filter } = props;

    const catatanDiarsipkan = catatan.filter(
        (data) => data.archived && data.title.toLowerCase().includes(filter.toLowerCase())
    );

    const unarsipkanCatatan = (id) => {
        const catatanTerarsip = props.catatan.map((catatan) =>
            catatan.id === id ? { ...catatan, archived: false } : catatan
        );

        props.setCatatan(catatanTerarsip);
    };

    const hapusCatatan = (id) => {
        const catatanTanpaHapus = props.catatan.filter((catatan) => catatan.id !== id);
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
