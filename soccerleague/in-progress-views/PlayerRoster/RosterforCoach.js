var players= new Object();

function addPlayertoRoster()
{
    var addedPlayer= 0;
    for (player in players)
        ++addedPlayer;
    if (document.forms[0].items[12].value== "" || document.forms[0].items[13].value== "")
        window.alert("Player's first and last name must be entered.");

    else
    {
        players["contact"+addedPlayer]= new Player();
        players["contact"+addedPlayer].firstName= document.forms[0].items[12].value;
        players["contact"+addedPlayer].lastName= document.forms[0].items[13].value;
        players["contact"+addedPlayer].email= document.forms[0].items[14].value;
        players["contact"+addedPlayer].parentFirst= document.forms[0].items[15].value;
        players["contact"+addedPlayer].parentLast= document.forms[0].items[16].value;
        players["contact"+addedPlayer].parentEmail= document.forms[0].items[17].value;

        if (document.forms[0].items[18].checked== true)
            players["contact"+addedPlayer].permission= true;  // Coach needs permission to register player from parent/guardian
        else
            players["contact"+addedPlayer].permission= false;
        
        var playerContact= new Option();
        playerContact.value= players["contact"+addedPlayer].firstName+"  "+players["contact"+addedPlayer].lastName;

        document.forms[0].players.options[addedPlayer]= playerContact;

    }
}


function updatePlayerInfo(curIndex)
{
    this.firstName= document.forms[0].items[12].value;
    this.lastName= document.forms[0].items[13].value;
    this.email= document.forms[0].items[14].value;
    this.parentFirst= document.forms[0].items[15].value;
    this.parentLast= document.forms[0].items[16].value;
    this.parentEmail= document.forms[0].items[17].value;

    if (document.forms[0].items[18].checked== true)
        this.permission= true;
    else
        this.permission= false;
    
    document.forms[0].players.options[curIndex].text= this.firstName+" "+this.lastName;
    window.alert("Player Information successfully updated.");
    
}
