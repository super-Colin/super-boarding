export const increment = (stepAmount)=>{
  return {
    type: 'INCREMENT',
    payload: stepAmount
  }
}
export const decrement = ()=>{
  return {
    type: 'DECREMENT'
  }
}