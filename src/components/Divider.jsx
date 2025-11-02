const Divider = ({ 
  direction = 'horizontal', 
  color = 'bg-black', 
  thickness = '0.5px', 
  margin = 'my-2', 
  length = '100%' // for height in vertical or width in horizontal
}) => {
  return direction === 'horizontal' ? (
    <div className={`${color} ${margin}`} style={{ height: thickness, width: length }} />
  ) : (
    <div className={`${color} ${margin}`} style={{ width: thickness, height: length }} />
  );
};

export default Divider
