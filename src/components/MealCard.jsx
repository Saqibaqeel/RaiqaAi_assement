import React from 'react';
import Typography from './Typography';

export default function MealCard({ meal, onAdd }) {
  return (
    <div className='card'>
      <Typography variant='h3' weight='bold'>
        {meal?.name || 'not found'}
      </Typography>

      <Typography>₹{meal?.price || 0}</Typography>

      <Typography color={meal?.isAvailable ? 'green' : 'red'}>
        {meal.isAvailable ? 'Available' : 'Not Available'}
      </Typography>

      {meal?.isAvailable && (
        <button onClick={() => onAdd(meal)}>Add</button>
      )}
    </div>
  );
}