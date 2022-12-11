import React, { useState } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'

import VideoCard from '../../components/VideoCard'
import NoResult from '../../components/NoResult'
import { IUser, Video } from '../../types'
import { BASE_URL } from '../../utils'
import useAuthStore from '../../store/authStore'

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccount] = useState(false)
  const account = isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
  const video = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
  const router = useRouter()
  const { searchTerm }: any = router.query
  const { allUsers } = useAuthStore();

  const searchAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase()
    .includes(searchTerm.toLowerCase()))

  return (
    <div className='w-full'>
      <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
        <p className={`text-xl font-semibold cursor-pointer mt-2 ${account}`}
          onClick={() => setIsAccount(true)}>
          Accounts
        </p>
        <p className={`text-xl font-semibold cursor-pointer mt-2 ${video}`}
          onClick={() => setIsAccount(false)}>
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className='md:mt-16'>
          {searchAccounts?.length > 0 ? (
            searchAccounts.map((user: IUser, i: number) => (
              <Link href={`/profile/${user._id}`} key={i}>
                <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                  <div>
                    <Image src={user.image} width={50} height={50}
                      className="rounded-full" alt='user profile' />
                  </div>
                  <div className='hidden xl:block'>
                    <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                      {user.userName.replaceAll(' ', '')}
                      <GoVerified className='text-blue-400' />
                    </p>
                    <p className='capitalize text-gray-400 text-xs'>
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResult text={`No accounts result for ${searchTerm}`} />
          )}

        </div>
      ) : (
        <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
          {videos?.length > 0 ? (
            videos.map((video, i) => (
              <VideoCard post={video} key={i} />
            ))
          ) : (
            <NoResult text={`No video result for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  )
}

export const getServerSideProps = async ({ params: { searchTerm } }: { params: { searchTerm: string } }) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

  return {
    props: { videos: res.data }
  }
}

export default Search
