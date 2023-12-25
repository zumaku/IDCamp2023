
import Card from "./Card";

export default function CatatanAktif(props) {

    const catatanTidakDiarsipkan = props.catatan.filter(
        (data) => !data.archived
    );

    console.log(catatanTidakDiarsipkan)

    return (
        <div className="w-full max-w-[1200px] m-auto flex flex-col justify-between p-5">
            <h1 className="text-2xl font-bold mb-5">Catatan Aktif</h1>
            <div className="flex justify-between flex-wrap ">
                {catatanTidakDiarsipkan.length > 0 ? (
                    <div className="flex justify-between flex-wrap">
                        {catatanTidakDiarsipkan.map((data) => (
                            <Card key={data.id} {...data} />
                        ))}
                    </div>
                ) : (
                    <p>Tidak ada catatan.</p>
                )}
            </div>
        </div>
    );
}
