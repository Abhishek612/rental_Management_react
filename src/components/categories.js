import React  from 'react';
import {Link , withRouter} from "react-router-dom";

class Categories extends React.Component {


  constructor(props ){
      super(props)
      this.state= {
        locations : [],
        branchid : '',
        dealerid : '',
        filteredData : []
      }
     
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    if(nextProps.match.params.ids.split('_')[1] !== prevState.branchid){
      let branch_id = nextProps.match.params.ids.split('_')[1]
      let dealer_id = nextProps.match.params.ids.split('_')[0]
      const data = prevState.locations.filter(function(val,index){
      return val.dealers_id === dealer_id
      }).map(function(b_data){
      return b_data.branches
      })

      return {
        filteredData : data,
        branchid : branch_id,
        dealerid:dealer_id
      }
    }
   return null;
 }

  
  componentDidMount(){
    const url = this.props.match.params;
    fetch('/category/catalog.json',{ 
      method: 'GET'})
    .then((res)=>{
        console.log(res)
        return res.json()
    }).then((result)=>{
        this.setState({locations : result.data.locations})
        let id = url.ids.split('_')
        let branch_id = id[1]
        let dealer_id = id[0]
        // console.log(branch_id +' '+ dealer_id)
        const data = result.data.locations.filter(function(val,index){
        return val.dealers_id === dealer_id
        }).map(function(b_data){
        return b_data.branches
        })
        this.setState({branchid :  branch_id,dealerid:dealer_id})
        this.setState({filteredData : data})
    })
  }

// filterdata = (branch_id,dealer_id)=>{
// let branch_id = e.target.getAttribute('data-branchid')
// let dealer_id = e.target.getAttribute('data-locationid')
// console.log(branch_id +' '+ dealer_id)
// const data = this.state.locations.filter(function(val,index){
//    return val.dealers_id == dealer_id
// }).map(function(b_data){
//     return b_data.branches
// })

// this.setState({filterdata : data})
// console.log('data',data)

// this.setState({branchid :  branch_id,dealerid:dealer_id})

//   }

  render() {
     const { filteredData,branchid, dealerid} = this.state 
  return (
    <React.Fragment>      
    <main role="main" className="container">
    <div><h5>Equipment Catalog</h5></div>
    <div className="row">
      {(filteredData) ? 
        filteredData.map(function(data,index){
          return data.map(function(f_data){
            if(f_data.branch_id === branchid){
                return f_data.categories.map(function(c_data,index){
                    return (<div key={index} className="col-md-3 col-sm-6 imgbox">
                         <Link to={`/${dealerid}_${branchid}_${c_data.name}`}>
                    <img src={`/category/${c_data.image}`} className="card-img-top" alt="..." />
                    </Link>
                    <div className="categorybtn">
                      <span>{c_data.name}</span>
                      <span className="cat_btn"><i className="fas fa-play"></i></span>
                    </div>
                  </div>)
                })  
            }
          })     
        })
      :''}
      </div>
    </main>
    </React.Fragment>
  );
}
}

export default withRouter(Categories);
