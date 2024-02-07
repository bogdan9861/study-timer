import React, { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addHourses, addMinutes } from '../slices/ClockSlice'

import AddZero from '../utils/AddZero'

const Clock = () => {
  const { hourses, minutes } = useSelector(state => state.clock);
  const { ended } = useSelector(state => state.main);


  const [localHourses, setLocalHourses] = useState(0);
  const [localMinutes, setLocalMinutes] = useState(0);

  const dispatch = useDispatch();

  const updateClock = () => {
    setLocalHourses(new Date().getHours());
    setLocalMinutes(new Date().getMinutes());
  }

  const dispatchTime = () => {
    dispatch(addHourses(localHourses));
    dispatch(addMinutes(localMinutes));
  }

  useEffect(() => {
    updateClock();

    const interval = setInterval(() => {
      updateClock();

      if (Number(hourses) != localHourses || Number(minutes) != localMinutes) {
        dispatchTime();
      }

    }, 1000)

    return () => {
      clearInterval(interval)
    }

  }, [localHourses, localMinutes, hourses, minutes])

  return (
    <View>
      {
        ended ?
        <Text style={styles.clock_text}>
          {AddZero(hourses)}:{AddZero(minutes)}
        </Text>
        : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  clock_text: {
    fontSize: 70,
    fontWeight: '800',
    textAlign: 'center',
  }
})

export default Clock