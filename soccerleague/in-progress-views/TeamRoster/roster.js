const rosterTableKey= 'roster-table';

let clearBtn= document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
   localStorage.removeItem(rosterTableKey); 
});

let rosterTable;
let rosterTableTest = {
   'Barbara': {
        'lastName': 'Kavanaugh',
        'email': 'bjkavanaugh@loyola.edu',
        'teamName': 'Lions'
   },

   'Jane': {
        'lastName': 'Doe',
        'email': 'janedoe@gmail.com',
        'teamName': 'Greyhounds'
   } 
};

let enableDisableFirstNameInput= (settings) => {
    let newPlayerFirstName= document.getElementById('newPlayerFirstName');

    if (settings=== 'enable')
        newPlayerFirstName.disabled= false;
    else if (settings=== 'disable')
        newPlayerFirstName.disabled= true;
}

let refreshRoster= () => {
     let rosterTableKeys= Object.keys(rosterTable); 
     let rosterContainer= document.getElementById('rosterTableContainer');
     let oldRosterBody= document.getElementById('roster-body');
     rosterContainer.removeChild(oldRosterBody);
     let newRosterBody= document.createElement('span');
     newRosterBody.id= 'roster-body'; 
     rosterContainer.appendChild(newRosterBody);

     for (let i=0; i< rosterTableKeys.length; i++)
     {
        let currentRow= document.createElement('div'); 
        let currentFirstNameCol= document.createElement('div');
        let currentLastNameCol= document.createElement('div');
        let currentEmailCol= document.createElement('div');
        let currentTeamNameCol= document.createElement('div');
        let currentEditBtn= document.createElement('div');
        let currentDeleteButton= document.createElement('div');

        currentRow.className= 'roster-table-row';
        currentFirstNameCol.className= 'roster-table-column roster-first-name';
        currentLastNameCol.className= 'roster-table-column roster-last-name';
        currentEmailCol.className= 'roster-table-column roster-email';
        currentTeamNameCol.className= 'roster-table-column roster-team-name';
        currentEditBtn.className= 'roster-table-column roster-edit';
        currentDeleteButton.className= 'roster-table-column roster-delete';

        currentFirstNameCol.innerHTML= rosterTableKeys[i];
        currentLastNameCol.innerHTML= rosterTable[rosterTableKeys[i]].lastName;
        currentEmailCol.innerHTML= rosterTable[rosterTableKeys[i]].email;
        currentTeamNameCol.innerHTML= rosterTable[rosterTableKeys[i]].teamName;

        currentDeleteButton.innerHTML= '<i class="fa-solid fa-trash-can"></i>';
        currentEditBtn.innerHTML= '<i class="fa-solid fa-user-pen"></i>';

        currentRow.appendChild(currentFirstNameCol);
        currentRow.appendChild(currentLastNameCol);
        currentRow.appendChild(currentEmailCol);
        currentRow.appendChild(currentTeamNameCol);
        currentRow.appendChild(currentEditBtn);
        currentRow.appendChild(currentDeleteButton);
        newRosterBody.appendChild(currentRow);
     }

     let enableDisableNewPlayerModal= (settings) => {
        let newPlayerFirstName= document.getElementById('newPlayerFirstName');
        let newPlayerLastName= document.getElementById('newPlayerLastName');
        let newPlayerEmail= document.getElementById('newPlayerEmail');
        let newPlayerTeamName= document.getElementById('newPlayerTeamName');

        newPlayerFirstName.value= '';
        newPlayerLastName.value= '';
        newPlayerEmail.value= '';
        newPlayerTeamName.value= '';

        let newPlayerModal= document.getElementById('newPlayerModal');
        let backdrop= document.getElementById('backdrop');

        newPlayerModal.className= `${settings}-modal`;
        backdrop.className= `${settings}-modal`;
     }

     let addNewPlayerBtn= document.getElementById('rosterAddNewPlayer');
     let editButtons= document.getElementsByClassName('roster-edit');
     let deleteButtons= document.getElementsByClassName('roster-delete');

     let newPlayerSubmitBtn= document.getElementById('newPlayerSubmitBtn');
     let newPlayerCancelBtn= document.getElementById('newPlayerCancelBtn');

     newPlayerSubmitBtn.addEventListener('click', () => {
        let newPlayerFirstName= document.getElementById('newPlayerFirstName').value.trim();
        let newPlayerLastName= document.getElementById('newPlayerLastName').value.trim();
        let newPlayerEmail= document.getElementById('newPlayerEmail').value.trim();
        let newPlayerTeamName= document.getElementById('newPlayerTeamName').value.trim();

        if (newPlayerFirstName=== '')
            document.getElementById('newPlayerFirstName').className= 'input-error';
        else
            document.getElementById('newPlayerFirstName').className= '';
        
        if (newPlayerLastName=== '')
            document.getElementById('newPlayerLastName').className= 'input-error';
        else
            document.getElementById('newPlayerLastName').className= '';

        if (newPlayerEmail=== '')
            document.getElementById('newPlayerEmail').className= 'input-error';
        else
            document.getElementById('newPlayerEmail').className= '';
        
        if (newPlayerTeamName=== '')
            document.getElementById('newPlayerTeamName').className= 'input-error';
        else
            document.getElementById('newPlayerTeamName').className= '';

        if (newPlayerFirstName!== '' && newPlayerLastName!== ''  && newPlayerEmail!== '' && newPlayerTeam!== '')
        {
            let newPlayer= {};
            rosterTable[newPlayerFirstName]= {
                'lastName': newPlayerLastName,
                'email': newPlayerEmail,
                'teamName': newPlayerTeamName
            }
            
            localStorage.setItem(rosterTableKey, JSON.stringify(rosterTable));
            enableDisableNewPlayerModal('disable');
            refreshRoster();
        }
     });

     newPlayerCancelBtn.addEventListener('click', () => {
        enableDisableNewPlayerModal('disable');
     });

     addNewPlayerBtn.addEventListener('click', () => {
        enableDisableNewPlayerModal('enable');
     });

     for (let i=0; i<editButtons.length; i++)
     {
        editButtons[i].addEventListener('click', ($event) => {
            let firstNameToEdit= $event.target.parentElement.children[0].innerText;
            let playerToEdit= rosterTable[firstNameToEdit];
            let newPlayerFirstName= document.getElementById('newPlayerFirstName');
            let newPlayerLastName= document.getElementById('newPlayerLastName');
            let newPlayerEmail= document.getElementById('newPlayerEmail');
            let newPlayerTeamName= document.getElementById('newPlayerTeamName');
            enableDisableNewPlayerModal('enable');

            newPlayerFirstName.value= firstNameToEdit;
            newPlayerLastName.value= playerToEdit.lastName;
            newPlayerEmail.value= playerToEdit.email;
            newPlayerTeamName.value= playerToEdit.teamName;
            enableDisableFirstNameInput('disable');
        })
     }

     for (let i=0; i< deleteButtons.length; i++)
     {
        deleteButtons[i].addEventListener('click', ($event) => {
            let firstNameToDelete= $event.target.parentElement.children[0].innerText;
            let areYouSure= window.confirm('Are you sure you want to delete '+ firstNameToDelete+ '?');

            if (areYouSure)
                deletePlayerFromRoster(firstNameToDelete);
        })
     }
}

let deletePlayerFromRoster= (firstName) => {
    let tempRoster= {};
    let rosterTableKeys= Object.keys(rosterTable);

    for (let i=0; i<rosterTableKeys.length; i++)
    {
        if (firstName!== rosterTableKeys[i])
            tempRoster[rosterTableKeys[i]]= rosterTable[rosterTableKeys[i]];
    }
    rosterTable= tempRoster;
    localStorage.setItem(rosterTableKey, JSON.stringify(rosterTable));
    refreshRoster();
}

let inRoster= () => {
    if (localStorage.getItem(rosterTableKey))
        rosterTable= JSON.parse(localStorage.getItem(rosterTableKey));
    else
    {
        rosterTable= rosterTableTest;
        localStorage.setItem(rosterTableKey, JSON.stringify(rosterTable));
    }
    refreshRoster();
}
