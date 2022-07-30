import {combineReducers } from 'redux';
import fieldsReducer from "./OwnerFields/fieldsReducer"
import gamesReducer from "./Games/gameReducer"
import suppliesReducer from "./OwnerSupplies/suppliesReducer"
import playerLoginReducer from './PlayerLogin/PlayerLoginReducer';
import GamesIncompleteReducer from "./GamesIncomplete/gamesIncompleteReducer"
import getFieldsR from './DetailField/DetailField-reducer';
import games from './Games/gamesReducer'
import getPlayersReducer from './Players/GetPlayersReducer'
import complexReducer from './Complexes/ComplexReducer';
import getTournamentReducer from './Tournament/tournamentReducer';
import teamsReducer from './Teams/teamsReducer'


export const reducers = combineReducers({
    fieldsReducer:fieldsReducer,
    gamesReducer: gamesReducer,
    playerLoginReducer: playerLoginReducer,
    GamesIncompleteReducer: GamesIncompleteReducer,
    getFieldsR: getFieldsR,
    games: games,
    getPlayersReducer: getPlayersReducer,
    complexReducer: complexReducer,
    suppliesReducer:suppliesReducer,
    getTournamentReducer: getTournamentReducer,
    teamsReducer:teamsReducer,

    
})

export default reducers;
 