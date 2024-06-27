// 字号
export const fontSizeList = [10, 12, 13, 14, 15, 16, 18, 20, 22, 24]
// 边框宽度
export const borderWidthList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// 边框样式
export const borderDasharrayList = [
  {
    name: '实线',
    value: 'none'
  },
  {
    name: '虚线1',
    value: '5,5'
  },
  {
    name: '虚线2',
    value: '10,10'
  },
  {
    name: '虚线3',
    value: '20,10,5,5,5,10'
  },
  {
    name: '虚线4',
    value: '5, 5, 1, 5'
  },
  {
    name: '虚线5',
    value: '15, 10, 5, 10, 15'
  },
  {
    name: '虚线6',
    value: '1, 5'
  }
]

// 形状列表
export const shapeList = [
  {
    name: '矩形',
    value: 'rectangle'
  },
  {
    name: '菱形',
    value: 'diamond'
  },
  {
    name: '平行四边形',
    value: 'parallelogram'
  },
  {
    name: '圆角矩形',
    value: 'roundedRectangle'
  },
  {
    name: '八角矩形',
    value: 'octagonalRectangle'
  },
  {
    name: '外三角矩形',
    value: 'outerTriangularRectangle'
  },
  {
    name: '内三角矩形',
    value: 'innerTriangularRectangle'
  },
  {
    name: '椭圆',
    value: 'ellipse'
  },
  {
    name: '圆',
    value: 'circle'
  }
]

export const shapeListMap = {
  rectangle: 'M 4 12 L 4 3 L 56 3 L 56 21 L 4 21 L 4 12 Z',
  diamond: 'M 4 12 L 30 3 L 56 12 L 30 21 L 4 12 Z',
  parallelogram: 'M 10 3 L 56 3 L 50 21 L 4 21 L 10 3 Z',
  roundedRectangle: 'M 13 3 L 47 3 A 9 9 0, 0 1 47 21 L 13 21 A 9 9 0, 0 1 13 3 Z',
  octagonalRectangle: 'M 4 12 L 4 9 L 10 3 L 50 3 L 56 9 L 56 15 L 50 21 L 10 21 L 4 15 L 4 12 Z',
  outerTriangularRectangle: 'M 4 12 L 10 3 L 50 3 L 56 12 L 50 21 L 10 21 L 4 12 Z',
  innerTriangularRectangle: 'M 10 12 L 4 3 L 56 3 L 50 12 L 56 21 L 4 21 L 10 12 Z',
  ellipse: 'M 4 12 A 26 9 0, 1, 0 30 3 A 26 9 0, 0, 0 4 12 Z',
  circle: 'M 21 12 A 9 9 0, 1, 0 30 3 A 9 9 0, 0, 0 21 12 Z'
}
