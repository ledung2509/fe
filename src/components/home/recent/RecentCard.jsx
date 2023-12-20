import React, { useEffect, useState } from "react"

const RecentCard = () => {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/bedsitter/all?page=${currentPage}&size=6`,{
          method:'GET'
        });
        if (response.ok) {
          const result = await response.json();
          setData(result.content);
          setTotalRecords(result.totalElements);
        } else {
          console.log("Error fetching data");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, [currentPage]);



  return (
    <>
      <div className='content grid3 mtop'>
        {data.map(item => (
          <div className='box shadow' key={item.id}>
            <div className='img'>
              <img src={item.cover} alt='' />
            </div>
            <div className='text'>
              <p><i className='fa fa-location-dot'></i><span style={{ fontWeight: "bold" }}>Location:</span> Thạch Hòa,Thạch Thất</p>
              <p> <span style={{ fontWeight: "bold" }}>Description: </span>{item.description}</p>
              <p> <span style={{ fontWeight: "bold" }}>Electric price: </span>{item.electricityPrice}.000 VND</p>
              <p> <span style={{ fontWeight: "bold" }}>Water price: </span>{item.waterPrice}.000 VND</p>
            </div>
            <div className='button flex'>
              <div>
                <button className='btn2'>{item.roomPrice}.000 VND</button> <label htmlFor=''></label>
              </div>
              <span>Room Code: {item.roomCode}</span>
            </div>
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation" className='mt-4'>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 0 && 'disabled'}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} aria-label="Previous" hidden={currentPage === 0}>
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li className="page-item disabled"><span className="page-link">Page {currentPage + 1}</span></li>
          <li className={`page-item ${data.length < 6 && 'disabled'}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} aria-label="Next" hidden={(currentPage + 1) * 6 >= totalRecords}>
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default RecentCard
