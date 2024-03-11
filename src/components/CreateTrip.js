'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import InputLabel from './InputLabel';
import styles from './creatTrip.module.css';
import {updateCurrentTrip, updateMyTrips} from '../reducers/user';
// import fonts to use them for menu items
import { lexend } from '../app/fonts';

export default function CreateTrip() {
    const user = useSelector((state) => state.user.value);
    const router = useRouter();
    const dispatch = useDispatch();

    const [groupName, setgroupName] = useState('');
    const [location, setLocation] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [errorMsg, setErrorMsg] = useState('')

    const token = user.token
    // const token = '7Az44VwjhOvapTcIHhyQH_IwYk04BDQG'
     

    const handleSubmit = () => {
        // Unbreakable form
        const locationToSend = location[0].toUpperCase()+ location.slice(1).toLowerCase()
        const nameToSend = groupName[0].toUpperCase()+ groupName.slice(1).toLowerCase()
        // fetch for add new trip in DDB
        fetch('http://localhost:5500/trips/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nameToSend, location : locationToSend, departureDate, returnDate, token: token }),
        }).then(response => response.json())
            .then(data => {
            // If data.error send error.msg to front
            if(data.error) {
                setErrorMsg(data.error)
            }
            else {
            // If no error > update reducer in redux
            console.log('data.newTrip', data.newTrip)
            dispatch(updateMyTrips(data.newTrip))
            dispatch(updateCurrentTrip(data.newTrip))
            // rerouting user to dashboard of new trip
            router.push('/dashboard')
            }
        });
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.logo} ${lexend.className}`}>GROUPTRAVEL</div>
            <h3 className={`${styles.title} ${lexend.className}`}>Planification de votre voyage entre amis !</h3>
                <div className={styles.inputTextContainer}>
                    <h4 className={styles.h4}>Défini le nom de ton groupe :</h4>
                    <InputLabel style={{width: "60%"}} type="text" onChange={(e) => setgroupName(e.target.value)} value={groupName} label="Nom du groupe" placeholder="Entre le nom de ton Groupe !" />
                </div>
                <div className={styles.inputTextContainer}>
                    <h4 className={styles.h4}>Précise la destination :</h4>
                    <InputLabel type="text" onChange={(e) => setLocation(e.target.value)} value={location} label="Destination" placeholder="Et votre destination !" />
                </div>
                <h4 className={styles.inputTextContainer}>Vous partez quand ?</h4>
            
            <div className={styles.dateContainers}>
                <div className={styles.dateRow}>  
                    <div className={styles.inputDateContainer}>
                        <h5 className={styles.textDate}>Date de départ :</h5>
                        <input className={styles.inputDate}
                            type="date"
                            id="departureDate"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputDateContainer}>
                        <h5 className={styles.textDate}>Date de retour :</h5>
                        <input className={styles.inputDate}
                            type="date"
                            id="returnDate"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                        />
                    </div>
                    
                </div>
                {/* only if error display error */}
                {errorMsg != '' && <h2 className={styles.error}>{errorMsg}</h2>}
                <button className={styles.button} onClick={() => handleSubmit()}>Go!</button>
            </div>
        </div>  
                
            
    )
}