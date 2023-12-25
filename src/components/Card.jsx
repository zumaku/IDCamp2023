export default function Card(props) {
    const handleArsipkan = () => {
        if(!props.archived){
            props.arsipkanCatatan(props.id);
        } else{
            props.unarsipkanCatatan(props.id);
        }
    };

    return (
        <div
            className="h-fit flex flex-col justify-start border-stone-800 border-2 w-[30%] p-4 rounded-xl mb-6"
            key={props.id}
        >
            <h1 className="text-2xl font-bold">{props.title}</h1>
            <p className="text-neutral-600 mb-2">{props.createdAt}</p>
            <p className="mb-3">{props.body}</p>
            <div className="flex justify-between">
                <button className="bg-red-600 font-bold px-3 py-2 rounded-md">
                    Hapus
                </button>
                <button
                    className="bg-green-600 font-bold px-3 py-2 rounded-md"
                    onClick={handleArsipkan}
                >
                    {props.archived ? "Unarsipkan" :"Arsipkan"}
                </button>
            </div>
        </div>
    );
}
