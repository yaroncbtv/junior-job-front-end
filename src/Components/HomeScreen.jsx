/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import {
  Link
} from "react-router-dom";
import {
  useRecoilState,
} from 'recoil';
import { State } from '../State/State';
import  About  from './About';
import  Modal  from './Modal';
import { useHistory } from "react-router-dom";
import Loading from 'react-fullscreen-loading';

// const navigation = [
//   { name: 'Click Me To Go All Jobs', href: '/jobs' },
//   // { name: 'Features', href: 'https://www.google.com/' },
//   // { name: 'Marketplace', href: 'https://www.google.com/' },
//   // { name: 'Company', href: 'https://www.google.com/' },
// ]





export default function HomeScreen() {
//test
  const [userInfo] = useRecoilState(State.userInfo);
  const [modal, setModal] = useRecoilState(State.modal);
  let history = useHistory();


  let login = false;
  if (localStorage.getItem("token")) {
    login = true;
  }else{
    login = false;
  }

  const onClickLogout = () => {
    setModal(true);
    // logout();
    // window.location = "/";
  }

  const getStarted = () => {
    history.push("/jobs");

  }
  return (
    <div>
    <div  className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          
        <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          <Popover>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <div >
                      <span className="sr-only">Workflow</span>
                      <img
                        className="h-8 w-auto sm:h-10"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt= "img"
                      />
                    </div>
                    <div className="-mr-2 flex items-center md:hidden">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Open main menu</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className={`hidden md:block md:ml-10 md:pr-4 ${login ? "md:space-x-4" : "md:space-x-8"}`}>

                  <span className="font-medium text-indigo-600 hover:text-indigo-500">
                    {login ? <Link onClick={onClickLogout} to="/">LogOut</Link> : <Link to="/login">Login</Link>}
                  </span>
                  <span className="font-medium text-indigo-600 hover:text-indigo-500">
                    {login ? null : <Link to="/signup">SignUp</Link>}
                  </span>

           
                    <>
                    <Link 
                   
                    className="font-medium text-gray-500 hover:text-gray-900"
                    to={login ? "/jobs" : null}
                    >{login ? 'Click Me To Go All Jobs' : null}</Link>
                    </>
                  

                </div>
              </nav>
            </div>

            <Transition
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="img"
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close main menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    
                    
                  <span className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100">
                    {login ? <Link onClick={onClickLogout} to="/">LogOut</Link> : <Link to="/login">Login</Link>}
                  </span>
                  {
                    login ?
                    null
                    :
                    <span className={"block w-full px-5 py-3 text-center font-medium" + (login ? "" : "text-indigo-600 bg-gray-50 hover:bg-gray-100")}>
                    {login ? null : <Link to="/signup">SignUp</Link>}
                  </span>
                  }
                  
                  
               
                      <>
                      <span  className={login ? "block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100" : null}> 
                      <Link 
                      to={login ? "/jobs" : null}
                      >{login ? "Click Me To Go All Jobs" : null}</Link>
                      </span>
                      </>
                    
                  </div>

                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
                 
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
            <div className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-7xl">
            <div className="block xl:inline">{`Hello <Junior>\n`}</div> 
            </div> 
              <div className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-7xl">
                {/* <span className="block xl:inline">{userInfo ? "Hello " + "<" + userInfo.name + ">": "Hello " + "<Junior>"}</span>{' '} */}
                
                <div className="block text-indigo-600 xl:inline">Welcome To Your Next Job!</div>
              </div>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua.
              </p>
              {
                login ? 
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div onClick={getStarted} className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    Live demo
                  </button>
                </div>
              </div>
                :
                null
              }
             
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt="img"
        />
      </div>
    </div>
    
    <div className="others">
         <About/>
          {/* <Charts/> */}
          
    </div>
    {modal ? <Modal/> : null}

    </div>
  )

}


