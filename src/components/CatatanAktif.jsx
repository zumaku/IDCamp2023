
import Card from "./Card";

export default function CatatanAktif(props) {
    const { catatan, filter } = props;

    const catatanTidakDiarsipkan = catatan.filter(
        (data) => !data.archived && data.title.toLowerCase().includes(filter.toLowerCase())
    );

    const arsipkanCatatan = (id) => {
        const catatanTerarsipkan = props.catatan.map((catatan) =>
            catatan.id === id ? { ...catatan, archived: !catatan.archived } : catatan
        );

        props.setCatatan(catatanTerarsipkan);
    };

    const hapusCatatan = (id) => {
        const catatanTanpaHapus = props.catatan.filter((catatan) => catatan.id !== id);
        props.setCatatan(catatanTanpaHapus);
    };

    return (
        <div className="w-full max-w-[1200px] m-auto flex flex-col justify-between p-5">
            <h1 className="text-2xl font-bold mb-5">Catatan Aktif</h1>
            <div className="flex justify-between flex-wrap ">
                {catatanTidakDiarsipkan.length > 0 ? (
                    <div className="flex justify-between flex-wrap">
                        {catatanTidakDiarsipkan.map((data) => (
                            <Card key={data.id} {...data} arsipkanCatatan={arsipkanCatatan} hapusCatatan={hapusCatatan} />
                        ))}
                    </div>
                ) : (
                    <p>Tidak ada catatan.</p>
                )}
            </div>
        </div>
    );
}
