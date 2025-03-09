export function getIconProps(size? : number, className? : string) {
  const defaultSize = 18
  return  {
    width : size || defaultSize,
    height : size || defaultSize,
    className : className || ''
  }
}
