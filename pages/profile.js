import React from 'react'
import Link from 'next/link'
import FotterP from '../componen/fotterP'
import Navbar from '../componen/Navbar'
import CardProfile from '../componen/cardProfile'
import {  useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios' 
import Image from 'next/image'

export default function Profile() {
  const token = JSON.parse(localStorage.getItem('token'))
  const router = useRouter()
  const [data, setData] = useState ([])
  const [recipe, setRecipe] = useState ([])
  console.log(data,'dari profile')

  // useEffect(() => {
    const user = JSON.parse(localStorage.getItem('data'))
      // setUser(user)
      // console.log(user.id)
  // },[])

  const apiRecepi = `https://courageous-lime-jaguar.cyclic.app/users/${user.id}`
  useEffect(() => {  
    axios.get(apiRecepi)
      .then((result) => {
        result.data && setData(result.data.data[0])
        console.log(result.data.data[0],'ini data user')
        // alert('get data success');
      })
      .catch((err) => {
        console.log(err)
        alert('get data fail');
      })
  }, [])

  const myrecipe = () => {
    axios.get(`https://courageous-lime-jaguar.cyclic.app/recipe/user`, {
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
      .then((result) => {
        result.data && setRecipe(result.data.data)
        console.log(result.data.data,'ini data my recipe')
        // alert('get my recipe success');
      })
      .catch((err) => {
        console.log(err)
        alert('get my recipe fail');
      })
  }

  useEffect(() => {  
    myrecipe()
    console.log(recipe.id,'data recipe')
  },[])



  const handleDelete = (id) => {
    axios.delete(`https://courageous-lime-jaguar.cyclic.app/recipe/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((result) => {
        alert('delete recipe success');
        myrecipe()
      })
      .catch((err) => {
        console.log(err)
        alert('delete recipe fail');
      })
  }



  
  return (
    <div>
      <div>
      <Navbar />
      <>
      <div className='container text-center' style={{ marginTop: '5%', marginBottom: '5%' }} >
        <img src={data? data.photo : 'data not found'} className='image-fluid' alt='' style={{ borderRadius: '50%', width: '172px', height: '172px' }} />
        <Link href='/changeP'><button className='btn btn-outline-light' style={{ marginTop: '12%' }}><img src='/ed.png' alt='' /></button> </Link>
        <h6 className='mt-3' style={{ marginRight: '5%' }}>{data? data.name : 'data not found'}</h6>
      </div>
      {/* <PrifileCard/> */}
        <div className='container'>
          {/* menu */}
          <ul className="nav nav-tabs">
              <li className="nav-item">
                  <Link href='/profile' className='px-3'>My Recipe</Link>
              </li>
              <li className="nav-item">
                  <Link href='/savedRecipe' className='px-3'>Saved Recipe</Link>
              </li>
              <li className="nav-item">
                  <Link href='/likedRecipe' className='px-3'>Liked Recipe</Link>
              </li>
          </ul>
        </div>
        <hr />
        <div className='container'>
          <div className='row d-flex justify-content-start '>
            {recipe.map((p) => (
              <>
                <div className='col-6 col-lg-2 mx-lg-3 mb-3' key={p.id}>
                  {/* <CardProfile src={p.photo}/> */}
                 <img src={p.photo} alt='insert gambar' width={200} height={200} className='image-fluid' />
                  <button className='btn btn-danger me-3' onClick={()=> handleDelete(p.id)}>Delete</button>
                  <Link href={`/recipe/${p.id}`}><button className='btn btn-warning text-white'>View</button></Link>
                </div>
              </>
            ))}
          </div>
        </div>
      </>
      <FotterP />
    </div>
    </div>
  )
}







