import React from "react"
import { featured } from "../../data/Data"
import { useHistory } from "react-router-dom"

const FeaturedCard = () => {
  const history = useHistory();

  const handlePage = () => {
    history.push("/blog");
  }

  return (
    <>
      <div className='content grid mtop' style={{ display: "flex", justifyContent: "center" }}>
        {featured.map((items, index) => (
          <button type="submit" onClick={handlePage}>
            <div className='box' key={index}>
              <img src={items.cover} alt='' />
              <h4>{items.name}</h4>
            </div>
          </button>
        ))}
      </div>
    </>
  )
}

export default FeaturedCard
