import { ChangeEvent, VFC } from 'react'
import styled from 'styled-components'

const FieldC: VFC<{ className?: string; value: string; onChange: (x: string) => void }> = ({
  className,
  onChange,
  value,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)

  return (
    <div className={className}>
      <input type='text' value={value} onChange={handleChange} />
    </div>
  )
}
export const Field = styled(FieldC)`
  display: flex;
  flex-direction: column;
  margin: 16px;

  input {
    border: 0;
    font-size: 1rem;
    padding: 8px;
    outline: none;
    border-bottom: 4px solid #eee;
  }
`
