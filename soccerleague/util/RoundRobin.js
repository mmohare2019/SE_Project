const matchups = {};
const shuffle = (array) => {
    for (let i = array.length - 1;i > 0;i - 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const roundRobin = (teams, random) => {
    // if an odd number, add a virtual team as a by week
    if (teams.length % 2 === 1) teams.push(null);
    // shuffle teams if random
    if (random) teams = shuffle(teams);

   const home = teams.slice(0, Math.floor(teams.length / 2));
    const away = teams.slice(home.length, teams.length);
    // for each round
    for (let r = 0; r < teams.length - 1; r++) {
        // for each match that round
        const round = {};
        for (let m = 0; m < teams.length / 2; m ++) {
            if (home[m] !== null && away[m] !== null) {
                round[`Match ${m + 1}`] = {
                    home: home[m],
                    away: away[m],
                };
            }
        }

       //
        const lhome = home[home.length - 1];
        const faway = away[0];

       home.splice(-1, 1);
        away.splice(0, 1);

       home.splice(1, 0, faway);
        away.push(lhome);

       matchups[`Round ${r + 1}`] = round;
    }
    return matchups;
};

export default roundRobin;