import React , {useState,useEffect} from 'react';
import { Link , useParams } from 'react-router-dom';

function Subcategories() {

  // const [locations,setLocation] = useState([])
  const [filteredData , setFilterData] = useState([])
  const [branchid , setBranchid] = useState()
  const { categoryId } = useParams()
  const [categoryid , setCategoryId] = useState()
  const [dealerid , setDealerId] = useState()

  useEffect(()=>{

    fetch('/category/catalog.json',{ 
      method: 'GET'})
    .then((res)=>{
        console.log(res)
        return res.json()
    }).then((result)=>{
        // console.log(result.data.locations)
        let ids = categoryId.split('_')
        let branch_id = ids[1]
        let dealer_id = ids[0]
        let category_id = ids[2]
        console.log(branch_id +' '+ dealer_id)
        const data = result.data.locations.filter(function(val,index){
        return val.dealers_id === dealer_id
        }).map(function(b_data){
        return b_data.branches
        })
        setFilterData(data)
        setCategoryId(category_id)
        setDealerId(dealer_id)
        setBranchid(branch_id) 
    })
  },[])

  return (
    <React.Fragment>
    <main role="main" class="container">
    <div><nav>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><Link to={`/location/${dealerid}_${branchid}`}>Equipment catalog</Link></li>
              <li class="breadcrumb-item">{`${categoryid}`}</li>
        </ol>
    </nav></div>
    <div className="row">
      {
        filteredData.map(function(data,index){
          return data.map(function(f_data,i){
            if(f_data.branch_id === branchid){
              console.log(f_data)
                return f_data.categories.map(function(c_data){
                      if(c_data.name === categoryid){
                        return c_data.subcategories.map(function(s_data,index){
                            return (<div key={index} className="col-md-3 col-sm-6 imgbox">
                            {(s_data.name == 'NA') ?
                                <img src={`/category/subcategory/No-image-available.png`} className="card-img-top" alt={s_data.name} />
                                  :<img src={`/category/subcategory/${s_data.image}`} className="card-img-top" alt={s_data.name} />}
                            <div className="categorybtn">
                              <span>{s_data.name}</span>
                              <span className="cat_btn"><i class="fas fa-play"></i></span>
                            </div>
                          </div>)
                        })
                        
                      }
                })  
            }
          })     
        })
      }
      </div>
    </main>
    </React.Fragment>
  );
}

export default Subcategories;
