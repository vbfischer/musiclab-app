import {EXERCISES_LOAD} from "../constants/actionTypes"
import agent from '../agent';

export function getExercises() {
    return {
        type: EXERCISES_LOAD,
        payload: agent.Exercises.getAll()
    }
}