let nav = 0;
let clicked = null;
let games = localStorage.getItem('games') ? JSON.parse(localStorage.getItem('games')) : [];

const calendar = document.getElementById('calendar');
const newGameModal = document.getElementById('newGameModal');
const deleteGameModal = document.getElementById('deleteGameModal');
const backDrop = document.getElementById('modalBackDrop');
const gameTitleInput = document.getElementById('gameTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) 
{
  clicked = date;

  const gameForDay = games.find(g => g.date === clicked);

  if (gameForDay) 
  {
    document.getElementById('gameText').innerText = gameForDay.title;
    deleteGameModal.style.display = 'block';
  } 
  
  else
    newGameModal.style.display = 'block';

  backDrop.style.display = 'block';
}

function loadSchedule() 
{
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const gameForDay = games.find(g => g.date === dayString);

      if (i - paddingDays === day && nav === 0)
        daySquare.id = 'currentDay';
      

      if (gameForDay) {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game');
        gameDiv.innerText = gameForDay.title;
        daySquare.appendChild(gameDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } 
    
    else
      daySquare.classList.add('padding');

    calendar.appendChild(daySquare);    
  }
}

function closeModal() {
  gameTitleInput.classList.remove('error');
  newGameModal.style.display = 'none';
  deleteGameModal.style.display = 'none';
  backDrop.style.display = 'none';
  gameTitleInput.value = '';
  clicked = null;
  loadSchedule();
}

function saveGame() {
  if (gameTitleInput.value) {
    gameTitleInput.classList.remove('error');

    games.push({
      date: clicked,
      title: gameTitleInput.value,
    });

    localStorage.setItem('games', JSON.stringify(games));
    closeModal();
  } 
  
  else
    gameTitleInput.classList.add('error');
}

function deleteGame() {
  games = games.filter(g => g.date !== clicked);
  localStorage.setItem('games', JSON.stringify(games));
  closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    loadSchedule();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    loadSchedule();
  });

  document.getElementById('saveButton').addEventListener('click', saveGame);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteGame);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
loadSchedule();
