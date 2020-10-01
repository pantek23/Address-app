import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navigation from "../layout/Navigation";

export default function Address() {
  const [address, setAddress] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [max, setMax] = useState(0);
  const [sort, setSort] = useState("---");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTxt, setSearchTxt] = useState("");
  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);

  useEffect(
    () => {
      loadAddresses();
    },
    // eslint-disable-next-line
    []
  );

  const navigClick = (e) => {
    //page: lpage, psize: psize, searchTxt: stxt });
    console.log(e);
    // let lpage = page;
    // if (e.dir === "forward") lpage++;
    // if (e.dir === "back") lpage--;
    // let lpageSize = e.psize ? e.psize : 10;
    setPageSize(e.psize);
    setPage(e.page);
    setSearchTxt(e.searchTxt);
    // setPage(lpage);
    // console.log(e, lpage, lpageSize);
    setMax(0);
    loadAddresses(e.page, e.psize, e.searchTxt);
  };
  const loadAddresses = async (p, psize, sTxt, aSort) => {
    p = p ? p : page;
    let mx = p;
    psize = psize ? psize : pageSize;
    sTxt = sTxt ? sTxt : searchTxt;
    let lSort = aSort ? aSort : sort;
    const url = `https://localhost:44318/api/AddressesApi?page=${p}&pagesize=${psize}&searchText=${sTxt}&sort=${lSort}`;
    console.log("loading...", url);
    const result = await axios.get(url, {
      header: { "Access-Control-Allow-Origin": "*" },
    });
    if (result.data.length === 0 && p > 1) {
      // p--;
      mx = p - 1;
      //      loadAddresses(p - 1, psize, sTxt);
    }
    setCurrentPage(p);
    setMax(mx);
    setAddress(result.data);
  };
  const handleSort = (e) => {
    let lSort;
    //console.log(e, sort, sort.slice(0, 2), sort.slice(2, 3));
    if (e === sort.slice(0, 2) && sort.slice(2, 3) === "a") lSort = e + "d";
    else lSort = e + "a";
    setSort(lSort);
    loadAddresses(page, pageSize, searchTxt, lSort);
  };
  const deleteAddr = async (id) => {
    // await axios.delete(`${url}/${id}`);
    loadAddresses();
  };
  return (
    <div className="container">
      <div className="py-4">
        <h3>Address {currentPage} </h3>
        <Navigation addrCnt={max} onNavClick={navigClick} />
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col" onClick={() => handleSort("h0")}>
                <Link to="#">#</Link>
              </th>
              <th scope="col" onClick={() => handleSort("h1")}>
                <Link to="#">AddressLine1</Link>
              </th>
              <th scope="col" onClick={() => handleSort("h2")}>
                <Link to="#">City</Link>
              </th>
              <th scope="col" onClick={() => handleSort("h3")}>
                <Link to="#">State/Province</Link>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {address.map((addr, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{addr.addressLine1}</td>
                <td>{addr.city}</td>
                <td>{addr.stateProvinceViewCode}</td>
                <td>
                  <Link
                    className="btn btn-primary mr-2"
                    to={`/address/${addr.addressId}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mr-2"
                    to={`/address/edit/${addr.addressId}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteAddr(addr.addressId)}
                    to="#"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
