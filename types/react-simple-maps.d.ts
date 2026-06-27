declare module 'react-simple-maps' {
  import { ComponentType, ReactNode, MouseEvent, SVGProps } from 'react'

  export interface ComposableMapProps {
    projection?: string
    projectionConfig?: Record<string, unknown>
    width?: number
    height?: number
    style?: React.CSSProperties
    className?: string
    children?: ReactNode
  }

  export interface GeographiesProps {
    geography: string | object
    children: (props: { geographies: Geography[] }) => ReactNode
  }

  export interface Geography {
    rsmKey: string
    properties: Record<string, unknown>
    type: string
    geometry: unknown
  }

  export interface GeographyProps extends SVGProps<SVGPathElement> {
    geography: Geography
    fill?: string
    stroke?: string
    strokeWidth?: number
    style?: {
      default?: React.CSSProperties
      hover?: React.CSSProperties
      pressed?: React.CSSProperties
    }
    onMouseEnter?: (event: MouseEvent<SVGPathElement>) => void
    onMouseLeave?: (event: MouseEvent<SVGPathElement>) => void
    onClick?: (event: MouseEvent<SVGPathElement>) => void
  }

  export const ComposableMap: ComponentType<ComposableMapProps>
  export const Geographies: ComponentType<GeographiesProps>
  export const Geography: ComponentType<GeographyProps>
  export const ZoomableGroup: ComponentType<{ children?: ReactNode; [key: string]: unknown }>
  export const Marker: ComponentType<{ coordinates: [number, number]; children?: ReactNode; [key: string]: unknown }>
  export const Annotation: ComponentType<{ [key: string]: unknown; children?: ReactNode }>
  export const Sphere: ComponentType<{ [key: string]: unknown }>
  export const Graticule: ComponentType<{ [key: string]: unknown }>
  export const Line: ComponentType<{ [key: string]: unknown }>
}
