'use client'
import styles from './AddActivity.module.css'
import { useState, useEffect } from 'react'
import Script from 'next/script'

// import fonts to use them for menu items 
import { lexend } from '../app/fonts';

const AddActivity = () => {
  const [activityName, setActivityName] = useState('')
  const [activityPicture, setActivityPicture] = useState('')
  const [activityURL, setActivityURL] = useState('')
  const [activityDate, setActivityDate] = useState('')
  const [activityBudget, setActivityBudget] = useState('')
  const [activityBudgetPerPerson, setActivityBudgetPerPerson] = useState('')
  const [activityLocation, setActivityLocation] = useState('')
  const [activityDescription, setActivityDescription] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() // prevents auto-refreshing of the page when submitting the form

    const tripId = '65e7215ad02a86c957eb2e71'

    const activityData = {
      name: activityName,
      picture: activityPicture,
      url: activityURL,
      date: activityDate,
      budget: activityBudget,
      location: activityLocation,
      description: activityDescription,
      tripId: tripId
    }

    fetch('http://localhost:5500/activities/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activityData)
    })
      .then(response => response.json())
      .then(data => {
        if (!data) {
          // setError(data.error)
          console.log('Erreur')
          return
        }
        console.log('New activity added', data.newActivity)
        alert('Votre activité a bien été ajoutée à votre groupe !')
        setActivityName('')
        setActivityPicture('')
        setActivityURL('')
        setActivityBudget('')
        setActivityDate('')
        setActivityLocation('')
        setActivityDescription('')
        setError('')
      })
  }

  return (
    <div className={styles.newActivity}>
      <h1 className={lexend.className}>Une activité à proposer ? </h1>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <div className={styles.layout}>
          <div className={styles.top}>
            <div>
              <label htmlFor="activity-picture" className={styles.label}>Photo</label>
              <input
                type="file"
                id="activity-picture"
                value={activityPicture}
                onChange={(e) => setActivityPicture(e.target.value)}
              />
            </div>
            <div className={styles.rightSide}>
              <div className={styles.inputs}>
                <label htmlFor="activity-name" className={styles.label}>Nom de l'activité</label>
                <input
                  type="text"
                  id="activity-name"
                  className={styles.input}
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  placeholder="Un petit nom pour l'activité ?"
                  required
                />
              </div>
              <div className={styles.inputs}>
                <label htmlFor="activity-url" className={styles.label}>Url vers l'activité</label>
                <input
                  type="text"
                  id="activity-url"
                  className={styles.input}
                  value={activityURL}
                  onChange={(e) => setActivityURL(e.target.value)}
                  placeholder="Avec un lien c'est encore mieux !"
                />
              </div>
            </div>
          </div>
          <div className={styles.middle}>
            <div className={styles.inputDate}>
              <label htmlFor="activity-date" className={styles.label}>Sélectionnez la date:</label>
              <input
                type="date"
                id="activity-date"
                className={styles.input}
                value={activityDate}
                onChange={(e) => setActivityDate(e.target.value)}
                required
              />
            </div>
            <div className={`${styles.inputsBudgetContainer} ${styles.rightSide}`}>
              <div className={styles.inputsBudget}>
                <label htmlFor="activity-budget" className={styles.label}>Budget:</label>
                <input
                  type="number"
                  id="activity-budget"
                  className={styles.input}
                  value={activityBudget}
                  onChange={(e) => setActivityBudget(e.target.value)}
                  placeholder='€'
                />
              </div>
              <div className={styles.inputsBudget}>
                <label htmlFor="activity-budget-single" className={styles.label}>Budget par personne:</label>
                <input
                  type="number"
                  id="activity-budget-single"
                  className={styles.input}
                  value={activityBudgetPerPerson}
                  onChange={(e) => setActivityBudgetPerPerson(e.target.value)}
                  placeholder='€'
                />
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div>
              <label htmlFor="activity-location" className={styles.label}>Localisation</label>
              <input
                type="text"
                id="activity-location"
                value={activityLocation}
                onChange={(e) => setActivityLocation(e.target.value)}
                placeholder='Il se situe où ce logement ?'
              />
            </div>
            <div className={styles.rightSide}>
              <div className={styles.inputs}>
                <label htmlFor="activity-description" className={styles.label}>Description de l'activité</label>
                <textarea
                  id="activity-description"
                  className={styles.textarea}
                  value={activityDescription}
                  onChange={(e) => setActivityDescription(e.target.value)}
                  placeholder="Que dire d'autre ?"
                />
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            {error}
            <button type="submit" className={styles.button}>Soumettre</button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default AddActivity
