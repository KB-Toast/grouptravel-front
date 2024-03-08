'use client'
// Need "use client" because we're using a hook 'usePathname'
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faLaptop, faBed, faTableTennisPaddleBall, faCalendar, faMessage, faPlane, faUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from 'next/navigation'

import { useState } from 'react';

import { Modal, Popover } from 'antd';
// import fonts to use them for menu items 
import { lexend } from '../app/fonts';

import styles from './header.module.css';
import SignIn from '@/components/SignIn';
import SignUp from "./SignUp";

import { useDispatch, useSelector } from 'react-redux';
import { removeUserToStore, updateCurrentTrip } from "@/reducers/user";

export default function Header() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    // This will help us figure out what's the active link currently is, and add an "active" class to it
    const pathname = usePathname();


    /* Icons used from front awesome */
    const iconHouse = {
        name: faHouse,
    };
    const iconLaptop = {
        name: faLaptop,
    };
    const iconBed = {
        name: faBed,
    }
    const iconTableTennisPaddleBall = {
        name: faTableTennisPaddleBall,
    };
    const iconCalendar = {
        name: faCalendar,
    };
    const iconMessage = {
        name: faMessage,
    };
    const iconPlane = {
        name: faPlane,
    };
    const iconUser = {
        name: faUser,
    };
    const iconArrow = {
        name: faArrowRightFromBracket
    };

        // Popover 
        // action to change currentTrips from popover
        const handleCurrentTrip = (data) => {
            // console.log(data)
            dispatch(updateCurrentTrip(data)); // Dispatch in Redux
            // router.push('/dashboard') // refresh or routing to Dashboard
        }
        
        //map on all myTrip to put name in popover
        
            
        const voyageNamePopover = user.myTrips && user.myTrips.length > 0 && user.myTrips.filter(e => e !== user.currentTrip).map((data, i) => {
        return (
            <div key={i} className={styles.voyageNameContainer}>
            <span className="voyageName" onClick={() => handleCurrentTrip(data)}>{data.name}</span>
            </div>
        );
        });
      
       const popoverContent = (
        <div className={styles.popoverContent}>
            {voyageNamePopover}
        </div>
        );
        
    
    
   

    /* modal logic */

      const displayModal = () => {
        setIsModalOpen(true);
      };

      const handleOk = () => {
        setIsModalOpen(false);
      };

      const handleCancel = () => {
        setIsModalOpen(false);
      };

      //Logout
      const handleLogout = () => {
        dispatch(removeUserToStore())
        router.push('/');
      };

      const handleProfile = () => {
        router.push('/profile');
      }


    return <header className={`${styles.header} ${lexend.className}`}>
        <div className={styles.headerLeft}>
            <FontAwesomeIcon icon={iconHouse.name} className={styles.headerIcon} />
            <Link className={styles[`${pathname === '/' ? 'active' : 'link'}`]} href="/"> Accueil </Link>
            <FontAwesomeIcon icon={iconLaptop.name} className={styles.headerIcon} />
            <Link className={styles[`${pathname === '/dashboard' ? 'active' : 'link'}`]} href="/dashboard"> Dashboard </Link>
            <FontAwesomeIcon icon={iconBed.name} className={styles.headerIcon} />
            <Link className={styles[`${(pathname === '/accomodation' || pathname === '/accomodation/add') ? 'active' : 'link'}`]} href="/accomodation"> Hébergement </Link>
            <FontAwesomeIcon icon={iconTableTennisPaddleBall.name} className={styles.headerIcon} />
            <Link className={styles[`${pathname === '/activities' ? 'active' : 'link'}`]} href="/activities"> Activités </Link>
            <FontAwesomeIcon icon={iconCalendar.name} className={styles.headerIcon} />
            <Link className={styles[`${pathname === '/planning' ? 'active' : 'link'}`]} href="/planning"> Planning </Link>
            <FontAwesomeIcon icon={iconMessage.name} className={styles.headerIcon} />
            <Link className={styles[`${pathname === '/chat' ? 'active' : 'link'}`]} href="/chat"> Messages </Link>
            {/* TO REMOVE */}
            <Link className={styles[`${pathname === '/chat' ? 'active' : 'link'}`]} href="/activities/add"> AddAccomodation </Link>
        </div>
        <div className={styles.headerRight}>
            <FontAwesomeIcon icon={iconPlane.name} className={styles.headerIcon} />
            <div className={styles.tripsContainer}>
            <Popover title="Mes autres voyages" content={popoverContent} className={styles.popover} trigger="hover">
                {!user.currentTrip && <p>Mes voyages</p>}
                {user.currentTrip && <p> {user.currentTrip.name}</p>}
            </Popover>
            </div>
            <FontAwesomeIcon icon={iconUser.name} className={styles.headerIcon} />
            <div>
                {!user.token && <button onClick={() => displayModal('login')} className={`${styles.link} ${styles.buttonHeader}`}> Connexion </button>}
                {user.token && <button onClick={handleProfile} className={`${styles.link} ${styles.buttonHeader}`}> Profil </button>}
            </div>

            {user.token && (<>
            <FontAwesomeIcon icon={iconArrow.name} className={styles.headerIcon} onClick={handleLogout} />
            <div>
                <button onClick={handleLogout} className={`${styles.link} ${styles.buttonHeader}`}> Déconnexion </button>                
            </div>
            </>)}        
            {!user.token && <button onClick={() => displayModal('signup')} className={`${styles.link} ${styles.buttonHeader}`}> Inscription </button>}
        </div>   
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{ padding: 0 }}>
        <SignIn />
        <SignUp />
      </Modal>
    </header>
}