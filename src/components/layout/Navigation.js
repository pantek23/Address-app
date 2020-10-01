import React, { useRef, useState } from "react";

export default function Navigation({ addrCnt, onNavClick }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  //const [searchTxt, setsearchTxt] = useState(null);

  const inputPageSize = useRef(null);
  const inputSearch = useRef(null);

  const handleClick = (e) => {
    // `current` points to the mounted text input element
    let lpage = page;
    if (e === "forward") lpage++;
    if (e === "back") lpage--;
    if (e === "search") lpage = 1; // is searching then reset page
    lpage = lpage > 0 ? lpage : 1;
    if (lpage > addrCnt + 1) lpage = addrCnt + 1;
    setPage(lpage);
    let psize = inputPageSize.current.value;
    psize = psize ? psize : 10;
    psize = psize > 0 ? psize : 1;
    setPageSize(psize);

    let stxt = inputSearch.current.value;
    stxt = stxt ? stxt : "";
    //setsearchTxt(stxt);

    onNavClick({ page: lpage, psize: psize, searchTxt: stxt });
  };

  return (
    <div style={{ fontSize: 14 }}>
      {addrCnt}
      <button className="navButton" onClick={() => handleClick("back")}>
        Back
      </button>
      <button
        className="navButton "
        placeholder="Page size"
        onClick={() => handleClick("forward")}
      >
        Forward
      </button>
      {"  "} Page size:{" "}
      <input
        style={{ width: 50, height: 20 }}
        placeholder="size"
        ref={inputPageSize}
        type="text"
        onChange={() => handleClick("psize")}
        value={pageSize}
      />
      {"  "} Filter:{" "}
      <input
        style={{ width: 250, height: 20 }}
        placeholder="search text"
        ref={inputSearch}
        type="text"
        onChange={() => handleClick("search")}
      />
    </div>
  );
}
