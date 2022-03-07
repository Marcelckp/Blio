import axios from 'axios'
import Cookies from 'js-cookie'
import { GetServerSideProps } from 'next'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { GetStateFromSelectors } from 'reselect/es/types'
import { store } from '../redux/store'
import { InnerJoinPost } from '../Types'

interface Props {
  data: [InnerJoinPost]
}

export default function profile({ data }: Props) {
  const user = useSelector((state: any) => state.user.user)
  // console.log(data)
  useEffect(() => {
    if (!user) window.location.replace('/signin')
  })
  return (
    <div>
      <h1>Profile</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // console.log(req.cookies);

  let data: any = []
  try {
    data = await axios.post<Array<InnerJoinPost>>(
      `http://localhost:3000/api/post/read/specific`,
      { data: { cookie: req.cookies } }
    )
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      data: data!.data?.posts,
    },
  }
}
