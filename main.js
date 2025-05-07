/*
Nota: a differenza di quanto visto finora negli esempi, per accedere all'API utilizzare utilizzare l'url base:
https://boolean-spec-frontend.vercel.app/freetestapi => (per ora questo http://localhost:5001/)

Ad esempio:
https://boolean-spec-frontend.vercel.app/freetestapi/users => http://localhost:5001/users
per chiamare l'endpoint /users

In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:
Nome completo della città e paese da  /destinations?search=[query]
(result.name, result.country, nelle nuove proprietà city e country).
Il meteo attuale da /weathers?search={query}
(result.temperature e result.weather_description nella nuove proprietà temperature e weather).
Il nome dell'aeroporto principale da /airports?search={query}
(result.name nella nuova proprietà airport).

Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.
Attenzione: le chiamate sono delle ricerche e ritornano un'array ciascuna, di cui devi prendere il primo risultato (il primo elemento).

Note del docente
Scrivi la funzione getDashboardData(query), che deve:
- Essere asincrona (async).
- Utilizzare Promise.all() per eseguire più richieste in parallelo.
- Restituire una Promise che risolve un oggetto contenente i dati aggregati.
- Stampare i dati in console in un messaggio ben formattato.

Testa la funzione con la query "london"

🎯 Bonus 1 - Risultato vuoto
Se l'array di ricerca è vuoto, invece di far fallire l'intera funzione, semplicemente i dati relativi a quella chiamata verranno settati a null e la frase relativa non viene stampata.
Testa la funzione con la query "vienna" (non trova il meteo).

🎯 Bonus 2 - Chiamate fallite
Attualmente, se una delle chiamate fallisce, Promise.all() rigetta l'intera operazione.
Modifica getDashboardData() per usare Promise.allSettled(), in modo che:
- Se una chiamata fallisce, i dati relativi a quella chiamata verranno settati a null.
- Stampa in console un messaggio di errore per ogni richiesta fallita.
*/


//!fetch support POTREBBE ANDARE IN CONFLITTO CON IL PROMISE.ALL
// async function fetchData(url) {
//     const res = await fetch(url);
//     const data = await res.json()
//     return data
// }

const BASE_URL = 'http://localhost:5001/';

async function getDashboardData(query) {
    try {
        let obj = {}
        const [resDestination, resAirport, resWeather] =
            await Promise.all([
                fetch(`${BASE_URL}destinations?search=${query}`).then(res => res.json()),
                fetch(`${BASE_URL}airports?search=${query}`).then(res => res.json()),
                fetch(`${BASE_URL}weathers?search=${query}`).then(res => res.json()),
            ])
        return obj = {
            city: resDestination[0].name,
            country: resDestination[0].country,
            temperature: resWeather[0].temperature,
            weather: resWeather[0].weather_description,
            airport: resAirport[0].name
        }

    } catch (error) {
        console.error(error.message)
    }

}

// Test di funzione
getDashboardData('london')
    .then(data => {
        console.log('Dashboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));