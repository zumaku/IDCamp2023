import Card from "./Card";
export default function ArsipCatatan(props) {
    const catatanDiarsipkan = props.catatan.filter((data) => data.archived);

    return (
        <div className="w-full max-w-[1200px] m-auto flex flex-col justify-between p-5">
            <h1 className="text-2xl font-bold mb-5">Arsip</h1>
            <div className="flex justify-between flex-wrap ">
                {catatanDiarsipkan.length > 0 ? (
                    <div className="flex justify-between flex-wrap">
                        {catatanDiarsipkan.map((data) => (
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
