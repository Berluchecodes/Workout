import React, {useEffect,  useState} from 'react'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { exerciseOption, fetchData } from '../utils/fetchData'
import HorizontalScrollBar from './HorizontalScrollBar'


const SearchExercises = ({setExercises, bodyPart, setBodyPart}) => {
const [search, setSearch] = useState('')
const [bodyParts, setBodyParts] = useState([])

useEffect(() => {
const fetchExcercisesData = async () => {
    const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOption)

    if (Array.isArray(bodyPartsData)) {
        setBodyParts(['all', ...bodyPartsData]);
      }
}

fetchExcercisesData()
},[])

const handleSearch = async () => {
  if(search) {
    const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=1327', exerciseOption)


  

  
    const searchedExercises = exercisesData.filter((exercise) => {
        const name = exercise.name || '';
        const target = exercise.target || '';
        const equipment = exercise.equipment || '';
        const bodypart = exercise.bodypart || '';
  
        return (
          name.toLowerCase().includes(search) ||
          target.toLowerCase().includes(search) ||
          equipment.toLowerCase().includes(search) ||
          bodypart.toLowerCase().includes(search)
        );
      });

      

    setSearch('')
    setExercises(searchedExercises)
  }
}

  return (
    <Stack alignItems='center' mt='37px' justifyContent='center' p='20px'>
        <Typography fontWeight={700} sx={{
            fontSize:{lg: '44px', xs:'30px'}}}
            mb='50px' textAlign='center'>
            Awesome Exercises You <br/> Should Know
        </Typography>
        <Box position='relative' mb='72px'>
            <TextField 
            sx={{input:{fontWeight:'700', border:'none', borderRadius:'4px'}, width:{lg:'800px', xs:'350px'},
            backgroundColor:'#fff', borderRadius: '40px'
        }}
            height='76px' value={search} onChange={(e)=>setSearch(e.target.value.toLowerCase())}
            placeholder='Search Exercises' type='text'
            />
        <Button className='search-btn' sx={{bgcolor:'#ff2625', color:'#fff', textTransform: 'none',
            width:{lg:'175px', xs:'80px'}, fontSize: {lg:'20px', xs:'14px'},
            height:'56px', position:'absolute', right:'0'
        }}
        onClick={handleSearch}
        >
            Search
        </Button>
        </Box>
        <Box sx={{position:'relative', width:'100%', p:'20px'}}>
            <HorizontalScrollBar data={bodyParts} setBodyPart={setBodyPart} bodyPart={bodyPart} bodyParts/>
        </Box>
    </Stack>
  )
}

export default SearchExercises