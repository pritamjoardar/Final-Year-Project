import axios from 'axios';
import React, { useContext } from 'react'
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
import UserContext from '@/context/UserContext';

const UserDetails = () => {
  const { user, setUser } = useContext(UserContext)
  const router = useRouter();
  const Logout = async (e: any) => {
    e.preventDefault();
    try {
      await axios.get('../../api/users/logout')
        .then((response) => {
          toast.success(response.data.message);
          setUser(false);
          router.push('/login');
        })
        .catch((err) => {
          console.log(err);
        })
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className='p-2 absolute right-0'>
        <span onClick={Logout} className={user ? 'cursor-pointer w-min border-myColor border flex items-center' : 'hidden'}><p><RiLogoutBoxRLine /></p><p>Logout</p></span>
      </section>
      <Toaster richColors />
    </>
  )
}

export default UserDetails
