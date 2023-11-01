import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import { exerciseOption, fetchData, youtubeOptions } from '../utils/fetchData'
import ExerciseVideos from '../components/ExerciseVideos'
import SimilarExercises from '../components/SimilarExercises'
import Detail from '../components/Detail'


const ExerciseDetail = () => {

  const [exerciseDetail, setExerciseDetail] = useState({})
  const [exerciseVideos, setExerciseVideos] = useState([])
const [targetMuscleExercises, setTargetMuscleExercises] = useState([])
const [equipmentExercises, setEquipmentExercises] = useState([])
  const {id} = useParams()

useEffect(() => {
const fetchExcercisesData = async ( )=> {
const exerciseDbUrl= 'https://execisecb.p.rapidapi.com'
const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com'

const exerciseDetailData= await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`,
exerciseOption)
setExerciseDetail(exerciseDetailData)

const ExerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions)
setExerciseVideos(ExerciseVideosData.contents)

const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOption)
setTargetMuscleExercises(targetMuscleExercisesData);

const equimentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOption);
setEquipmentExercises(equimentExercisesData);
}
fetchExcercisesData()

},[id])


  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail}/>
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name}/>
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises}/>
    </Box>
  )
}

export default ExerciseDetail