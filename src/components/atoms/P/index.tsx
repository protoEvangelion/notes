import * as React from 'react'
import { color, space, styled } from 'style'
import { IColorSpaceProps } from 'interfaces'

const StyledP = styled.p`
  ${color};
  ${space};
`

export const P: React.SFC<IColorSpaceProps> = ({ children, ...props }) => (
  <StyledP {...props}>{children}</StyledP>
)

P.defaultProps = {
  color: 'black',
}
