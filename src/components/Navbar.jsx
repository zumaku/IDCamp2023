export default function Navbar(props) {
    const handleSearch = (e) => {
        props.setFilter(e.target.value)
    }

    return (
        <nav className="w-full h-fit bg-green-700">
            <div className="w-full max-w-[1200px] m-auto flex justify-between p-5">
                <h1 className="text-2xl font-bold">
                    <span className="text-white">Zu</span>
                    Notes
                </h1>
                <input
                    className="p-2 rounded-lg border-2 border-stone-800 bg-green-100 w-80"
                    type="text"
                    onChange={handleSearch}
                />
            </div>
        </nav>
    )
}
