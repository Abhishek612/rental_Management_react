import React , {useState,useEffect} from 'react';
import {Link} from "react-router-dom";

function Header() {
    const [locations,setLocation] = useState([])

  useEffect(()=>{
    fetch('/category/catalog.json',{ 
      method: 'GET'})
    .then((res)=>{
        return res.json()
    }).then((result)=>{
        setLocation(result.data.locations)   
    })

  },[])

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <Link className="navbar-brand" to={'/'} style={{ width: '80%'}}>RENTAL MANAGEMENT SYSTEM</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="dropdown collapse navbar-collapse" style={{ right: '117px'}}>
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Locations
            </button>
            <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                { 
                Object.keys(locations).map(function(index){
                  return (
                    <li key={index} className="dropdown-submenu">
                  <a className="dropdown-item inactiveLink" tabIndex="-1" href="#">{locations[index].name}</a>
                  <ul className="dropdown-menu">
                  { Object.keys(locations[index].branches).map(function(val){
                      return  ( 
                      <li key={val} className="dropdown-item" style={{color : '#0000'}}><Link to={`/location/${locations[index].dealers_id}_${locations[index].branches[val].branch_id}`} tabIndex="-1" href="#" data-locationid={locations[index].dealers_id} data-branchid={locations[index].branches[val].branch_id} >{locations[index].branches[val].name}</Link></li>
                     )
                  })
                  }
                  </ul>
                </li> )
                })
                }
              </ul>
        </div> 
    </nav>
    </React.Fragment>
  );
}

export default Header;
