import React, { useState } from 'react'
import { data } from '../constant/data'
import MealCard from '../components/MealCard'
import Typography from '../components/Typography'
import RButton from '../components/Rbutton'
import toast from 'react-hot-toast'
import colors from '../constant/color'
import '../App.css'

export default function FoodScreen() {
  const [showAvailable, setShowAvailable] = useState(true)
  const [selectedMeals, setSelectedMeals] = useState([])
  const [sortOrder, setSortOrder] = useState('low')


  let filteredMeals = showAvailable
    ? data.filter((m) => m.isAvailable)
    : data

 
  filteredMeals = [...filteredMeals].sort((a, b) =>
    sortOrder === 'low' ? a.price - b.price : b.price - a.price
  )


  const addMeal = (meal) => {
    const exists = selectedMeals.find((m) => m.id === meal.id)

    if (exists) {
      toast.error('Meal already added')
      return
    }

    setSelectedMeals([...selectedMeals, meal])
    toast.success('Meal added successfully')
  }

 
  const removeMeal = (id) => {
    setSelectedMeals(selectedMeals.filter((m) => m.id !== id))
    toast('Meal removed ')
  }

  const handleReset = () => {
    if (selectedMeals.length === 0) {
      toast.error('No meals to reset')
      return
    }

    setSelectedMeals([])
    toast.success('Selection cleared ')
  }

 
  const total = selectedMeals.reduce((sum, m) => sum + m.price, 0)

  const prices = selectedMeals.map((m) => m.price)
  const max = prices.length ? Math.max(...prices) : null
  const min = prices.length ? Math.min(...prices) : null

  return (
    <div style={{ background: colors.background, minHeight: '100vh', padding: '20px' }}>

      {/* HEADER */}
      <Typography variant='h1' weight='bold' align='center'>
         Home Chef Meals
      </Typography>

      <Typography align='center' color={colors.textSecondary}>
        Browse, filter and select your meals
      </Typography>

      {/* CONTROLS */}
      <div style={{ display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' }}>

        <RButton
          title={showAvailable ? 'Show All Meals' : 'Show Available Only'}
          onClick={() => setShowAvailable(!showAvailable)}
          variant='primary'
        />

        <RButton
          title={sortOrder === 'low' ? 'Sort: Low → High' : 'Sort: High → Low'}
          onClick={() =>
            setSortOrder(sortOrder === 'low' ? 'high' : 'low')
          }
          variant='outline'
        />

        <RButton
          title='Reset'
          onClick={handleReset}
          disabled={selectedMeals.length === 0}
          variant='danger'
        />
      </div>

      {/* MEALS */}
      <Typography variant='h2' weight='bold'>
        Meals
      </Typography>

      <div className='grid'>
        {filteredMeals.map((meal) => (
          <MealCard key={meal.id} meal={meal} onAdd={addMeal} />
        ))}
      </div>

      {/* SELECTED */}
      <div style={{ marginTop: '20px' }}>

        <Typography variant='h2' weight='bold'>
          🛒 Selected Meals
        </Typography>

        {selectedMeals.length === 0 ? (
          <Typography color={colors.textSecondary}>
            No meals selected yet
          </Typography>
        ) : (
          selectedMeals.map((meal) => {
            const isMax = meal.price === max
            const isMin = meal.price === min

            return (
              <div
                key={meal.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                  padding: '10px',
                  borderRadius: '8px',
                  background: isMax
                    ? colors.highlightRed
                    : isMin
                    ? colors.highlightBlue
                    : colors.cardBg,
                  border: isMax
                    ? `1px solid ${colors.danger}`
                    : isMin
                    ? `1px solid ${colors.primary}`
                    : `1px solid ${colors.border}`,
                }}
              >
                <span>
                  {meal.name} - ₹{meal.price}
                  {isMax && ' 🔥 Most Expensive'}
                  {isMin && ' 💸 Cheapest'}
                </span>

                <RButton
                  title='Remove'
                  onClick={() => removeMeal(meal.id)}
                  variant='danger'
                />
              </div>
            )
          })
        )}

        <Typography variant='h3' weight='bold' style={{ marginTop: '10px' }}>
          Total: ₹{total}
        </Typography>
      </div>
    </div>
  )
}