const rosterTableKey= 'roster-table';

let clearBtn= document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
   localStorage.removeItem(rosterTableKey); 
});

let rosterTable;
let rosterTableTest = {
   'Barbara': {
        'last-name': 'Kavanaugh',
        'email': 'bjkavanaugh@loyola.edu',
        'team-name': 'Lions'
   },

   'Jane': {
        'last-name': 'Doe',
        'email': 'janedoe@gmail.com',
        'team-name': 'Greyhounds'
   } 
};

let refreshRoster= () => {
     let rosterTableKeys= Object.keys(rosterTable); 
     let rosterContainer= document.getElementById('rosterTableContainer');
     let oldRosterBody= document.getElementById('roster-body');
     rosterContainer.removeChild(oldRosterBody);

     let newRosterBody= document.createElement('span');
     newRosterBody.id= 'roster-body'; 

     for (let i=0; i< rosterTableKeys.length; i++)
     {
        let currentRow= document.createElement('div'); 
        let currentFirstNameCol= document.createElement('div');
        let currentLastNameCol= document.createElement('div');
        let currentEmailCol= document.createElement('div');
        let currentTeamNameCol= document.createElement('div');
        let currentEditBtn= document.createElement('div');
        let currentDelButton= document.createElement('div');

        currentRow.className= 'roster-table-row';
        currentFirstNameCol.className= 'roster-table-column roster-first-name';
        currentLastNameCol.className= 'roster-table-column roster-last-name';
        currentEmailCol.className= 'roster-table-column roster-email';
        currentTeamNameCol.className= 'roster-table-column roster-team-name';
        currentEditBtn.className= 'roster-table-column roster-edit';
        currentDelButton.className= 'roster-table-column roster-delete';

        currentFirstNameCol.innerHTML= rosterTableKeys[i];
        currentLastNameCol.innerHTML= rosterTable[rosterTableKeys[i]].lastName;
        currentEmailCol.innerHTML= rosterTable[rosterTableKeys[i]].email;
        currentTeamNameCol.innerHTML= rosterTable[rosterTableKeys[i]].teamName;

        currentDelButton.innerHTML= '<i class="fa-solid fa-trash-can"></i>';
        currentEditBtn.innerHTML= '<i class="fa-solid fa-user-pen"></i>';

     }
}
