import React from 'react'
import Layout from '../components/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories = useCategory()

  return (
    <div>
        <Layout title={"All categories"}>
            <div className="container">
                <div className="row">
                    {categories?.map((c)=>(
                        <div key={c._id} className="col-md-6 mt-5 mb-3 gx-3 gy-3">
                            <Link className='btn  btn-outline-primary ' to={`/category/${c.slug}`}  >{c.name}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default Categories