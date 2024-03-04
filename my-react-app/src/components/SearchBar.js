const SearchBar = () => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <img src="./search.png" class="h-[2.2vh] w-[1.25vw]" />

            </div>
            <input type="search" id="default-search" className="shadow h-[4.63vh] w-[15.021vw] px-12 text-md placeholder-gray-500 placeholder-opacity-50" placeholder="Search here" ></input>
        </div>
    );
}

export default SearchBar;
