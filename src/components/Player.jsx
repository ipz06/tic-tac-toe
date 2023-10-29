import {useState} from 'react';

const Player = ({initialName, symbol}) => {

    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    const handleClickEditing = () => {
        setIsEditing(prev => !prev);
    };

    const handleChange = (event) => {
        console.log(event);
        setPlayerName(event.target.value);
    };

    let editablePlayerName = <span className='player-name'>{playerName}</span>;
    let btnCaption = 'Edit';

    if (isEditing) {
        editablePlayerName = <input type='text' required value={playerName} onChange={handleChange}/>;
        btnCaption = 'Save'; 
    }

    

    return (
        <li>
            <span className='player'>
                {editablePlayerName}
              <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={handleClickEditing}>{btnCaption}</button>
          </li>
    )
};

export default Player;